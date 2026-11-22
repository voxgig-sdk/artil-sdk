# Artil TypeScript SDK Reference

Complete API reference for the Artil TypeScript SDK.


## ArtilSDK

### Constructor

```ts
new ArtilSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ArtilSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ArtilSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ArtilSDK` instance in test mode.


### Instance Methods

#### `Access(data?: object)`

Create a new `Access` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccessEntity` instance.

#### `Address(data?: object)`

Create a new `Address` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AddressEntity` instance.

#### `AddressSetup(data?: object)`

Create a new `AddressSetup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AddressSetupEntity` instance.

#### `Agent(data?: object)`

Create a new `Agent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentEntity` instance.

#### `Channel(data?: object)`

Create a new `Channel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ChannelEntity` instance.

#### `Client(data?: object)`

Create a new `Client` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ClientEntity` instance.

#### `Connection(data?: object)`

Create a new `Connection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConnectionEntity` instance.

#### `Event(data?: object)`

Create a new `Event` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventEntity` instance.

#### `Listener(data?: object)`

Create a new `Listener` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListenerEntity` instance.

#### `Me(data?: object)`

Create a new `Me` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeEntity` instance.

#### `MeToken(data?: object)`

Create a new `MeToken` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeTokenEntity` instance.

#### `Message(data?: object)`

Create a new `Message` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MessageEntity` instance.

#### `Teammate(data?: object)`

Create a new `Teammate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TeammateEntity` instance.

#### `Token(data?: object)`

Create a new `Token` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TokenEntity` instance.

#### `Webhook(data?: object)`

Create a new `Webhook` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebhookEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ArtilSDK.test()`.

