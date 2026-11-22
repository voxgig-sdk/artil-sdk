# Artil Lua SDK



The Lua SDK for the Artil API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Access()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/artil-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("artil_sdk")

local client = sdk.new({
  apikey = os.getenv("ARTIL_APIKEY"),
})
```

### 3. Load an access

Access is nested under agent, so provide the `agent_id`.

`load` returns the entity; `data_get()` reads its record.

```lua
local access, err = client:Access():load({ agent_id = "example_agent_id" })
if err then error(err) end
local rec = access:data_get()
print(rec["id"])
```

### 4. Create, update, and remove

```lua
-- Update
client:Access():update({ agent_id = "example_agent_id", admit = "example_admit" })

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local agents, err = client:Agent():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Agent():list()
-- result is an array of entities, one per mock record; err is set on failure
```

### Verify the server over HTTPS

An `https://` request goes through LuaSocket and LuaSec, and the SDK checks
the server itself before any of the request is sent: its certificate against
the system's trust store, and its name against the host (an address against
the certificate's addresses). Nothing turns that off. `SSL_CERT_FILE` or
`SSL_CERT_DIR` names the trust store, as for OpenSSL; with neither set and no
system store found, an `https://` request fails rather than going unverified.
`ARTIL_CA_BUNDLE` names a PEM file of roots added to the store,
for a local service with its own certificate authority or a self-signed
certificate. A different policy is a custom fetch function, described next.

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### ArtilSDK

```lua
local sdk = require("artil_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ArtilSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Access` | `(data) -> AccessEntity` | Create an Access entity instance. |
| `Address` | `(data) -> AddressEntity` | Create an Address entity instance. |
| `AddressSetup` | `(data) -> AddressSetupEntity` | Create an AddressSetup entity instance. |
| `Agent` | `(data) -> AgentEntity` | Create an Agent entity instance. |
| `Channel` | `(data) -> ChannelEntity` | Create a Channel entity instance. |
| `Client` | `(data) -> ClientEntity` | Create a Client entity instance. |
| `Connection` | `(data) -> ConnectionEntity` | Create a Connection entity instance. |
| `Event` | `(data) -> EventEntity` | Create an Event entity instance. |
| `Listener` | `(data) -> ListenerEntity` | Create a Listener entity instance. |
| `Me` | `(data) -> MeEntity` | Create a Me entity instance. |
| `MeToken` | `(data) -> MeTokenEntity` | Create a MeToken entity instance. |
| `Message` | `(data) -> MessageEntity` | Create a Message entity instance. |
| `Teammate` | `(data) -> TeammateEntity` | Create a Teammate entity instance. |
| `Token` | `(data) -> TokenEntity` | Create a Token entity instance. |
| `Webhook` | `(data) -> WebhookEntity` | Create a Webhook entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity, and return it. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity, and return it. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity, and return it marked as deleted. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local access, err = client:Access():load({ agent_id = "example" })
    if err then error(err) end
    -- access is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Access

| Field | Description |
| --- | --- |
| `admit` | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `id` |  |
| `senders` | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |

Operations: Load, Update.

API path: `/agents/{id}/access`

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

Operations: Load, Update.

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

Operations: Create, List.

API path: `/agents/{id}/url`

#### Listener

| Field | Description |
| --- | --- |

Operations: List.

API path: `/agents/{id}/listeners`

#### Me

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/me`

#### MeToken

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/me/token`

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

#### Teammate

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

Create an instance: `local access = client:Access(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admit` | `string` | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `id` | `string` |  |
| `senders` | `table` | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |

#### Example: Load

```lua
local access, err = client:Access():load({ agent_id = "agent_id" })
```


### Address

Create an instance: `local address = client:Address(nil)`

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
| `channel` | `string` |  |
| `code` | `string` | The code the provider's consent page sent the member back with, beside setup |
| `country` | `string` | The ISO country of the phone number; the first one the server sells by default |
| `createdAt` | `string` |  |
| `domainId` | `any` | The workspace's own domain the address is on |
| `id` | `string` |  |
| `name` | `string|nil` | What people know the address by when its value is an id, like a Slack bot's @name |
| `primary` | `boolean` | Whether new messages on its channel go out from it |
| `registering` | `boolean` | Whether US carriers are still registering the phone number, which sends nothing until they have |
| `setup` | `string` | The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token |
| `token` | `string` | What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between |
| `value` | `string` | The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids |

#### Example: Load

```lua
local address, err = client:Address():load({ id = "address_id", agent_id = "agent_id" })
```

#### Example: List

```lua
local addresss, err = client:Address():list({ agent_id = "example" })
```

#### Example: Create

```lua
local address, err = client:Address():create({
  agent_id = "example_agent_id", -- string
  channel = "example_channel", -- string
})
```


### AddressSetup

Create an instance: `local address_setup = client:AddressSetup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channel` | `string` |  |
| `token` | `string` | What installs an app the member made: a Slack app's client id, client secret and signing secret, in that order, with spaces between. |

#### Example: Create

```lua
local address_setup, err = client:AddressSetup():create({
  agent_id = "example_agent_id", -- string
  channel = "example_channel", -- string
})
```


### Agent

Create an instance: `local agent = client:Agent(nil)`

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
| `createdAt` | `string` |  |
| `icon` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```lua
local agent, err = client:Agent():load({ id = "agent_id" })
```

#### Example: List

```lua
local agents, err = client:Agent():list()
```

#### Example: Create

```lua
local agent, err = client:Agent():create({
  name = "example_name", -- string
})
```


### Channel

