# Artil Ruby SDK



The Ruby SDK for the Artil API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Access` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/artil-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/artil-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-artil-sdk", path: "./artil-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Artil_sdk"

client = ArtilSDK.new({
  "apikey" => ENV["ARTIL_APIKEY"],
})
```

### 3. Load an address

Address is nested under agent, so provide the `agent_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the Address record (raises on error).
  address = client.Address.load({ "agent_id" => "example_agent_id", "id" => "example_id" })
  puts address.data_get
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# Update
client.Access.update({ "agent_id" => "example_agent_id", "admit" => "example_admit" })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  agents = client.Agent.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = ArtilSDK.test({
  "entity" => { "agent" => { "test01" => { "id" => "test01" } } },
})

# list returns an Array of Agent entities, one per mock record (raises on
# error); data_get reads each record.
agents = client.Agent.list()
agents.each { |item| puts item.data_get }
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = ArtilSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ARTIL_TEST_LIVE=TRUE
ARTIL_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### ArtilSDK

```ruby
require_relative "Artil_sdk"
client = ArtilSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = ArtilSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ArtilSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Access` | `(data) -> AccessEntity` | Create an Access entity instance. |
| `Address` | `(data) -> AddressEntity` | Create an Address entity instance. |
| `AddressSetup` | `(data) -> AddressSetupEntity` | Create an AddressSetup entity instance. |
| `Agent` | `(data) -> AgentEntity` | Create an Agent entity instance. |
| `Channel` | `(data) -> ChannelEntity` | Create a Channel entity instance. |
| `Client` | `(data) -> ClientEntity` | Create a Client entity instance. |
| `Connection` | `(data) -> ConnectionEntity` | Create a Connection entity instance. |
| `Event` | `(data) -> EventEntity` | Create an Event entity instance. |
| `ListedTeammate` | `(data) -> ListedTeammateEntity` | Create a ListedTeammate entity instance. |
| `Listener` | `(data) -> ListenerEntity` | Create a Listener entity instance. |
| `Men` | `(data) -> MenEntity` | Create a Men entity instance. |
| `Message` | `(data) -> MessageEntity` | Create a Message entity instance. |
| `Token` | `(data) -> TokenEntity` | Create a Token entity instance. |
| `Webhook` | `(data) -> WebhookEntity` | Create a Webhook entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`ArtilError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Access

| Field | Description |
| --- | --- |
| `admit` | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `id` |  |
| `senders` | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |

Operations: Update.

API path: `/agents/{id}/access/{channel}`

#### Address

| Field | Description |
| --- | --- |
| `channel` |  |
| `code` | The code the provider's consent page sent the member back with, beside setup |
| `country` | The ISO country of the phone number; the first one the server sells by default |
| `createdAt` |  |
| `domainId` | The workspace's own domain the address is on |
| `id` |  |
| `name` | What people know the address by when its value is an id, like a Slack bot's @name |
| `primary` | Whether new messages on its channel go out from it |
| `registering` | Whether US carriers are still registering the phone number, which sends nothing until they have |
| `setup` | The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token |
| `token` | What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between |
| `value` | The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids |

Operations: Create, List, Load, Remove, Update.

API path: `/agents/{id}/addresses/{addressId}/primary`

#### AddressSetup

| Field | Description |
| --- | --- |
| `channel` |  |
| `token` | What installs an app the member made: a Slack app's client id, client secret and signing secret, in that order, with spaces between. |

Operations: Create.

API path: `/agents/{id}/addresses/setups`

