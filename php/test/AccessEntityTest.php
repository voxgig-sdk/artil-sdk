<?php
declare(strict_types=1);

// Access entity test

require_once __DIR__ . '/../artil_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AccessEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ArtilSDK::test(null, null);
        $ent = $testsdk->Access(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = ArtilConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = ArtilSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Access(null)->load(["agent_id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = access_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["update", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "access." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"access.update.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs PUT /agents/{id}/access/{channel}"}' . "\n");
        if (!empty($setup["live"])) {
            Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: " . "the flow loads a access record it has no list to find");
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $access_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.access")));
        $access_ref01_data = null;
        if (count($access_ref01_data_raw) > 0) {
            $access_ref01_data = Helpers::to_map($access_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $access_ref01_ent = $client->Access(null);
        $access_ref01_match_dt0 = [
            "id" => $access_ref01_data["id"],
        ];
        $access_ref01_data_dt0_loaded = $access_ref01_ent->load($access_ref01_match_dt0, null);
        $access_ref01_data_dt0_load_result = Helpers::to_map(is_object($access_ref01_data_dt0_loaded) && method_exists($access_ref01_data_dt0_loaded, 'data_get') ? $access_ref01_data_dt0_loaded->data_get() : $access_ref01_data_dt0_loaded);
        $this->assertNotNull($access_ref01_data_dt0_load_result);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($access_ref01_data_dt0_load_result["id"] ?? null, $access_ref01_data["id"]));
        }

            return;
        }

        if (!empty($setup["live"])) {
            foreach (["agent01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via ARTIL_TEST_ACCESS_ENTID");
                }
            }
        }
        if (!empty($setup["live"])) {
            Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: " . "the flow updates a access record it did not create");
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $access_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.access")));
        $access_ref01_data = null;
        if (count($access_ref01_data_raw) > 0) {
            $access_ref01_data = Helpers::to_map($access_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $access_ref01_ent = $client->Access(null);
        $access_ref01_data_up0_up = [
            "id" => $access_ref01_data["id"],
            "agent_id" => $setup["idmap"]["agent_id"],
        ];

        $access_ref01_markdef_up0_name = "admit";
        $access_ref01_markdef_up0_value = "Mark01-access_ref01_" . $setup["now"];
        $access_ref01_data_up0_up[$access_ref01_markdef_up0_name] = $access_ref01_markdef_up0_value;

        $access_ref01_resdata_up0_result = $access_ref01_ent->update($access_ref01_data_up0_up, null);
        $access_ref01_resdata_up0 = Helpers::to_map(is_object($access_ref01_resdata_up0_result) && method_exists($access_ref01_resdata_up0_result, 'data_get') ? $access_ref01_resdata_up0_result->data_get() : $access_ref01_resdata_up0_result);
        $this->assertNotNull($access_ref01_resdata_up0);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($access_ref01_resdata_up0["id"] ?? null, $access_ref01_data_up0_up["id"]));
        }
        $this->assertEquals($access_ref01_resdata_up0[$access_ref01_markdef_up0_name], $access_ref01_markdef_up0_value);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $access_ref01_match_dt0 = [
            "id" => $access_ref01_data["id"],
        ];
        $access_ref01_data_dt0_loaded = $access_ref01_ent->load($access_ref01_match_dt0, null);
        $access_ref01_data_dt0_load_result = Helpers::to_map(is_object($access_ref01_data_dt0_loaded) && method_exists($access_ref01_data_dt0_loaded, 'data_get') ? $access_ref01_data_dt0_loaded->data_get() : $access_ref01_data_dt0_loaded);
        $this->assertNotNull($access_ref01_data_dt0_load_result);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($access_ref01_data_dt0_load_result["id"] ?? null, $access_ref01_data["id"]));
        }

    }
}

function access_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/access/AccessTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ArtilSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["access01", "access02", "access03", "agent01", "agent02", "agent03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("ARTIL_TEST_ACCESS_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ARTIL_TEST_ACCESS_ENTID" => $idmap,
        "ARTIL_TEST_LIVE" => "FALSE",
        "ARTIL_TEST_EXPLAIN" => "FALSE",
        "ARTIL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ARTIL_TEST_ACCESS_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["agent_id"])) {
        $idmap_resolved["agent_id"] = $idmap_resolved["agent01"];
    }

    if ($env["ARTIL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["ARTIL_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new ArtilSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["ARTIL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["ARTIL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
