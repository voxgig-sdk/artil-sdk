// Typed models for the Artil SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/artil-sdk/go/core"
)

// Access is the typed data model for the access entity.
type Access struct {
}

// AccessLoadMatch is the typed request payload for Access.LoadTyped.
type AccessLoadMatch struct {
	AgentId string `json:"agent_id"`
}

// AccessUpdateData is the typed request payload for Access.UpdateTyped.
type AccessUpdateData struct {
	AgentId string `json:"agent_id"`
	Channel string `json:"channel"`
	Admit *string `json:"admit,omitempty"`
	Senders *[]any `json:"senders,omitempty"`
}

// Address is the typed data model for the address entity.
type Address struct {
}

// AddressLoadMatch is the typed request payload for Address.LoadTyped.
type AddressLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
}

// AddressListMatch is the typed request payload for Address.ListTyped.
type AddressListMatch struct {
	AgentId string `json:"agent_id"`
}

// AddressCreateData is the typed request payload for Address.CreateTyped.
type AddressCreateData struct {
	AgentId string `json:"agent_id"`
	Channel string `json:"channel"`
	Code *string `json:"code,omitempty"`
	Country *string `json:"country,omitempty"`
	Setup *string `json:"setup,omitempty"`
	Token *string `json:"token,omitempty"`
	Value *string `json:"value,omitempty"`
}

// AddressUpdateData is the typed request payload for Address.UpdateTyped.
type AddressUpdateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	Value *string `json:"value,omitempty"`
}

// AddressRemoveMatch is the typed request payload for Address.RemoveTyped.
type AddressRemoveMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
}

// AddressSetup is the typed data model for the address_setup entity.
type AddressSetup struct {
}

// AddressSetupCreateData is the typed request payload for AddressSetup.CreateTyped.
type AddressSetupCreateData struct {
	AgentId string `json:"agent_id"`
	Channel string `json:"channel"`
	Token *string `json:"token,omitempty"`
}

// Agent is the typed data model for the agent entity.
type Agent struct {
}

// AgentLoadMatch is the typed request payload for Agent.LoadTyped.
type AgentLoadMatch struct {
	Id string `json:"id"`
}

// AgentListMatch is the typed request payload for Agent.ListTyped.
type AgentListMatch struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Icon *string `json:"icon,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// AgentCreateData is the typed request payload for Agent.CreateTyped.
type AgentCreateData struct {
	Icon *string `json:"icon,omitempty"`
	Name string `json:"name"`
}

// AgentUpdateData is the typed request payload for Agent.UpdateTyped.
type AgentUpdateData struct {
	Id string `json:"id"`
	Icon *string `json:"icon,omitempty"`
	Name *string `json:"name,omitempty"`
}

// AgentRemoveMatch is the typed request payload for Agent.RemoveTyped.
type AgentRemoveMatch struct {
	Id string `json:"id"`
}

// Channel is the typed data model for the channel entity.
type Channel struct {
}

// ChannelListMatch is the typed request payload for Channel.ListTyped.
type ChannelListMatch struct {
	AgentId string `json:"agent_id"`
}

// Client is the typed data model for the client entity.
type Client struct {
}

// ClientListMatch is the typed request payload for Client.ListTyped.
type ClientListMatch struct {
	AgentId string `json:"agent_id"`
}

// Connection is the typed data model for the connection entity.
type Connection struct {
}

// ConnectionLoadMatch is the typed request payload for Connection.LoadTyped.
type ConnectionLoadMatch struct {
	AgentId string `json:"agent_id"`
}

// ConnectionUpdateData is the typed request payload for Connection.UpdateTyped.
type ConnectionUpdateData struct {
	AgentId string `json:"agent_id"`
	Client *string `json:"client,omitempty"`
	Machine *any `json:"machine,omitempty"`
}

// Event is the typed data model for the event entity.
type Event struct {
}

// EventListMatch is the typed request payload for Event.ListTyped.
type EventListMatch struct {
	AgentId string `json:"agent_id"`
	After *int `json:"after,omitempty"`
}

// EventCreateData is the typed request payload for Event.CreateTyped.
type EventCreateData struct {
	AgentId string `json:"agent_id"`
	Attachments *[]any `json:"attachments,omitempty"`
	Client *string `json:"client,omitempty"`
	Text *string `json:"text,omitempty"`
	Thread *string `json:"thread,omitempty"`
	ToThread *string `json:"toThread,omitempty"`
}

// Listener is the typed data model for the listener entity.
type Listener struct {
}

// ListenerListMatch is the typed request payload for Listener.ListTyped.
type ListenerListMatch struct {
	AgentId string `json:"agent_id"`
}

// Me is the typed data model for the me entity.
type Me struct {
}

// MeLoadMatch is the typed request payload for Me.LoadTyped.
type MeLoadMatch struct {
}

// MeToken is the typed data model for the me_token entity.
type MeToken struct {
}

// MeTokenRemoveMatch is the typed request payload for MeToken.RemoveTyped.
type MeTokenRemoveMatch struct {
}

// Message is the typed data model for the message entity.
type Message struct {
}

// MessageLoadMatch is the typed request payload for Message.LoadTyped.
type MessageLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
}

// MessageListMatch is the typed request payload for Message.ListTyped.
type MessageListMatch struct {
	AgentId string `json:"agent_id"`
	Before *string `json:"before,omitempty"`
	Channel *string `json:"channel,omitempty"`
	Counterpart *string `json:"counterpart,omitempty"`
	Direction *string `json:"direction,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Search *string `json:"search,omitempty"`
}

