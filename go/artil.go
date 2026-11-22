package voxgigartilsdk

import (
	"github.com/voxgig-sdk/artil-sdk/go/core"
	"github.com/voxgig-sdk/artil-sdk/go/entity"
	"github.com/voxgig-sdk/artil-sdk/go/feature"
	_ "github.com/voxgig-sdk/artil-sdk/go/utility"
)

// Type aliases preserve external API.
type ArtilSDK = core.ArtilSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ArtilEntityBase = core.ArtilEntityBase

// Deprecated: use ArtilEntityBase.
type ArtilEntity = core.ArtilEntityBase

type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ArtilError = core.ArtilError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewSecretsFeatureFunc = func() core.Feature {
		return feature.NewSecretsFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAccessEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewAccessEntity(client, entopts)
	}
	core.NewAddressEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewAddressEntity(client, entopts)
	}
	core.NewAddressSetupEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewAddressSetupEntity(client, entopts)
	}
	core.NewAgentEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewAgentEntity(client, entopts)
	}
	core.NewChannelEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewChannelEntity(client, entopts)
	}
	core.NewClientEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewClientEntity(client, entopts)
	}
	core.NewConnectionEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewConnectionEntity(client, entopts)
	}
	core.NewEventEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewEventEntity(client, entopts)
	}
	core.NewListedTeammateEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewListedTeammateEntity(client, entopts)
	}
	core.NewListenerEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewListenerEntity(client, entopts)
	}
	core.NewMenEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewMenEntity(client, entopts)
	}
	core.NewMessageEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewMessageEntity(client, entopts)
	}
	core.NewTokenEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewTokenEntity(client, entopts)
	}
	core.NewWebhookEntityFunc = func(client *core.ArtilSDK, entopts map[string]any) core.ArtilEntityBase {
		return entity.NewWebhookEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewArtilSDK = core.NewArtilSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewArtilSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *ArtilSDK  { return NewArtilSDK(nil) }
func Test() *ArtilSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewSecretsFeature = feature.NewSecretsFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
