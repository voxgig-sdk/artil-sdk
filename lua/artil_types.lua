-- Typed models for the Artil SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Access
---@field admit string
---@field senders table

---@class AccessLoadMatch
---@field agent_id string

---@class AccessUpdateData
---@field agent_id string
---@field channel string
---@field admit? string
---@field senders? table

---@class Address
---@field channel string
---@field code? string
---@field country? string
---@field createdAt string
---@field domainId any
---@field id string
---@field name string|nil
---@field primary boolean
---@field registering? boolean
---@field setup? string
---@field token? string
---@field value string

---@class AddressLoadMatch
---@field agent_id string
---@field id string

---@class AddressListMatch
---@field agent_id string

---@class AddressCreateData
---@field agent_id string
---@field channel string
---@field code? string
---@field country? string
---@field setup? string
---@field token? string
---@field value? string

---@class AddressUpdateData
---@field agent_id string
---@field id string
---@field value? string

---@class AddressRemoveMatch
---@field agent_id string
---@field id string

---@class AddressSetup
---@field channel string
---@field token? string

---@class AddressSetupCreateData
---@field agent_id string
---@field channel string
---@field token? string

---@class Agent
---@field createdAt string
---@field icon string
---@field id string
---@field name string

---@class AgentLoadMatch
---@field id string

---@class AgentListMatch
---@field createdAt? string
---@field icon? string
---@field id? string
---@field name? string

---@class AgentCreateData
---@field icon? string
---@field name string

---@class AgentUpdateData
---@field id string
---@field icon? string
---@field name? string

---@class AgentRemoveMatch
---@field id string

---@class Channel
---@field kind string
---@field labels table
---@field limits table
---@field name string

---@class ChannelListMatch
---@field agent_id string

---@class Client
---@field createdAt string
---@field id string
---@field lastUsedAt any
---@field name string

---@class ClientListMatch
---@field agent_id string

---@class Connection
---@field client string
---@field id string
---@field machine string|nil
---@field tokenId string

---@class ConnectionLoadMatch
---@field agent_id string

---@class ConnectionUpdateData
---@field agent_id string
---@field client? string
---@field machine? string|nil

---@class Event
---@field attachments? table
---@field channel string
---@field client? string
---@field createdAt string
---@field id number
---@field messageId string
---@field sender table
---@field text? string
---@field thread? string
---@field toThread? string
---@field type string

---@class EventListMatch
---@field agent_id string
---@field after? number

---@class EventCreateData
---@field agent_id string
---@field attachments? table
---@field client? string
---@field text? string
---@field thread? string
---@field toThread? string

---@class Listener

---@class ListenerListMatch
---@field agent_id string

---@class Me

---@class MeLoadMatch

---@class MeToken

---@class MeTokenRemoveMatch

---@class Message
---@field addressId string
---@field admission any
---@field attachments table
---@field author string|nil
---@field authorName string|nil
---@field cc table
---@field channel string
---@field client? string
---@field counterpart string
---@field counterpartName string|nil
---@field createdAt string
---@field direction string
---@field error string|nil
---@field forward? string
---@field id string
---@field refusal any
---@field replyTo? string
---@field status string
---@field subject string|nil
---@field text string
---@field thread any
---@field to table

---@class MessageLoadMatch
---@field agent_id string
---@field id string

---@class MessageListMatch
---@field agent_id string
---@field before? string
---@field channel? string
---@field counterpart? string
---@field direction? string
---@field limit? number
---@field search? string

---@class MessageCreateData
---@field agent_id string
---@field attachments? table
---@field cc? table
---@field channel? string
---@field client? string
---@field forward? string
---@field replyTo? string
---@field subject? string|nil
---@field text string
---@field thread? any
---@field to? table

---@class Teammate
---@field addresses table
---@field email string|nil
---@field icon any
---@field id string
---@field imageUrl string|nil
---@field kind string
---@field listening boolean|nil
---@field name string|nil
---@field phone string|nil
---@field role any

---@class TeammateListMatch
---@field addresses? table
---@field email? string|nil
---@field icon? any
---@field id? string
---@field imageUrl? string|nil
---@field kind? string
---@field listening? boolean|nil
---@field name? string|nil
---@field phone? string|nil
---@field role? any

---@class Token
---@field createdAt string
---@field id string
---@field lastUsedAt any
---@field name string

---@class TokenListMatch
---@field agent_id string

---@class TokenRemoveMatch
---@field agent_id string
---@field id string

---@class Webhook
---@field attempts number
---@field bearerToken? string
---@field createdAt string
---@field deliveredAt any
---@field error string|nil
---@field erroredAt any
---@field id string
---@field retryAt any
---@field url string

---@class WebhookListMatch
---@field agent_id string

---@class WebhookCreateData
---@field agent_id string
---@field bearerToken? string
---@field url string

---@class WebhookRemoveMatch
---@field agent_id string
---@field id string

local M = {}

return M
