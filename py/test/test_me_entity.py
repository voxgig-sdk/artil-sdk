# Me entity test

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


class TestMeEntity:

    def test_should_create_instance(self):
        testsdk = ArtilSDK.test(None, None)
        ent = testsdk.Me(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _me_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "me." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        me_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.me")))
        me_ref01_data = None
        if len(me_ref01_data_raw) > 0:
            me_ref01_data = helpers.to_map(me_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LOAD
        me_ref01_ent = client.Me(None)
        me_ref01_match_dt0 = {}
        me_ref01_data_dt0_loaded = me_ref01_ent.load(me_ref01_match_dt0, None)
        assert me_ref01_data_dt0_loaded is not None



def _me_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/me/MeTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ArtilSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["me01", "me02", "me03"],
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
        "ARTIL_TEST_ME_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "ARTIL_TEST_ME_ENTID": idmap,
        "ARTIL_TEST_LIVE": "FALSE",
        "ARTIL_TEST_EXPLAIN": "FALSE",
        "ARTIL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("ARTIL_TEST_ME_ENTID"))
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
