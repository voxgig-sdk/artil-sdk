package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/artil-sdk/go"
	"github.com/voxgig-sdk/artil-sdk/go/core"

	vs "github.com/voxgig-sdk/artil-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const webhookEntityLiveStrict = true


func TestWebhookEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Webhook(nil)
		if ent == nil {
			t.Fatal("expected non-nil WebhookEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Webhook(nil).List(map[string]any{"agent_id": 1}, nil)
		if sdkerr, ok := err.(*core.ArtilError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := webhookBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "webhook." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"webhook.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /agents/{id}/webhooks\"}")
			t.Log("LIVE STEP {\"id\":\"webhook.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /agents/{id}/webhooks/{webhookId}\"}")
			t.Log("LIVE STEP {\"id\":\"webhook.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"agent01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, webhookEntityLiveStrict, "Live entity test blocked: needs %s via ARTIL_TEST_WEBHOOK_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		webhookRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.webhook")))
		var webhookRef01Data map[string]any
		if len(webhookRef01DataRaw) > 0 {
			webhookRef01Data = core.ToMapAny(webhookRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = webhookRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		webhookRef01Ent := client.Webhook(nil)
		webhookRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
		}

		webhookRef01ListResult, err := webhookRef01Ent.List(webhookRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, webhookRef01ListOk := webhookRef01ListResult.([]any)
		if !webhookRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", webhookRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, webhookEntityLiveStrict, "Live entity test blocked: needs %s via ARTIL_TEST_WEBHOOK_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		webhookRef01Ent := client.Webhook(nil)
		webhookRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "webhook"}), "webhook_ref01"))
		webhookRef01Data["agent_id"] = setup.idmap["agent01"]

		webhookRef01DataResult, err := webhookRef01Ent.Create(webhookRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		webhookRef01Data = core.ToMapAny(entityData(webhookRef01DataResult))
		if webhookRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if webhookRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		webhookRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
		}

		webhookRef01ListResult, err := webhookRef01Ent.List(webhookRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		webhookRef01List, webhookRef01ListOk := webhookRef01ListResult.([]any)
		if !webhookRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", webhookRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(webhookRef01List), map[string]any{"id": webhookRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		webhookRef01MatchRm0 := map[string]any{
			"id": webhookRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			webhookRef01MatchRm0["agent_id"] = v
		} else {
			webhookRef01MatchRm0["agent_id"] = setup.idmap["agent01"]
		}
		_, err = webhookRef01Ent.Remove(webhookRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		webhookRef01MatchRt0 := map[string]any{
			"agent_id": setup.idmap["agent01"],
		}

		webhookRef01ListRt0Result, err := webhookRef01Ent.List(webhookRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		webhookRef01ListRt0, webhookRef01ListRt0Ok := webhookRef01ListRt0Result.([]any)
		if !webhookRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", webhookRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(webhookRef01ListRt0), map[string]any{"id": webhookRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func webhookBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "webhook", "WebhookTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read webhook test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse webhook test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"webhook01", "webhook02", "webhook03", "agent01", "agent02", "agent03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("ARTIL_TEST_WEBHOOK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ARTIL_TEST_WEBHOOK_ENTID": idmap,
		"ARTIL_TEST_LIVE":      "FALSE",
		"ARTIL_TEST_EXPLAIN":   "FALSE",
		"ARTIL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["ARTIL_TEST_WEBHOOK_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ARTIL_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["ARTIL_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewArtilSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ARTIL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ARTIL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
