# Artil Ruby SDK Reference

Complete API reference for the Artil Ruby SDK.


## ArtilSDK

### Constructor

```ruby
require_relative 'Artil_sdk'

client = ArtilSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ArtilSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = ArtilSDK.test
```


### Instance Methods

#### `Access(data = nil)`

Create a new `Access` entity instance. Pass `nil` for no initial data.

#### `Address(data = nil)`

Create a new `Address` entity instance. Pass `nil` for no initial data.

#### `AddressSetup(data = nil)`

Create a new `AddressSetup` entity instance. Pass `nil` for no initial data.

#### `Agent(data = nil)`

Create a new `Agent` entity instance. Pass `nil` for no initial data.

#### `Channel(data = nil)`

Create a new `Channel` entity instance. Pass `nil` for no initial data.

#### `Client(data = nil)`

Create a new `Client` entity instance. Pass `nil` for no initial data.

#### `Connection(data = nil)`

Create a new `Connection` entity instance. Pass `nil` for no initial data.

#### `Event(data = nil)`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `ListedTeammate(data = nil)`

Create a new `ListedTeammate` entity instance. Pass `nil` for no initial data.

#### `Listener(data = nil)`

Create a new `Listener` entity instance. Pass `nil` for no initial data.

#### `Men(data = nil)`

Create a new `Men` entity instance. Pass `nil` for no initial data.

#### `Message(data = nil)`

Create a new `Message` entity instance. Pass `nil` for no initial data.

#### `Token(data = nil)`

Create a new `Token` entity instance. Pass `nil` for no initial data.

#### `Webhook(data = nil)`

Create a new `Webhook` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AccessEntity

```ruby
access = client.Access
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admit` | `String` | Yes | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `id` | `String` | No |  |
| `senders` | `Array` | Yes | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |

### Operations

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Access.update({
  "agent_id" => "agent_id",
  "id" => "id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AccessEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AddressEntity

```ruby
address = client.Address
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channel` | `String` | Yes |  |
| `code` | `String` | No | The code the provider's consent page sent the member back with, beside setup |
| `country` | `String` | No | The ISO country of the phone number; the first one the server sells by default |
| `createdAt` | `String` | Yes |  |
| `domainId` | `Object` | Yes | The workspace's own domain the address is on |
| `id` | `String` | Yes |  |
| `name` | `Object` | Yes | What people know the address by when its value is an id, like a Slack bot's @name |
| `primary` | `Boolean` | Yes | Whether new messages on its channel go out from it |
| `registering` | `Boolean` | No | Whether US carriers are still registering the phone number, which sends nothing until they have |
| `setup` | `String` | No | The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token |
| `token` | `String` | No | What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between |
| `value` | `String` | Yes | The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `channel` | - | - | - | - | - |
| `code` | - | - | - | - | - |
| `country` | - | - | - | - | - |
| `createdAt` | - | - | - | - | - |
| `domainId` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `primary` | - | - | - | - | - |
| `registering` | - | - | - | - | - |
| `setup` | - | - | - | - | - |
| `token` | - | - | - | - | - |
| `value` | - | - | Yes | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Address.create({
  "agent_id" => "example_agent_id", # String
  "channel" => "example_channel", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Address.list({ "agent_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Address.load({ "id" => "address_id", "agent_id" => "agent_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Address.remove({ "id" => "address_id", "agent_id" => "agent_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Address.update({
  "id" => "address_id",
  "agent_id" => "agent_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AddressEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AddressSetupEntity

```ruby
address_setup = client.AddressSetup
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channel` | `String` | Yes |  |
| `token` | `String` | No | What installs an app the member made: a Slack app's client id, client secret and signing secret, in that order, with spaces between. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AddressSetup.create({
  "agent_id" => "example_agent_id", # String
  "channel" => "example_channel", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AddressSetupEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentEntity

```ruby
agent = client.Agent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | Yes |  |
| `icon` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `createdAt` | - | - | - | - | - |
| `icon` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Agent.create({
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Agent.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Agent.load({ "id" => "agent_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Agent.remove({ "id" => "agent_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Agent.update({
  "id" => "agent_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ChannelEntity

```ruby
channel = client.Channel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `kind` | `String` | Yes | The channel's kind, which messages and events name |
| `labels` | `Hash` | Yes | Words a client builds its texts about the channel from |
| `limits` | `Hash` | Yes | The most a message on the channel carries |
| `name` | `String` | Yes | What people and agents call the channel, like Telegram |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Channel.list({ "agent_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ChannelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ClientEntity

```ruby
client_ = client.Client
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | Yes |  |
| `id` | `String` | Yes | The credential identifying this client |
| `lastUsedAt` | `Object` | Yes |  |
| `name` | `String` | Yes | The recorded client or device name, or the name of a manually created token |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Client.list({ "agent_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ClientEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ConnectionEntity

```ruby
connection = client.Connection
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `client` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `machine` | `Object` | Yes |  |
| `tokenId` | `String` | Yes | The agent's token the client connected with |

### Field Usage by Operation

| Field | update |
| --- | --- |
| `client` | - |
| `id` | - |
| `machine` | Yes |
| `tokenId` | - |

### Operations

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Connection.update({
  "agent_id" => "agent_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConnectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EventEntity

```ruby
event = client.Event
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachments` | `Array` | No | The files that came with a message Artil keeps no copy of |
| `channel` | `String` | Yes |  |
| `client` | `String` | No | The client you send from, like Codex, which the agent sees beside your name. |
| `createdAt` | `String` | Yes |  |
| `id` | `Integer` | Yes |  |
| `messageId` | `String` | Yes | The message's id, to read it with |
| `sender` | `Hash` | Yes |  |
| `text` | `String` | No | The text of a message Artil keeps no copy of, which comes whole |
| `thread` | `String` | No | The thread of your client you send from, so the agent can answer there. |
| `toThread` | `String` | No | The thread of the agent's client to hand the message to, from a message it sent |
| `type` | `String` | Yes |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `attachments` | - | - | - |
| `channel` | - | - | - |
| `client` | - | - | - |
| `createdAt` | - | - | - |
| `id` | - | - | - |
| `messageId` | - | - | - |
| `sender` | - | - | - |
| `text` | - | - | - |
| `thread` | - | - | - |
| `toThread` | - | Yes | - |
| `type` | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Event.create({
  "agent_id" => "example_agent_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Event.list({ "agent_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ListedTeammateEntity

```ruby
listed_teammate = client.ListedTeammate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `Array` | Yes | Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number |
| `email` | `Object` | Yes | The agent's primary email address, or the member's |
| `icon` | `Object` | Yes | The agent's icon; null for members |
| `id` | `String` | Yes | The agent's or member's id |
| `imageUrl` | `Object` | Yes | The member's picture from their sign-in profile, or the avatar it makes them; null for agents |
| `kind` | `String` | Yes |  |
| `listening` | `Object` | Yes | Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members |
| `name` | `Object` | Yes |  |
| `phone` | `Object` | Yes | The agent's primary phone number, or the one a member added to their profile |
| `role` | `Object` | Yes | The member's role in the workspace; null for agents |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ListedTeammate.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ListedTeammateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ListenerEntity

```ruby
listener = client.Listener
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Listener.list({ "agent_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ListenerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MenEntity

```ruby
men = client.Men
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Men.load()
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MessageEntity

```ruby
message = client.Message
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addressId` | `String` | Yes | The agent's address the message came to or went from; all zeros on url, where the agent's id is its address |
| `admission` | `Object` | Yes | Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified |
| `attachments` | `Array` | Yes |  |
| `author` | `Object` | Yes | Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel |
| `authorName` | `Object` | Yes | The name the author goes by, when the channel tells it |
| `cc` | `Array` | Yes | Whom the message names as getting a copy |
| `channel` | `String` | Yes | The channel's kind, from listChannels |
| `client` | `String` | No | On url, the client you send from, like Codex, which the agent sees beside your name. |
| `counterpart` | `String` | Yes | Who sent an inbound message, or the group it came in, or the recipients of an outbound one |
| `counterpartName` | `Object` | Yes | The name an inbound message's sender or group goes by, when the channel tells it |
| `createdAt` | `String` | Yes |  |
| `direction` | `String` | Yes |  |
| `error` | `Object` | Yes | Why a failed message was not sent or did not arrive |
| `forward` | `String` | No |  |
| `id` | `String` | Yes |  |
| `refusal` | `Object` | Yes | Why a refused message did not wake the agent |
| `replyTo` | `String` | No |  |
| `status` | `String` | Yes | `reported` when the recipient marked an email the agent sent as spam |
| `subject` | `Object` | Yes |  |
| `text` | `String` | Yes |  |
| `thread` | `Object` | Yes | For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered |
| `to` | `Array` | Yes | Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `addressId` | - | - | - |
| `admission` | - | - | - |
| `attachments` | - | - | Yes |
| `author` | - | - | - |
| `authorName` | - | - | - |
| `cc` | - | - | Yes |
| `channel` | - | - | Yes |
| `client` | - | - | - |
| `counterpart` | - | - | - |
| `counterpartName` | - | - | - |
| `createdAt` | - | - | - |
| `direction` | - | - | - |
| `error` | - | - | - |
| `forward` | - | - | - |
| `id` | - | - | - |
| `refusal` | - | - | - |
| `replyTo` | - | - | - |
| `status` | - | - | - |
| `subject` | - | - | Yes |
| `text` | - | - | - |
| `thread` | - | - | Yes |
| `to` | - | - | Yes |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Message.create({
  "agent_id" => "example_agent_id", # String
  "text" => "example_text", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Message.list({ "agent_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Message.load({ "id" => "message_id", "agent_id" => "agent_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MessageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TokenEntity

```ruby
token = client.Token
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `lastUsedAt` | `Object` | Yes |  |
| `name` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Token.list({ "agent_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Token.remove({ "id" => "token_id", "agent_id" => "agent_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TokenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WebhookEntity

```ruby
webhook = client.Webhook
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempts` | `Integer` | Yes | How many times the event Artil is retrying has failed |
| `bearerToken` | `String` | No | A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger. |
| `createdAt` | `String` | Yes |  |
| `deliveredAt` | `Object` | Yes |  |
| `error` | `Object` | Yes | Why the last delivery failed |
| `erroredAt` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `retryAt` | `Object` | Yes | When Artil next retries a failed event |
| `url` | `String` | Yes | Where Artil posts the agent's events |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Webhook.create({
  "agent_id" => "example_agent_id", # String
  "url" => "example_url", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Webhook.list({ "agent_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Webhook.remove({ "id" => "webhook_id", "agent_id" => "agent_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WebhookEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `secrets` | 0.1.0 | Secrets |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ruby
client = ArtilSDK.new({
  "feature" => {
    "debug" => { "active" => true },
    "idempotency" => { "active" => true },
    "metrics" => { "active" => true },
    "paging" => { "active" => true },
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "secrets" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `secrets`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `secrets`

Secrets.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

**Usage**

Set `feature.secrets.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