Create an instance: `local channel = client:Channel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `kind` | `string` | The channel's kind, which messages and events name |
| `labels` | `table` | Words a client builds its texts about the channel from |
| `limits` | `table` | The most a message on the channel carries |
| `name` | `string` | What people and agents call the channel, like Telegram |

#### Example: List

```lua
local channels, err = client:Channel():list({ agent_id = "example" })
```


### Client

Create an instance: `local client_ = client:Client(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `id` | `string` | The credential identifying this client |
| `lastUsedAt` | `any` |  |
| `name` | `string` | The recorded client or device name, or the name of a manually created token |

#### Example: List

```lua
local client_s, err = client:Client():list({ agent_id = "example" })
```


### Connection

Create an instance: `local connection = client:Connection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `client` | `string` |  |
| `id` | `string` |  |
| `machine` | `string|nil` |  |
| `tokenId` | `string` | The agent's token the client connected with |

#### Example: Load

```lua
local connection, err = client:Connection():load({ agent_id = "agent_id" })
```


### Event

Create an instance: `local event = client:Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachments` | `table` | The files that came with a message Artil keeps no copy of |
| `channel` | `string` |  |
| `client` | `string` | The client you send from, like Codex, which the agent sees beside your name. |
| `createdAt` | `string` |  |
| `id` | `number` |  |
| `messageId` | `string` | The message's id, to read it with |
| `sender` | `table` |  |
| `text` | `string` | The text of a message Artil keeps no copy of, which comes whole |
| `thread` | `string` | The thread of your client you send from, so the agent can answer there. |
| `toThread` | `string` | The thread of the agent's client to hand the message to, from a message it sent |
| `type` | `string` |  |

#### Example: List

```lua
local events, err = client:Event():list({ agent_id = "example" })
```

#### Example: Create

```lua
local event, err = client:Event():create({
  agent_id = "example_agent_id", -- string
})
```


### Listener

Create an instance: `local listener = client:Listener(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```lua
local listeners, err = client:Listener():list({ agent_id = "example" })
```


### Me

Create an instance: `local me = client:Me(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local me, err = client:Me():load()
```


### MeToken

Create an instance: `local me_token = client:MeToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### Message

Create an instance: `local message = client:Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addressId` | `string` | The agent's address the message came to or went from; all zeros on url, where the agent's id is its address |
| `admission` | `any` | Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified |
| `attachments` | `table` |  |
| `author` | `string|nil` | Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel |
| `authorName` | `string|nil` | The name the author goes by, when the channel tells it |
| `cc` | `table` | Whom the message names as getting a copy |
| `channel` | `string` | The channel's kind, from listChannels |
| `client` | `string` | On url, the client you send from, like Codex, which the agent sees beside your name. |
| `counterpart` | `string` | Who sent an inbound message, or the group it came in, or the recipients of an outbound one |
| `counterpartName` | `string|nil` | The name an inbound message's sender or group goes by, when the channel tells it |
| `createdAt` | `string` |  |
| `direction` | `string` |  |
| `error` | `string|nil` | Why a failed message was not sent or did not arrive |
| `forward` | `string` |  |
| `id` | `string` |  |
| `refusal` | `any` | Why a refused message did not wake the agent |
| `replyTo` | `string` |  |
| `status` | `string` | `reported` when the recipient marked an email the agent sent as spam |
| `subject` | `string|nil` |  |
| `text` | `string` |  |
| `thread` | `any` | For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered |
| `to` | `table` | Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy |

#### Example: Load

```lua
local message, err = client:Message():load({ id = "message_id", agent_id = "agent_id" })
```

#### Example: List

```lua
local messages, err = client:Message():list({ agent_id = "example" })
```

#### Example: Create

```lua
local message, err = client:Message():create({
  agent_id = "example_agent_id", -- string
  text = "example_text", -- string
})
```


### Teammate

Create an instance: `local teammate = client:Teammate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `table` | Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number |
| `email` | `string|nil` | The agent's primary email address, or the member's |
| `icon` | `any` | The agent's icon; null for members |
| `id` | `string` | The agent's or member's id |
| `imageUrl` | `string|nil` | The member's picture from their sign-in profile, or the avatar it makes them; null for agents |
| `kind` | `string` |  |
| `listening` | `boolean|nil` | Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members |
| `name` | `string|nil` |  |
| `phone` | `string|nil` | The agent's primary phone number, or the one a member added to their profile |
| `role` | `any` | The member's role in the workspace; null for agents |

#### Example: List

```lua
local teammates, err = client:Teammate():list()
```


### Token

Create an instance: `local token = client:Token(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `id` | `string` |  |
| `lastUsedAt` | `any` |  |
| `name` | `string` |  |

#### Example: List

```lua
local tokens, err = client:Token():list({ agent_id = "example" })
```


### Webhook

Create an instance: `local webhook = client:Webhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempts` | `number` | How many times the event Artil is retrying has failed |
| `bearerToken` | `string` | A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger. |
| `createdAt` | `string` |  |
| `deliveredAt` | `any` |  |
| `error` | `string|nil` | Why the last delivery failed |
| `erroredAt` | `any` |  |
| `id` | `string` |  |
| `retryAt` | `any` | When Artil next retries a failed event |
| `url` | `string` | Where Artil posts the agent's events |

#### Example: List

```lua
local webhooks, err = client:Webhook():list({ agent_id = "example" })
```

#### Example: Create

```lua
local webhook, err = client:Webhook():create({
  agent_id = "example_agent_id", -- string
  url = "example_url", -- string
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

Features are the extension mechanism. A feature is a Lua table
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

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── artil_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`artil_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local agent = client:Agent()
agent:list()

-- agent:data_get() now returns the agent data from the last list
-- agent:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