#### Agent

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `icon` |  |
| `id` |  |
| `name` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/agents`

#### Channel

| Field | Description |
| --- | --- |
| `kind` | The channel's kind, which messages and events name |
| `labels` | Words a client builds its texts about the channel from |
| `limits` | The most a message on the channel carries |
| `name` | What people and agents call the channel, like Telegram |

Operations: List.

API path: `/agents/{id}/channels`

#### Client

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `id` | The credential identifying this client |
| `lastUsedAt` |  |
| `name` | The recorded client or device name, or the name of a manually created token |

Operations: List.

API path: `/agents/{id}/clients`

#### Connection

| Field | Description |
| --- | --- |
| `client` |  |
| `id` |  |
| `machine` |  |
| `tokenId` | The agent's token the client connected with |

Operations: Update.

API path: `/agents/{id}/connection`

#### Event

| Field | Description |
| --- | --- |
| `attachments` | The files that came with a message Artil keeps no copy of |
| `channel` |  |
| `client` | The client you send from, like Codex, which the agent sees beside your name. |
| `createdAt` |  |
| `id` |  |
| `messageId` | The message's id, to read it with |
| `sender` |  |
| `text` | The text of a message Artil keeps no copy of, which comes whole |
| `thread` | The thread of your client you send from, so the agent can answer there. |
| `toThread` | The thread of the agent's client to hand the message to, from a message it sent |
| `type` |  |

Operations: Create, List, Load.

API path: `/agents/{id}/url`

#### ListedTeammate

| Field | Description |
| --- | --- |
| `addresses` | Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number |
| `email` | The agent's primary email address, or the member's |
| `icon` | The agent's icon; null for members |
| `id` | The agent's or member's id |
| `imageUrl` | The member's picture from their sign-in profile, or the avatar it makes them; null for agents |
| `kind` |  |
| `listening` | Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members |
| `name` |  |
| `phone` | The agent's primary phone number, or the one a member added to their profile |
| `role` | The member's role in the workspace; null for agents |

Operations: List.

API path: `/team`

#### Listener

| Field | Description |
| --- | --- |

Operations: List.

API path: `/agents/{id}/listeners`

#### Men

| Field | Description |
| --- | --- |

Operations: Load, Remove.

API path: `/me`

#### Message

| Field | Description |
| --- | --- |
| `addressId` | The agent's address the message came to or went from; all zeros on url, where the agent's id is its address |
| `admission` | Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified |
| `attachments` |  |
| `author` | Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel |
| `authorName` | The name the author goes by, when the channel tells it |
| `cc` | Whom the message names as getting a copy |
| `channel` | The channel's kind, from listChannels |
| `client` | On url, the client you send from, like Codex, which the agent sees beside your name. |
| `counterpart` | Who sent an inbound message, or the group it came in, or the recipients of an outbound one |
| `counterpartName` | The name an inbound message's sender or group goes by, when the channel tells it |
| `createdAt` |  |
| `direction` |  |
| `error` | Why a failed message was not sent or did not arrive |
| `forward` |  |
| `id` |  |
| `refusal` | Why a refused message did not wake the agent |
| `replyTo` |  |
| `status` | `reported` when the recipient marked an email the agent sent as spam |
| `subject` |  |
| `text` |  |
| `thread` | For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered |
| `to` | Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy |

Operations: Create, List, Load.

API path: `/agents/{id}/messages`

#### Token

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `id` |  |
| `lastUsedAt` |  |
| `name` |  |

Operations: List, Remove.

API path: `/agents/{id}/tokens`

#### Webhook

| Field | Description |
| --- | --- |
| `attempts` | How many times the event Artil is retrying has failed |
| `bearerToken` | A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger. |
| `createdAt` |  |
| `deliveredAt` |  |
| `error` | Why the last delivery failed |
| `erroredAt` |  |
| `id` |  |
| `retryAt` | When Artil next retries a failed event |
| `url` | Where Artil posts the agent's events |

Operations: Create, List, Remove.

API path: `/agents/{id}/webhooks`



## Entities


### Access

Create an instance: `access = client.Access`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admit` | `String` | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `id` | `String` |  |
| `senders` | `Array` | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |


### Address

