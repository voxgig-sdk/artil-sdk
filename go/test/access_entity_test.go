package sdktest

import (
	"encoding/json"
	"fmt"
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
const accessEntityLiveStrict = true


func TestAccessEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Access(nil)
		if ent == nil {
			t.Fatal("expected non-nil AccessEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Access(nil).Load(map[string]any{"agent_id": 1}, nil)
		if sdkerr, ok := err.(*core.ArtilError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := accessBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "access." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"access.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /agents/{id}/access/{channel}\"}")
		if setup.live {
			liveMiss(t, accessEntityLiveStrict, "Live entity test blocked: %s", "the flow loads a access record it has no list to find")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		accessRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.access")))
		var accessRef01Data map[string]any
		if len(accessRef01DataRaw) > 0 {
			accessRef01Data = core.ToMapAny(accessRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = accessRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		accessRef01Ent := client.Access(nil)
		accessRef01MatchDt0 := map[string]any{
			"id": accessRef01Data["id"],
		}
		accessRef01DataDt0Loaded, err := accessRef01Ent.Load(accessRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		accessRef01DataDt0LoadResult := core.ToMapAny(entityData(accessRef01DataDt0Loaded))
		if accessRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(accessRef01DataDt0LoadResult["id"], accessRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, accessEntityLiveStrict, "Live entity test blocked: needs %s via ARTIL_TEST_ACCESS_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, accessEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a access record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		accessRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.access")))
		var accessRef01Data map[string]any
		if len(accessRef01DataRaw) > 0 {
			accessRef01Data = core.ToMapAny(accessRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = accessRef01Data

		if setup.live {
			livePace()
		}
		// UPDATE
		accessRef01Ent := client.Access(nil)
		accessRef01DataUp0Up := map[string]any{
			"id": accessRef01Data["id"],
			"agent_id": setup.idmap["agent_id"],
		}

		accessRef01MarkdefUp0Name := "admit"
		accessRef01MarkdefUp0Value := fmt.Sprintf("Mark01-access_ref01_%d", setup.now)
		accessRef01DataUp0Up[accessRef01MarkdefUp0Name] = accessRef01MarkdefUp0Value

		accessRef01ResdataUp0Result, err := accessRef01Ent.Update(accessRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		accessRef01ResdataUp0 := core.ToMapAny(entityData(accessRef01ResdataUp0Result))
		if accessRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(accessRef01ResdataUp0["id"], accessRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if accessRef01ResdataUp0[accessRef01MarkdefUp0Name] != accessRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", accessRef01MarkdefUp0Name, accessRef01ResdataUp0[accessRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		accessRef01MatchDt0 := map[string]any{
			"id": accessRef01Data["id"],
		}
		accessRef01DataDt0Loaded, err := accessRef01Ent.Load(accessRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		accessRef01DataDt0LoadResult := core.ToMapAny(entityData(accessRef01DataDt0Loaded))
		if accessRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(accessRef01DataDt0LoadResult["id"], accessRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func accessBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "access", "AccessTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read access test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse access test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"access01", "access02", "access03", "agent01", "agent02", "agent03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("ARTIL_TEST_ACCESS_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ARTIL_TEST_ACCESS_ENTID": idmap,
		"ARTIL_TEST_LIVE":      "FALSE",
		"ARTIL_TEST_EXPLAIN":   "FALSE",
		"ARTIL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["ARTIL_TEST_ACCESS_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add agent_id alias for update test.
	if idmapResolved["agent_id"] == nil {
		idmapResolved["agent_id"] = idmapResolved["agent01"]
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
