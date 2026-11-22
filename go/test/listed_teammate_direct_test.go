package sdktest

import (
	"encoding/json"
	"os"
	"strings"
	"testing"

	sdk "github.com/voxgig-sdk/artil-sdk/go"
	"github.com/voxgig-sdk/artil-sdk/go/core"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const listed_teammateDirectLiveStrict = true

func TestListedTeammateDirect(t *testing.T) {
	t.Run("direct-list-listed_teammate", func(t *testing.T) {
		setup := listed_teammateDirectSetup([]any{
			map[string]any{"id": "direct01"},
			map[string]any{"id": "direct02"},
		})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-list-listed_teammate", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			livePace()
		}
		client := setup.client


		result, err := client.Direct(map[string]any{
			"path":   "team",
			"method": "GET",
			"params": map[string]any{},
		})
		if setup.live {
			if err != nil {
				liveMiss(t, listed_teammateDirectLiveStrict, "Live list failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, listed_teammateDirectLiveStrict, "Live list failed: %s", liveDescribe(result))
			}
			if _, ok := liveList(result["data"]); !ok {
				liveMiss(t, listed_teammateDirectLiveStrict, "Live list returned no list: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
		}

		if !setup.live {
			if dataList, ok := result["data"].([]any); ok {
				if len(dataList) != 2 {
					t.Fatalf("expected 2 items, got %d", len(dataList))
				}
			} else {
				t.Fatalf("expected data to be an array, got %T", result["data"])
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
		}
	})

}

type listed_teammateDirectSetupResult struct {
	client *sdk.ArtilSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func listed_teammateDirectSetup(mockres any) *listed_teammateDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"ARTIL_TEST_LISTED_TEAMMATE_ENTID": map[string]any{},
		"ARTIL_TEST_LIVE":    "FALSE",
		"ARTIL_APIKEY":       "",
	})

	live := env["ARTIL_TEST_LIVE"] == "TRUE"

	if live {
		// sdk-test-control.json's test.client.options seeds the live
		// client; the generated fields below overwrite anything they name.
		mergedOpts := map[string]any{}
		for k, v := range liveClientOptions() {
			mergedOpts[k] = v
		}
		for k, v := range map[string]any{
			"apikey": env["ARTIL_APIKEY"],
		} {
			mergedOpts[k] = v
		}
		client := sdk.NewArtilSDK(mergedOpts)

		idmap := map[string]any{}
		if entidRaw, ok := env["ARTIL_TEST_LISTED_TEAMMATE_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}

		return &listed_teammateDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
	}

	mockFetch := func(url string, init map[string]any) (map[string]any, error) {
		*calls = append(*calls, map[string]any{"url": url, "init": init})
		return map[string]any{
			"status":     200,
			"statusText": "OK",
			"headers":    map[string]any{},
			"json": (func() any)(func() any {
				if mockres != nil {
					return mockres
				}
				return map[string]any{"id": "direct01"}
			}),
		}, nil
	}

	client := sdk.NewArtilSDK(map[string]any{
		"base": "http://localhost:8080",
		"system": map[string]any{
			"fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
		},
	})

	return &listed_teammateDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal
