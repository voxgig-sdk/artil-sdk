# frozen_string_literal: true

# Typed models for the Artil SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Access entity data model.
#
# @!attribute [rw] admit
#   @return [String]
#
# @!attribute [rw] senders
#   @return [Array]
Access = Struct.new(
  :admit,
  :senders,
  keyword_init: true
)

# Request payload for Access#load.
#
# @!attribute [rw] agent_id
#   @return [String]
AccessLoadMatch = Struct.new(
  :agent_id,
  keyword_init: true
)

# Request payload for Access#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] admit
#   @return [String, nil]
#
# @!attribute [rw] senders
#   @return [Array, nil]
AccessUpdateData = Struct.new(
  :agent_id,
  :channel,
  :admit,
  :senders,
  keyword_init: true
)

# Address entity data model.
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] domainId
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [Object]
#
# @!attribute [rw] primary
#   @return [Boolean]
#
# @!attribute [rw] registering
#   @return [Boolean, nil]
#
# @!attribute [rw] setup
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String]
Address = Struct.new(
  :channel,
  :code,
  :country,
  :createdAt,
  :domainId,
  :id,
  :name,
  :primary,
  :registering,
  :setup,
  :token,
  :value,
  keyword_init: true
)

# Request payload for Address#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AddressLoadMatch = Struct.new(
  :agent_id,
  :id,
  keyword_init: true
)

# Request payload for Address#list.
#
# @!attribute [rw] agent_id
#   @return [String]
AddressListMatch = Struct.new(
  :agent_id,
  keyword_init: true
)

# Request payload for Address#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] setup
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
AddressCreateData = Struct.new(
  :agent_id,
  :channel,
  :code,
  :country,
  :setup,
  :token,
  :value,
  keyword_init: true
)

# Request payload for Address#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] value
#   @return [String, nil]
AddressUpdateData = Struct.new(
  :agent_id,
  :id,
  :value,
  keyword_init: true
)

# Request payload for Address#remove.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AddressRemoveMatch = Struct.new(
  :agent_id,
  :id,
  keyword_init: true
)

# AddressSetup entity data model.
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] token
#   @return [String, nil]
AddressSetup = Struct.new(
  :channel,
  :token,
  keyword_init: true
)

# Request payload for AddressSetup#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] token
#   @return [String, nil]
AddressSetupCreateData = Struct.new(
  :agent_id,
  :channel,
  :token,
  keyword_init: true
)

# Agent entity data model.
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] icon
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
Agent = Struct.new(
  :createdAt,
  :icon,
  :id,
  :name,
  keyword_init: true
)

# Request payload for Agent#load.
#
# @!attribute [rw] id
#   @return [String]
AgentLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Agent#list.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] icon
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
AgentListMatch = Struct.new(
  :createdAt,
  :icon,
  :id,
  :name,
  keyword_init: true
)

# Request payload for Agent#create.
#
# @!attribute [rw] icon
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
AgentCreateData = Struct.new(
  :icon,
  :name,
  keyword_init: true
)

# Request payload for Agent#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] icon
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
AgentUpdateData = Struct.new(
  :id,
  :icon,
  :name,
  keyword_init: true
)

# Request payload for Agent#remove.
#
# @!attribute [rw] id
#   @return [String]
AgentRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Channel entity data model.
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] labels
#   @return [Hash]
#
# @!attribute [rw] limits
#   @return [Hash]
#
# @!attribute [rw] name
#   @return [String]
Channel = Struct.new(
  :kind,
  :labels,
  :limits,
  :name,
  keyword_init: true
)

# Request payload for Channel#list.
#
# @!attribute [rw] agent_id
#   @return [String]
ChannelListMatch = Struct.new(
  :agent_id,
  keyword_init: true
)

# Client entity data model.
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lastUsedAt
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
Client = Struct.new(
  :createdAt,
  :id,
  :lastUsedAt,
  :name,
  keyword_init: true
)

# Request payload for Client#list.
#
# @!attribute [rw] agent_id
#   @return [String]
ClientListMatch = Struct.new(
  :agent_id,
  keyword_init: true
)

# Connection entity data model.
#
# @!attribute [rw] client
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] machine
#   @return [Object]
#
# @!attribute [rw] tokenId
#   @return [String]
Connection = Struct.new(
  :client,
  :id,
  :machine,
  :tokenId,
  keyword_init: true
)

# Request payload for Connection#load.
#
# @!attribute [rw] agent_id
#   @return [String]
ConnectionLoadMatch = Struct.new(
  :agent_id,
  keyword_init: true
)

# Request payload for Connection#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] client
#   @return [String, nil]
#
# @!attribute [rw] machine
#   @return [Object, nil]
ConnectionUpdateData = Struct.new(
  :agent_id,
  :client,
  :machine,
  keyword_init: true
)

# Event entity data model.
#
# @!attribute [rw] attachments
#   @return [Array, nil]
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] client
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] messageId
#   @return [String]
#
# @!attribute [rw] sender
#   @return [Hash]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] thread
#   @return [String, nil]
#
# @!attribute [rw] toThread
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
Event = Struct.new(
  :attachments,
  :channel,
  :client,
  :createdAt,
  :id,
  :messageId,
  :sender,
  :text,
  :thread,
  :toThread,
  :type,
  keyword_init: true
)

# Request payload for Event#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] after
#   @return [Integer, nil]
EventListMatch = Struct.new(
  :agent_id,
  :after,
  keyword_init: true
)

# Request payload for Event#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] attachments
#   @return [Array, nil]
#
# @!attribute [rw] client
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] thread
#   @return [String, nil]
#
# @!attribute [rw] toThread
#   @return [String, nil]
EventCreateData = Struct.new(
  :agent_id,
  :attachments,
  :client,
  :text,
  :thread,
  :toThread,
  keyword_init: true
)

# Listener entity data model.
class Listener
end

# Request payload for Listener#list.
#
# @!attribute [rw] agent_id
#   @return [String]
ListenerListMatch = Struct.new(
  :agent_id,
  keyword_init: true
)

# Me entity data model.
class Me
end

# Request payload for Me#load.
class MeLoadMatch
end

# MeToken entity data model.
class MeToken
end

# Request payload for MeToken#remove.
class MeTokenRemoveMatch
end

# Message entity data model.
#
# @!attribute [rw] addressId
#   @return [String]
#
# @!attribute [rw] admission
#   @return [Object]
#
# @!attribute [rw] attachments
#   @return [Array]
#
# @!attribute [rw] author
#   @return [Object]
#
# @!attribute [rw] authorName
#   @return [Object]
#
# @!attribute [rw] cc
#   @return [Array]
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] client
#   @return [String, nil]
#
# @!attribute [rw] counterpart
#   @return [String]
#
# @!attribute [rw] counterpartName
#   @return [Object]
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] direction
#   @return [String]
#
# @!attribute [rw] error
#   @return [Object]
#
# @!attribute [rw] forward
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] refusal
#   @return [Object]
#
# @!attribute [rw] replyTo
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] subject
#   @return [Object]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] thread
#   @return [Object]
#
# @!attribute [rw] to
#   @return [Array]
Message = Struct.new(
  :addressId,
  :admission,
  :attachments,
  :author,
  :authorName,
  :cc,
  :channel,
  :client,
  :counterpart,
  :counterpartName,
  :createdAt,
  :direction,
  :error,
  :forward,
  :id,
  :refusal,
  :replyTo,
  :status,
  :subject,
  :text,
  :thread,
  :to,
  keyword_init: true
)

# Request payload for Message#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
MessageLoadMatch = Struct.new(
  :agent_id,
  :id,
  keyword_init: true
)