Create an instance: `address = client.Address`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channel` | `String` |  |
| `code` | `String` | The code the provider's consent page sent the member back with, beside setup |
| `country` | `String` | The ISO country of the phone number; the first one the server sells by default |
| `createdAt` | `String` |  |
| `domainId` | `Object` | The workspace's own domain the address is on |
| `id` | `String` |  |
| `name` | `Object` | What people know the address by when its value is an id, like a Slack bot's @name |
| `primary` | `Boolean` | Whether new messages on its channel go out from it |
| `registering` | `Boolean` | Whether US carriers are still registering the phone number, which sends nothing until they have |
| `setup` | `String` | The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token |
| `token` | `String` | What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between |
| `value` | `String` | The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Address record (raises on error).
address = client.Address.load({ "id" => "address_id", "agent_id" => "agent_id" })
```

#### Example: List

```ruby
# list returns an Array of Address entities, one per record (raises on error).
addresss = client.Address.list({ "agent_id" => "example" })
addresss.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
address = client.Address.create({
  "agent_id" => "example_agent_id", # String
  "channel" => "example_channel", # String
})
```


### AddressSetup

Create an instance: `address_setup = client.AddressSetup`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channel` | `String` |  |
| `token` | `String` | What installs an app the member made: a Slack app's client id, client secret and signing secret, in that order, with spaces between. |

#### Example: Create

```ruby
address_setup = client.AddressSetup.create({
  "agent_id" => "example_agent_id", # String
  "channel" => "example_channel", # String
})
```


### Agent

Create an instance: `agent = client.Agent`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `String` |  |
| `icon` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Agent record (raises on error).
agent = client.Agent.load({ "id" => "agent_id" })
```

#### Example: List

```ruby
# list returns an Array of Agent entities, one per record (raises on error).
agents = client.Agent.list
agents.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
agent = client.Agent.create({
  "name" => "example_name", # String
})
```


### Channel

Create an instance: `channel = client.Channel`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `kind` | `String` | The channel's kind, which messages and events name |
| `labels` | `Hash` | Words a client builds its texts about the channel from |
| `limits` | `Hash` | The most a message on the channel carries |
| `name` | `String` | What people and agents call the channel, like Telegram |

#### Example: List

```ruby
# list returns an Array of Channel entities, one per record (raises on error).
channels = client.Channel.list({ "agent_id" => "example" })
channels.each { |item| puts item.data_get }
```


### Client

Create an instance: `client_ = client.Client`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `String` |  |
| `id` | `String` | The credential identifying this client |
| `lastUsedAt` | `Object` |  |
| `name` | `String` | The recorded client or device name, or the name of a manually created token |

#### Example: List

```ruby
# list returns an Array of Client entities, one per record (raises on error).
client_s = client.Client.list({ "agent_id" => "example" })
client_s.each { |item| puts item.data_get }
```


### Connection

Create an instance: `connection = client.Connection`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `client` | `String` |  |
| `id` | `String` |  |
| `machine` | `Object` |  |
| `tokenId` | `String` | The agent's token the client connected with |


### Event

Create an instance: `event = client.Event`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachments` | `Array` | The files that came with a message Artil keeps no copy of |
| `channel` | `String` |  |
| `client` | `String` | The client you send from, like Codex, which the agent sees beside your name. |
| `createdAt` | `String` |  |
| `id` | `Integer` |  |
| `messageId` | `String` | The message's id, to read it with |
| `sender` | `Hash` |  |
| `text` | `String` | The text of a message Artil keeps no copy of, which comes whole |
| `thread` | `String` | The thread of your client you send from, so the agent can answer there. |
| `toThread` | `String` | The thread of the agent's client to hand the message to, from a message it sent |
| `type` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Event entities, one per record (raises on error).
events = client.Event.list({ "agent_id" => "example" })
events.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
event = client.Event.create({
  "agent_id" => "example_agent_id", # String
})
```


### ListedTeammate

Create an instance: `listed_teammate = client.ListedTeammate`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `Array` | Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number |
| `email` | `Object` | The agent's primary email address, or the member's |
| `icon` | `Object` | The agent's icon; null for members |
| `id` | `String` | The agent's or member's id |
| `imageUrl` | `Object` | The member's picture from their sign-in profile, or the avatar it makes them; null for agents |
| `kind` | `String` |  |
| `listening` | `Object` | Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members |
| `name` | `Object` |  |
| `phone` | `Object` | The agent's primary phone number, or the one a member added to their profile |
| `role` | `Object` | The member's role in the workspace; null for agents |

