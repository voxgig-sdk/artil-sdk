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
const eventEntityLiveStrict = true


func TestEventEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Event(nil)
		if ent == nil {
			t.Fatal("expected non-nil EventEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Event(nil).List(map[string]any{"agent_id": 1}, nil)
		if sdkerr, ok := err.(*core.ArtilError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := eventBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "event." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"event.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /agents/{id}/url\"}")
		if setup.live {
			for _, _liveKey := range []string{"agent01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, eventEntityLiveStrict, "Live entity test blocked: needs %s via ARTIL_TEST_EVENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		eventRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.event")))
		var eventRef01Data map[string]any
		if len(eventRef01DataRaw) > 0 {
			eventRef01Data = core.ToMapAny(eventRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = eventRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		eventRef01Ent := client.Event(nil)
		eventRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
		}

		eventRef01ListResult, err := eventRef01Ent.List(eventRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, eventRef01ListOk := eventRef01ListResult.([]any)
		if !eventRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", eventRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, eventEntityLiveStrict, "Live entity test blocked: needs %s via ARTIL_TEST_EVENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		eventRef01Ent := client.Event(nil)
		eventRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "event"}), "event_ref01"))
		eventRef01Data["agent_id"] = setup.idmap["agent01"]

		eventRef01DataResult, err := eventRef01Ent.Create(eventRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		eventRef01Data = core.ToMapAny(entityData(eventRef01DataResult))
		if eventRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if eventRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		eventRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
		}

		eventRef01ListResult, err := eventRef01Ent.List(eventRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		eventRef01List, eventRef01ListOk := eventRef01ListResult.([]any)
		if !eventRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", eventRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(eventRef01List), map[string]any{"id": eventRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func eventBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "event", "EventTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read event test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse event test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"event01", "event02", "event03", "agent01", "agent02", "agent03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("ARTIL_TEST_EVENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ARTIL_TEST_EVENT_ENTID": idmap,
		"ARTIL_TEST_LIVE":      "FALSE",
		"ARTIL_TEST_EXPLAIN":   "FALSE",
		"ARTIL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["ARTIL_TEST_EVENT_ENTID"])
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