# Request payload for Message#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] before
#   @return [String, nil]
#
# @!attribute [rw] channel
#   @return [String, nil]
#
# @!attribute [rw] counterpart
#   @return [String, nil]
#
# @!attribute [rw] direction
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
MessageListMatch = Struct.new(
  :agent_id,
  :before,
  :channel,
  :counterpart,
  :direction,
  :limit,
  :search,
  keyword_init: true
)

# Request payload for Message#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] attachments
#   @return [Array, nil]
#
# @!attribute [rw] cc
#   @return [Array, nil]
#
# @!attribute [rw] channel
#   @return [String, nil]
#
# @!attribute [rw] client
#   @return [String, nil]
#
# @!attribute [rw] forward
#   @return [String, nil]
#
# @!attribute [rw] replyTo
#   @return [String, nil]
#
# @!attribute [rw] subject
#   @return [Object, nil]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] thread
#   @return [Object, nil]
#
# @!attribute [rw] to
#   @return [Array, nil]
MessageCreateData = Struct.new(
  :agent_id,
  :attachments,
  :cc,
  :channel,
  :client,
  :forward,
  :replyTo,
  :subject,
  :text,
  :thread,
  :to,
  keyword_init: true
)

# Teammate entity data model.
#
# @!attribute [rw] addresses
#   @return [Array]
#
# @!attribute [rw] email
#   @return [Object]
#
# @!attribute [rw] icon
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] imageUrl
#   @return [Object]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] listening
#   @return [Object]
#
# @!attribute [rw] name
#   @return [Object]
#
# @!attribute [rw] phone
#   @return [Object]
#
# @!attribute [rw] role
#   @return [Object]
Teammate = Struct.new(
  :addresses,
  :email,
  :icon,
  :id,
  :imageUrl,
  :kind,
  :listening,
  :name,
  :phone,
  :role,
  keyword_init: true
)

# Request payload for Teammate#list.
#
# @!attribute [rw] addresses
#   @return [Array, nil]
#
# @!attribute [rw] email
#   @return [Object, nil]
#
# @!attribute [rw] icon
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] imageUrl
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] listening
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [Object, nil]
#
# @!attribute [rw] phone
#   @return [Object, nil]
#
# @!attribute [rw] role
#   @return [Object, nil]
TeammateListMatch = Struct.new(
  :addresses,
  :email,
  :icon,
  :id,
  :imageUrl,
  :kind,
  :listening,
  :name,
  :phone,
  :role,
  keyword_init: true
)

# Token entity data model.
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lastUsedAt
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
Token = Struct.new(
  :createdAt,
  :id,
  :lastUsedAt,
  :name,
  keyword_init: true
)

# Request payload for Token#list.
#
# @!attribute [rw] agent_id
#   @return [String]
TokenListMatch = Struct.new(
  :agent_id,
  keyword_init: true
)

# Request payload for Token#remove.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
TokenRemoveMatch = Struct.new(
  :agent_id,
  :id,
  keyword_init: true
)

# Webhook entity data model.
#
# @!attribute [rw] attempts
#   @return [Integer]
#
# @!attribute [rw] bearerToken
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] deliveredAt
#   @return [Object]
#
# @!attribute [rw] error
#   @return [Object]
#
# @!attribute [rw] erroredAt
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] retryAt
#   @return [Object]
#
# @!attribute [rw] url
#   @return [String]
Webhook = Struct.new(
  :attempts,
  :bearerToken,
  :createdAt,
  :deliveredAt,
  :error,
  :erroredAt,
  :id,
  :retryAt,
  :url,
  keyword_init: true
)

# Request payload for Webhook#list.
#
# @!attribute [rw] agent_id
#   @return [String]
WebhookListMatch = Struct.new(
  :agent_id,
  keyword_init: true
)

# Request payload for Webhook#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] bearerToken
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String]
WebhookCreateData = Struct.new(
  :agent_id,
  :bearerToken,
  :url,
  keyword_init: true
)

# Request payload for Webhook#remove.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
WebhookRemoveMatch = Struct.new(
  :agent_id,
  :id,
  keyword_init: true
)

