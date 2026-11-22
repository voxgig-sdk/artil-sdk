package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewSecretsFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAccessEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewAddressEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewAddressSetupEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewAgentEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewChannelEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewClientEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewConnectionEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewEventEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewListedTeammateEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewListenerEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewMenEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewMessageEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewTokenEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

var NewWebhookEntityFunc func(client *ArtilSDK, entopts map[string]any) ArtilEntityBase

