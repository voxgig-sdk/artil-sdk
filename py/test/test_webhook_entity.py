# Webhook entity test

import json
import os
import time

import pytest

from artil_sdk.utility.voxgig_struct import voxgig_struct as vs
from artil_sdk import ArtilSDK
from artil_sdk.core import helpers
from artil_sdk.config import shared_config
from artil_sdk.feature.base_feature import ArtilBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestWebhookEntity:

    def test_should_create_instance(self):
        testsdk = ArtilSDK.test(None, None)
        ent = testsdk.Webhook(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ArtilSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Webhook(None).list({"agent_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _webhook_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "webhook." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"webhook.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /agents/{id}/webhooks\"}")
            print("LIVE STEP {\"id\":\"webhook.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /agents/{id}/webhooks/{webhookId}\"}")
            print("LIVE STEP {\"id\":\"webhook.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["agent01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via ARTIL_TEST_WEBHOOK_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        webhook_ref01_ent = client.Webhook(None)
        webhook_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.webhook"), "webhook_ref01"))
        webhook_ref01_data["agent_id"] = setup["idmap"]["agent01"]

        webhook_ref01_data = helpers.to_map(runner.entity_data(webhook_ref01_ent.create(webhook_ref01_data, None)))
        assert webhook_ref01_data is not None
        assert webhook_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # LIST
        webhook_ref01_match = {
            "agent_id": setup["idmap"]["agent01"],
        }

        webhook_ref01_list_result = webhook_ref01_ent.list(webhook_ref01_match, None)
        assert isinstance(webhook_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(webhook_ref01_list_result),
            {"id": webhook_ref01_data["id"]})
        assert not vs.isempty(found_item)

        if setup["live"]:
            runner.live_pace()
        # REMOVE
        webhook_ref01_match_rm0 = {
            "id": webhook_ref01_data["id"],
        }
        webhook_ref01_match_rm0["agent_id"] = setup["idmap"].get("agent_id") or setup["idmap"].get("agent01")
        webhook_ref01_ent.remove(webhook_ref01_match_rm0, None)

        if setup["live"]:
            runner.live_pace()
        # LIST
        webhook_ref01_match_rt0 = {
            "agent_id": setup["idmap"]["agent01"],
        }

        webhook_ref01_list_rt0_result = webhook_ref01_ent.list(webhook_ref01_match_rt0, None)
        assert isinstance(webhook_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(webhook_ref01_list_rt0_result),
            {"id": webhook_ref01_data["id"]})
        assert vs.isempty(not_found_item)


    def _run_get_only_flow(self, setup):
        if setup["live"]:
            for _live_key in ["agent01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via ARTIL_TEST_WEBHOOK_ENTID")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        webhook_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.webhook")))
        webhook_ref01_data = None
        if len(webhook_ref01_data_raw) > 0:
            webhook_ref01_data = helpers.to_map(webhook_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        webhook_ref01_ent = client.Webhook(None)
        webhook_ref01_match = {
            "agent_id": setup["idmap"]["agent01"],
        }

        webhook_ref01_list_result = webhook_ref01_ent.list(webhook_ref01_match, None)
        assert isinstance(webhook_ref01_list_result, list)



def _webhook_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/webhook/WebhookTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ArtilSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["webhook01", "webhook02", "webhook03", "agent01", "agent02", "agent03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "ARTIL_TEST_WEBHOOK_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "ARTIL_TEST_WEBHOOK_ENTID": idmap,
        "ARTIL_TEST_LIVE": "FALSE",
        "ARTIL_TEST_EXPLAIN": "FALSE",
        "ARTIL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("ARTIL_TEST_WEBHOOK_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("ARTIL_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("ARTIL_APIKEY"),
            },
            extra or {},
        ])
        client = ArtilSDK(helpers.to_map(merged_opts))

    _live = env.get("ARTIL_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("ARTIL_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