// MessageCreateData is the typed request payload for Message.CreateTyped.
type MessageCreateData struct {
	AgentId string `json:"agent_id"`
	Attachments *[]any `json:"attachments,omitempty"`
	Cc *[]any `json:"cc,omitempty"`
	Channel *string `json:"channel,omitempty"`
	Client *string `json:"client,omitempty"`
	Forward *string `json:"forward,omitempty"`
	ReplyTo *string `json:"replyTo,omitempty"`
	Subject *any `json:"subject,omitempty"`
	Text string `json:"text"`
	Thread *any `json:"thread,omitempty"`
	To *[]any `json:"to,omitempty"`
}

// Teammate is the typed data model for the teammate entity.
type Teammate struct {
}

// TeammateListMatch is the typed request payload for Teammate.ListTyped.
type TeammateListMatch struct {
	Addresses *[]any `json:"addresses,omitempty"`
	Email *any `json:"email,omitempty"`
	Icon *any `json:"icon,omitempty"`
	Id *string `json:"id,omitempty"`
	ImageUrl *any `json:"imageUrl,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Listening *any `json:"listening,omitempty"`
	Name *any `json:"name,omitempty"`
	Phone *any `json:"phone,omitempty"`
	Role *any `json:"role,omitempty"`
}

// Token is the typed data model for the token entity.
type Token struct {
}

// TokenListMatch is the typed request payload for Token.ListTyped.
type TokenListMatch struct {
	AgentId string `json:"agent_id"`
}

// TokenRemoveMatch is the typed request payload for Token.RemoveTyped.
type TokenRemoveMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
}

// Webhook is the typed data model for the webhook entity.
type Webhook struct {
}

// WebhookListMatch is the typed request payload for Webhook.ListTyped.
type WebhookListMatch struct {
	AgentId string `json:"agent_id"`
}

// WebhookCreateData is the typed request payload for Webhook.CreateTyped.
type WebhookCreateData struct {
	AgentId string `json:"agent_id"`
	BearerToken *string `json:"bearerToken,omitempty"`
	Url string `json:"url"`
}

// WebhookRemoveMatch is the typed request payload for Webhook.RemoveTyped.
type WebhookRemoveMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
