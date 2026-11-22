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
const addressEntityLiveStrict = true


func TestAddressEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Address(nil)
		if ent == nil {
			t.Fatal("expected non-nil AddressEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Address(nil).List(map[string]any{"agent_id": 1}, nil)
		if sdkerr, ok := err.(*core.ArtilError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := addressBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "address." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"address.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /agents/{id}/addresses/{addressId}/primary\"}")
			t.Log("LIVE STEP {\"id\":\"address.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /agents/{id}/addresses/{addressId}\"}")
			t.Log("LIVE STEP {\"id\":\"address.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /agents/{id}/addresses/{addressId}\"}")
			t.Log("LIVE STEP {\"id\":\"address.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"agent01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, addressEntityLiveStrict, "Live entity test blocked: needs %s via ARTIL_TEST_ADDRESS_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["address01"]
			}
			livePace()
			liveExisting(t, addressEntityLiveStrict, setup.data, "address", "id", _liveId,
				func() (any, error) {
					return client.Address(nil).List(map[string]any{"agent_id": setup.idmap["agent01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		addressRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.address")))
		var addressRef01Data map[string]any
		if len(addressRef01DataRaw) > 0 {
			addressRef01Data = core.ToMapAny(addressRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = addressRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		addressRef01Ent := client.Address(nil)
		addressRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
		}

		addressRef01ListResult, err := addressRef01Ent.List(addressRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, addressRef01ListOk := addressRef01ListResult.([]any)
		if !addressRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", addressRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		addressRef01MatchDt0 := map[string]any{
			"id": addressRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			addressRef01MatchDt0["agent_id"] = v
		} else {
			addressRef01MatchDt0["agent_id"] = setup.idmap["agent01"]
		}
		addressRef01DataDt0Loaded, err := addressRef01Ent.Load(addressRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		addressRef01DataDt0LoadResult := core.ToMapAny(entityData(addressRef01DataDt0Loaded))
		if addressRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(addressRef01DataDt0LoadResult["id"], addressRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, addressEntityLiveStrict, "Live entity test blocked: needs %s via ARTIL_TEST_ADDRESS_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		addressRef01Ent := client.Address(nil)
		addressRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "address"}), "address_ref01"))
		addressRef01Data["agent_id"] = setup.idmap["agent01"]

		addressRef01DataResult, err := addressRef01Ent.Create(addressRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		addressRef01Data = core.ToMapAny(entityData(addressRef01DataResult))
		if addressRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if addressRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		addressRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
		}

		addressRef01ListResult, err := addressRef01Ent.List(addressRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		addressRef01List, addressRef01ListOk := addressRef01ListResult.([]any)
		if !addressRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", addressRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(addressRef01List), map[string]any{"id": addressRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		addressRef01DataUp0Up := map[string]any{
			"id": addressRef01Data["id"],
			"agent_id": setup.idmap["agent_id"],
		}

		addressRef01MarkdefUp0Name := "channel"
		addressRef01MarkdefUp0Value := fmt.Sprintf("Mark01-address_ref01_%d", setup.now)
		addressRef01DataUp0Up[addressRef01MarkdefUp0Name] = addressRef01MarkdefUp0Value

		addressRef01ResdataUp0Result, err := addressRef01Ent.Update(addressRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		addressRef01ResdataUp0 := core.ToMapAny(entityData(addressRef01ResdataUp0Result))
		if addressRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(addressRef01ResdataUp0["id"], addressRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if addressRef01ResdataUp0[addressRef01MarkdefUp0Name] != addressRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", addressRef01MarkdefUp0Name, addressRef01ResdataUp0[addressRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		addressRef01MatchDt0 := map[string]any{
			"id": addressRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			addressRef01MatchDt0["agent_id"] = v
		} else {
			addressRef01MatchDt0["agent_id"] = setup.idmap["agent01"]
		}
		addressRef01DataDt0Loaded, err := addressRef01Ent.Load(addressRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		addressRef01DataDt0LoadResult := core.ToMapAny(entityData(addressRef01DataDt0Loaded))
		if addressRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(addressRef01DataDt0LoadResult["id"], addressRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		addressRef01MatchRm0 := map[string]any{
			"id": addressRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			addressRef01MatchRm0["agent_id"] = v
		} else {
			addressRef01MatchRm0["agent_id"] = setup.idmap["agent01"]
		}
		_, err = addressRef01Ent.Remove(addressRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		addressRef01MatchRt0 := map[string]any{
			"agent_id": setup.idmap["agent01"],
		}

		addressRef01ListRt0Result, err := addressRef01Ent.List(addressRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		addressRef01ListRt0, addressRef01ListRt0Ok := addressRef01ListRt0Result.([]any)
		if !addressRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", addressRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(addressRef01ListRt0), map[string]any{"id": addressRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func addressBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "address", "AddressTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read address test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse address test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"address01", "address02", "address03", "agent01", "agent02", "agent03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("ARTIL_TEST_ADDRESS_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ARTIL_TEST_ADDRESS_ENTID": idmap,
		"ARTIL_TEST_LIVE":      "FALSE",
		"ARTIL_TEST_EXPLAIN":   "FALSE",
		"ARTIL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["ARTIL_TEST_ADDRESS_ENTID"])
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
