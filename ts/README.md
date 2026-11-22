# Artil TypeScript SDK



The TypeScript SDK for the Artil API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Access()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/artil-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/artil-sdk
npm install ./artil-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { ArtilSDK } from '@voxgig-sdk/artil-sdk'

const client = new ArtilSDK({
  apikey: process.env.ARTIL_APIKEY,
})
```

### 3. Load an address

Address is nested under agent, so provide the `agent_id`.
`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const address = await client.Address().load({
    agent_id: 'example_agent_id',
    id: 'example_id',
  })
  console.log(address.data())
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Update
const updated = await client.Access().update({
  agent_id: 'example_agent_id',
  admit: 'example_admit',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const agents = await client.Agent().list()
  console.log(agents.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = ArtilSDK.test()

const agents = await client.Agent().list()
// agents is an array of Agent entities, one per mock record
console.log(agents.map((agent) => agent.data()))
```

You can also use the instance method:

```ts
const client = new ArtilSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Agent()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new ArtilSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### ArtilSDK

#### Constructor

```ts
new ArtilSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Access(data?)` | `AccessEntity` | Create an Access entity instance. |
| `Address(data?)` | `AddressEntity` | Create an Address entity instance. |
| `AddressSetup(data?)` | `AddressSetupEntity` | Create an AddressSetup entity instance. |
| `Agent(data?)` | `AgentEntity` | Create an Agent entity instance. |
| `Channel(data?)` | `ChannelEntity` | Create a Channel entity instance. |
| `Client(data?)` | `ClientEntity` | Create a Client entity instance. |
| `Connection(data?)` | `ConnectionEntity` | Create a Connection entity instance. |
| `Event(data?)` | `EventEntity` | Create an Event entity instance. |
| `ListedTeammate(data?)` | `ListedTeammateEntity` | Create a ListedTeammate entity instance. |
| `Listener(data?)` | `ListenerEntity` | Create a Listener entity instance. |
| `Men(data?)` | `MenEntity` | Create a Men entity instance. |
| `Message(data?)` | `MessageEntity` | Create a Message entity instance. |
| `Token(data?)` | `TokenEntity` | Create a Token entity instance. |
| `Webhook(data?)` | `WebhookEntity` | Create a Webhook entity instance. |
| `tester(testopts?, sdkopts?)` | `ArtilSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `ArtilSDK.test(testopts?, sdkopts?)` | `ArtilSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): ArtilSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Access

| Field | Description |
| --- | --- |
| `admit` | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `id` |  |
| `senders` | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |

Operations: update.

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

Operations: create, list, load, remove, update.

API path: `/agents/{id}/addresses/{addressId}/primary`

#### AddressSetup

| Field | Description |
| --- | --- |
| `channel` |  |
| `token` | What installs an app the member made: a Slack app's client id, client secret and signing secret, in that order, with spaces between. |

Operations: create.

API path: `/agents/{id}/addresses/setups`

#### Agent

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `icon` |  |
| `id` |  |
| `name` |  |

Operations: create, list, load, remove, update.

API path: `/agents`

#### Channel

| Field | Description |
| --- | --- |
| `kind` | The channel's kind, which messages and events name |
| `labels` | Words a client builds its texts about the channel from |
| `limits` | The most a message on the channel carries |
| `name` | What people and agents call the channel, like Telegram |

Operations: list.

API path: `/agents/{id}/channels`

#### Client

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `id` | The credential identifying this client |
| `lastUsedAt` |  |
| `name` | The recorded client or device name, or the name of a manually created token |

Operations: list.

API path: `/agents/{id}/clients`

#### Connection

| Field | Description |
| --- | --- |
| `client` |  |
| `id` |  |
| `machine` |  |
| `tokenId` | The agent's token the client connected with |

Operations: update.

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

Operations: create, list, load.

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

Operations: list.

API path: `/team`

#### Listener

| Field | Description |
| --- | --- |

Operations: list.

API path: `/agents/{id}/listeners`

#### Men

| Field | Description |
| --- | --- |

Operations: load, remove.

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

Operations: create, list, load.

API path: `/agents/{id}/messages`

#### Token

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `id` |  |
| `lastUsedAt` |  |
| `name` |  |

Operations: list, remove.

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

Operations: create, list, remove.

API path: `/agents/{id}/webhooks`



## Entities


### Access

Create an instance: `const access = client.Access()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admit` | `string` | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `id` | `string` |  |
| `senders` | `any[]` | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |


### Address

Create an instance: `const address = client.Address()`

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
| `name` | `string | null` | What people know the address by when its value is an id, like a Slack bot's @name |
| `primary` | `boolean` | Whether new messages on its channel go out from it |
| `registering` | `boolean` | Whether US carriers are still registering the phone number, which sends nothing until they have |
| `setup` | `string` | The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token |
| `token` | `string` | What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between |
| `value` | `string` | The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids |

#### Example: Load

```ts
const address = await client.Address().load({ id: 'address_id', agent_id: 'agent_id' })
```

#### Example: List

```ts
const addresss = await client.Address().list({ agent_id: "example" })
```

#### Example: Create

```ts
const address = await client.Address().create({
  agent_id: 'example_agent_id',
  channel: 'example_channel',
})
```


### AddressSetup

Create an instance: `const address_setup = client.AddressSetup()`

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

```ts
const address_setup = await client.AddressSetup().create({
  agent_id: 'example_agent_id',
  channel: 'example_channel',
})
```


### Agent

Create an instance: `const agent = client.Agent()`

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

```ts
const agent = await client.Agent().load({ id: 'agent_id' })
```

#### Example: List

```ts
const agents = await client.Agent().list()
```

#### Example: Create

```ts
const agent = await client.Agent().create({
  name: 'example_name',
})
```


### Channel

Create an instance: `const channel = client.Channel()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `kind` | `string` | The channel's kind, which messages and events name |
| `labels` | `Record<string, any>` | Words a client builds its texts about the channel from |
| `limits` | `Record<string, any>` | The most a message on the channel carries |
| `name` | `string` | What people and agents call the channel, like Telegram |

#### Example: List

```ts
const channels = await client.Channel().list({ agent_id: "example" })
```


### Client

Create an instance: `const client_ = client.Client()`

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

```ts
const client_s = await client.Client().list({ agent_id: "example" })
```


### Connection

Create an instance: `const connection = client.Connection()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `client` | `string` |  |
| `id` | `string` |  |
| `machine` | `string | null` |  |
| `tokenId` | `string` | The agent's token the client connected with |


### Event

Create an instance: `const event = client.Event()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachments` | `any[]` | The files that came with a message Artil keeps no copy of |
| `channel` | `string` |  |
| `client` | `string` | The client you send from, like Codex, which the agent sees beside your name. |
| `createdAt` | `string` |  |
| `id` | `number` |  |
| `messageId` | `string` | The message's id, to read it with |
| `sender` | `Record<string, any>` |  |
| `text` | `string` | The text of a message Artil keeps no copy of, which comes whole |
| `thread` | `string` | The thread of your client you send from, so the agent can answer there. |
| `toThread` | `string` | The thread of the agent's client to hand the message to, from a message it sent |
| `type` | `string` |  |

#### Example: List

```ts
const events = await client.Event().list({ agent_id: "example" })
```

#### Example: Create

```ts
const event = await client.Event().create({
  agent_id: 'example_agent_id',
})
```


### ListedTeammate

Create an instance: `const listed_teammate = client.ListedTeammate()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `any[]` | Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number |
| `email` | `string | null` | The agent's primary email address, or the member's |
| `icon` | `any` | The agent's icon; null for members |
| `id` | `string` | The agent's or member's id |
| `imageUrl` | `string | null` | The member's picture from their sign-in profile, or the avatar it makes them; null for agents |
| `kind` | `string` |  |
| `listening` | `boolean | null` | Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members |
| `name` | `string | null` |  |
| `phone` | `string | null` | The agent's primary phone number, or the one a member added to their profile |
| `role` | `any` | The member's role in the workspace; null for agents |

#### Example: List

```ts
const listed_teammates = await client.ListedTeammate().list()
```


### Listener

Create an instance: `const listener = client.Listener()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const listeners = await client.Listener().list({ agent_id: "example" })
```


### Men

Create an instance: `const men = client.Men()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Example: Load

```ts
const men = await client.Men().load()
```


### Message

Create an instance: `const message = client.Message()`

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
| `attachments` | `any[]` |  |
| `author` | `string | null` | Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel |
| `authorName` | `string | null` | The name the author goes by, when the channel tells it |
| `cc` | `any[]` | Whom the message names as getting a copy |
| `channel` | `string` | The channel's kind, from listChannels |
| `client` | `string` | On url, the client you send from, like Codex, which the agent sees beside your name. |
| `counterpart` | `string` | Who sent an inbound message, or the group it came in, or the recipients of an outbound one |
| `counterpartName` | `string | null` | The name an inbound message's sender or group goes by, when the channel tells it |
| `createdAt` | `string` |  |
| `direction` | `string` |  |
| `error` | `string | null` | Why a failed message was not sent or did not arrive |
| `forward` | `string` |  |
| `id` | `string` |  |
| `refusal` | `any` | Why a refused message did not wake the agent |
| `replyTo` | `string` |  |
| `status` | `string` | `reported` when the recipient marked an email the agent sent as spam |
| `subject` | `string | null` |  |
| `text` | `string` |  |
| `thread` | `any` | For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered |
| `to` | `any[]` | Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy |

#### Example: Load

```ts
const message = await client.Message().load({ id: 'message_id', agent_id: 'agent_id' })
```

#### Example: List

```ts
const messages = await client.Message().list({ agent_id: "example" })
```

#### Example: Create

```ts
const message = await client.Message().create({
  agent_id: 'example_agent_id',
  text: 'example_text',
})
```


### Token

Create an instance: `const token = client.Token()`

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

```ts
const tokens = await client.Token().list({ agent_id: "example" })
```


### Webhook

Create an instance: `const webhook = client.Webhook()`

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
| `error` | `string | null` | Why the last delivery failed |
| `erroredAt` | `any` |  |
| `id` | `string` |  |
| `retryAt` | `any` | When Artil next retries a failed event |
| `url` | `string` | Where Artil posts the agent's events |

#### Example: List

```ts
const webhooks = await client.Webhook().list({ agent_id: "example" })
```

#### Example: Create

```ts
const webhook = await client.Webhook().create({
  agent_id: 'example_agent_id',
  url: 'example_url',
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

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

### Module structure

```
artil/
├── src/
│   ├── ArtilSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { ArtilSDK } from '@voxgig-sdk/artil-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const agent = client.Agent()
await agent.list()

// agent.data() now returns the agent data from the last `list`
// agent.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
