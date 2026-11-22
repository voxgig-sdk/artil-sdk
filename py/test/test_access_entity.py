# Access entity test

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


class TestAccessEntity:

    def test_should_create_instance(self):
        testsdk = ArtilSDK.test(None, None)
        ent = testsdk.Access(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ArtilSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Access(None).load({"agent_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _access_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "access." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"access.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /agents/{id}/access/{channel}\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["agent01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via ARTIL_TEST_ACCESS_ENTID")
        if setup["live"]:
            runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a access record it did not create")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        access_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.access")))
        access_ref01_data = None
        if len(access_ref01_data_raw) > 0:
            access_ref01_data = helpers.to_map(access_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        access_ref01_ent = client.Access(None)
        access_ref01_data_up0_up = {
            "id": access_ref01_data["id"],
            "agent_id": setup["idmap"]["agent_id"],
        }

        access_ref01_markdef_up0_name = "admit"
        access_ref01_markdef_up0_value = "Mark01-access_ref01_" + str(setup["now"])
        access_ref01_data_up0_up[access_ref01_markdef_up0_name] = access_ref01_markdef_up0_value

        access_ref01_resdata_up0 = helpers.to_map(runner.entity_data(access_ref01_ent.update(access_ref01_data_up0_up, None)))
        assert access_ref01_resdata_up0 is not None
        if not setup["live"]:
            assert runner.live_same_id(access_ref01_resdata_up0.get("id"), access_ref01_data_up0_up["id"])
        assert access_ref01_resdata_up0[access_ref01_markdef_up0_name] == access_ref01_markdef_up0_value

        if setup["live"]:
            runner.live_pace()
        # LOAD
        access_ref01_match_dt0 = {
            "id": access_ref01_data["id"],
        }
        access_ref01_data_dt0_loaded = access_ref01_ent.load(access_ref01_match_dt0, None)
        access_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(access_ref01_data_dt0_loaded))
        assert access_ref01_data_dt0_load_result is not None
        if not setup["live"]:
            assert runner.live_same_id(access_ref01_data_dt0_load_result.get("id"), access_ref01_data["id"])


    def _run_get_only_flow(self, setup):
        if setup["live"]:
            runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow loads a access record it has no list to find")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        access_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.access")))
        access_ref01_data = None
        if len(access_ref01_data_raw) > 0:
            access_ref01_data = helpers.to_map(access_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LOAD
        access_ref01_ent = client.Access(None)
        access_ref01_match_dt0 = {
            "id": access_ref01_data["id"],
        }
        access_ref01_data_dt0_loaded = access_ref01_ent.load(access_ref01_match_dt0, None)
        access_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(access_ref01_data_dt0_loaded))
        assert access_ref01_data_dt0_load_result is not None
        if not setup["live"]:
            assert runner.live_same_id(access_ref01_data_dt0_load_result.get("id"), access_ref01_data["id"])



def _access_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/access/AccessTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ArtilSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["access01", "access02", "access03", "agent01", "agent02", "agent03"],
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
        "ARTIL_TEST_ACCESS_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "ARTIL_TEST_ACCESS_ENTID": idmap,
        "ARTIL_TEST_LIVE": "FALSE",
        "ARTIL_TEST_EXPLAIN": "FALSE",
        "ARTIL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("ARTIL_TEST_ACCESS_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("agent_id") is None:
        idmap_resolved["agent_id"] = idmap_resolved.get("agent01")

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