**Returns:** `ArtilSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AccessEntity

```ts
const access = client.Access()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admit` | `string` | Yes | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `id` | `string` | No |  |
| `senders` | `any[]` | Yes | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Access().load({ agent_id: 'agent_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Access().update({
  agent_id: 'agent_id',
  id: 'id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccessEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AddressEntity

```ts
const address = client.Address()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channel` | `string` | Yes |  |
| `code` | `string` | No | The code the provider's consent page sent the member back with, beside setup |
| `country` | `string` | No | The ISO country of the phone number; the first one the server sells by default |
| `createdAt` | `string` | Yes |  |
| `domainId` | `any` | Yes | The workspace's own domain the address is on |
| `id` | `string` | Yes |  |
| `name` | `string | null` | Yes | What people know the address by when its value is an id, like a Slack bot's @name |
| `primary` | `boolean` | Yes | Whether new messages on its channel go out from it |
| `registering` | `boolean` | No | Whether US carriers are still registering the phone number, which sends nothing until they have |
| `setup` | `string` | No | The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token |
| `token` | `string` | No | What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between |
| `value` | `string` | Yes | The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `primary` | `/agents/{id}/addresses/{addressId}/primary` | `client.Address().create({ $action: 'primary', ... })` |

An action returns that action's OWN response, which is not necessarily a
Address record — check the API definition for its shape.

```ts
const result = await client.Address().create({
  $action: 'primary',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Address().create({
  agent_id: 'example_agent_id',
  channel: 'example_channel',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Address().list({ agent_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Address().load({ id: 'address_id', agent_id: 'agent_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Address().remove({ id: 'address_id', agent_id: 'agent_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Address().update({
  id: 'address_id',
  agent_id: 'agent_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AddressEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AddressSetupEntity

```ts
const address_setup = client.AddressSetup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channel` | `string` | Yes |  |
| `token` | `string` | No | What installs an app the member made: a Slack app's client id, client secret and signing secret, in that order, with spaces between. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AddressSetup().create({
  agent_id: 'example_agent_id',
  channel: 'example_channel',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AddressSetupEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentEntity

```ts
const agent = client.Agent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes |  |
| `icon` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `createdAt` | - | - | - | - | - |
| `icon` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Agent().create({
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Agent().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Agent().load({ id: 'agent_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Agent().remove({ id: 'agent_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Agent().update({
  id: 'agent_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ChannelEntity

```ts
const channel = client.Channel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `kind` | `string` | Yes | The channel's kind, which messages and events name |
| `labels` | `Record<string, any>` | Yes | Words a client builds its texts about the channel from |
| `limits` | `Record<string, any>` | Yes | The most a message on the channel carries |
| `name` | `string` | Yes | What people and agents call the channel, like Telegram |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Channel().list({ agent_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ChannelEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ClientEntity

```ts
const client_ = client.Client()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes |  |
| `id` | `string` | Yes | The credential identifying this client |
| `lastUsedAt` | `any` | Yes |  |
| `name` | `string` | Yes | The recorded client or device name, or the name of a manually created token |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Client().list({ agent_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ClientEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConnectionEntity

```ts
const connection = client.Connection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `client` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `machine` | `string | null` | Yes |  |
| `tokenId` | `string` | Yes | The agent's token the client connected with |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `client` | - | - |
| `id` | - | - |
| `machine` | - | Yes |
| `tokenId` | - | - |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Connection().load({ agent_id: 'agent_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Connection().update({
  agent_id: 'agent_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConnectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventEntity

```ts
const event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachments` | `any[]` | No | The files that came with a message Artil keeps no copy of |
| `channel` | `string` | Yes |  |
| `client` | `string` | No | The client you send from, like Codex, which the agent sees beside your name. |
| `createdAt` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `messageId` | `string` | Yes | The message's id, to read it with |
| `sender` | `Record<string, any>` | Yes |  |
| `text` | `string` | No | The text of a message Artil keeps no copy of, which comes whole |
| `thread` | `string` | No | The thread of your client you send from, so the agent can answer there. |
| `toThread` | `string` | No | The thread of the agent's client to hand the message to, from a message it sent |
| `type` | `string` | Yes |  |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `attachments` | - | - |
| `channel` | - | - |
| `client` | - | - |
| `createdAt` | - | - |
| `id` | - | - |
| `messageId` | - | - |
| `sender` | - | - |
| `text` | - | - |
| `thread` | - | - |
| `toThread` | Yes | - |
| `type` | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Event().create({
  agent_id: 'example_agent_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Event().list({ agent_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListenerEntity

```ts
const listener = client.Listener()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Listener().list({ agent_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListenerEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeEntity

```ts
const me = client.Me()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Me().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeTokenEntity

```ts
const me_token = client.MeToken()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.MeToken().remove()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeTokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MessageEntity

```ts
const message = client.Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addressId` | `string` | Yes | The agent's address the message came to or went from; all zeros on url, where the agent's id is its address |
| `admission` | `any` | Yes | Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified |
| `attachments` | `any[]` | Yes |  |
| `author` | `string | null` | Yes | Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel |
| `authorName` | `string | null` | Yes | The name the author goes by, when the channel tells it |
| `cc` | `any[]` | Yes | Whom the message names as getting a copy |
| `channel` | `string` | Yes | The channel's kind, from listChannels |
| `client` | `string` | No | On url, the client you send from, like Codex, which the agent sees beside your name. |
| `counterpart` | `string` | Yes | Who sent an inbound message, or the group it came in, or the recipients of an outbound one |
| `counterpartName` | `string | null` | Yes | The name an inbound message's sender or group goes by, when the channel tells it |
| `createdAt` | `string` | Yes |  |
| `direction` | `string` | Yes |  |
| `error` | `string | null` | Yes | Why a failed message was not sent or did not arrive |
| `forward` | `string` | No |  |
| `id` | `string` | Yes |  |
| `refusal` | `any` | Yes | Why a refused message did not wake the agent |
| `replyTo` | `string` | No |  |
| `status` | `string` | Yes | `reported` when the recipient marked an email the agent sent as spam |
| `subject` | `string | null` | Yes |  |
| `text` | `string` | Yes |  |
| `thread` | `any` | Yes | For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered |
| `to` | `any[]` | Yes | Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Message().create({
  agent_id: 'example_agent_id',
  text: 'example_text',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Message().list({ agent_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Message().load({ id: 'message_id', agent_id: 'agent_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MessageEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TeammateEntity

```ts
const teammate = client.Teammate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `any[]` | Yes | Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number |
| `email` | `string | null` | Yes | The agent's primary email address, or the member's |
| `icon` | `any` | Yes | The agent's icon; null for members |
| `id` | `string` | Yes | The agent's or member's id |
| `imageUrl` | `string | null` | Yes | The member's picture from their sign-in profile, or the avatar it makes them; null for agents |
| `kind` | `string` | Yes |  |
| `listening` | `boolean | null` | Yes | Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members |
| `name` | `string | null` | Yes |  |
| `phone` | `string | null` | Yes | The agent's primary phone number, or the one a member added to their profile |
| `role` | `any` | Yes | The member's role in the workspace; null for agents |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Teammate().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TeammateEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TokenEntity

```ts
const token = client.Token()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `lastUsedAt` | `any` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Token().list({ agent_id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Token().remove({ id: 'token_id', agent_id: 'agent_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebhookEntity

```ts
const webhook = client.Webhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempts` | `number` | Yes | How many times the event Artil is retrying has failed |
| `bearerToken` | `string` | No | A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger. |
| `createdAt` | `string` | Yes |  |
| `deliveredAt` | `any` | Yes |  |
| `error` | `string | null` | Yes | Why the last delivery failed |
| `erroredAt` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `retryAt` | `any` | Yes | When Artil next retries a failed event |
| `url` | `string` | Yes | Where Artil posts the agent's events |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Webhook().create({
  agent_id: 'example_agent_id',
  url: 'example_url',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Webhook().list({ agent_id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Webhook().remove({ id: 'webhook_id', agent_id: 'agent_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebhookEntity` instance with the same client and
options.

#### `client()`

Return the parent `ArtilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


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

```ts
const client = new ArtilSDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    secrets: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