#### Example: List

```ruby
# list returns an Array of ListedTeammate entities, one per record (raises on error).
listed_teammates = client.ListedTeammate.list
listed_teammates.each { |item| puts item.data_get }
```


### Listener

Create an instance: `listener = client.Listener`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ruby
# list returns an Array of Listener entities, one per record (raises on error).
listeners = client.Listener.list({ "agent_id" => "example" })
listeners.each { |item| puts item.data_get }
```


### Men

Create an instance: `men = client.Men`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Men record (raises on error).
men = client.Men.load()
```


### Message

Create an instance: `message = client.Message`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addressId` | `String` | The agent's address the message came to or went from; all zeros on url, where the agent's id is its address |
| `admission` | `Object` | Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified |
| `attachments` | `Array` |  |
| `author` | `Object` | Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel |
| `authorName` | `Object` | The name the author goes by, when the channel tells it |
| `cc` | `Array` | Whom the message names as getting a copy |
| `channel` | `String` | The channel's kind, from listChannels |
| `client` | `String` | On url, the client you send from, like Codex, which the agent sees beside your name. |
| `counterpart` | `String` | Who sent an inbound message, or the group it came in, or the recipients of an outbound one |
| `counterpartName` | `Object` | The name an inbound message's sender or group goes by, when the channel tells it |
| `createdAt` | `String` |  |
| `direction` | `String` |  |
| `error` | `Object` | Why a failed message was not sent or did not arrive |
| `forward` | `String` |  |
| `id` | `String` |  |
| `refusal` | `Object` | Why a refused message did not wake the agent |
| `replyTo` | `String` |  |
| `status` | `String` | `reported` when the recipient marked an email the agent sent as spam |
| `subject` | `Object` |  |
| `text` | `String` |  |
| `thread` | `Object` | For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered |
| `to` | `Array` | Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Message record (raises on error).
message = client.Message.load({ "id" => "message_id", "agent_id" => "agent_id" })
```

#### Example: List

```ruby
# list returns an Array of Message entities, one per record (raises on error).
messages = client.Message.list({ "agent_id" => "example" })
messages.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
message = client.Message.create({
  "agent_id" => "example_agent_id", # String
  "text" => "example_text", # String
})
```


### Token

Create an instance: `token = client.Token`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `String` |  |
| `id` | `String` |  |
| `lastUsedAt` | `Object` |  |
| `name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Token entities, one per record (raises on error).
tokens = client.Token.list({ "agent_id" => "example" })
tokens.each { |item| puts item.data_get }
```


### Webhook

Create an instance: `webhook = client.Webhook`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempts` | `Integer` | How many times the event Artil is retrying has failed |
| `bearerToken` | `String` | A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger. |
| `createdAt` | `String` |  |
| `deliveredAt` | `Object` |  |
| `error` | `Object` | Why the last delivery failed |
| `erroredAt` | `Object` |  |
| `id` | `String` |  |
| `retryAt` | `Object` | When Artil next retries a failed event |
| `url` | `String` | Where Artil posts the agent's events |

#### Example: List

```ruby
# list returns an Array of Webhook entities, one per record (raises on error).
webhooks = client.Webhook.list({ "agent_id" => "example" })
webhooks.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
webhook = client.Webhook.create({
  "agent_id" => "example_agent_id", # String
  "url" => "example_url", # String
})
```

## Features

This SDK ships 9 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`secrets`](#secrets) | Secrets |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `secrets`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### secrets

Secrets.

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

Set `feature.secrets.active` to enable it, then override any of the options above.

`secrets` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **SecretsFeature**: Secrets
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Artil_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Artil_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
agent = client.Agent
agent.list()

# agent.data_get now returns the agent data from the last list
# agent.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
