# Artil Golang SDK



The Golang SDK for the Artil API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Access(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/artil-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/artil-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/artil-sdk/go=../artil-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/artil-sdk/go"
)

func main() {
    client := sdk.NewArtilSDK(map[string]any{
        "apikey": os.Getenv("ARTIL_APIKEY"),
    })

    // Load a single access — the value is the entity; Data() reads its record.
    access, err := client.Access(nil).Load(map[string]any{"agent_id": "example_agent_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(access.(sdk.Entity).Data())

    // Update a access.
    updated, err := client.Access(nil).Update(map[string]any{"agent_id": "example_agent_id", "admit": "example_admit"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(updated.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
agents, err := client.Agent(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = agents
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

agents, err := client.Agent(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range agents.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewArtilSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewArtilSDK

```go
func NewArtilSDK(options map[string]any) *ArtilSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *ArtilSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ArtilSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Access` | `(data map[string]any) ArtilEntityBase` | Create an Access entity instance. |
| `Address` | `(data map[string]any) ArtilEntityBase` | Create an Address entity instance. |
| `AddressSetup` | `(data map[string]any) ArtilEntityBase` | Create an AddressSetup entity instance. |
| `Agent` | `(data map[string]any) ArtilEntityBase` | Create an Agent entity instance. |
| `Channel` | `(data map[string]any) ArtilEntityBase` | Create a Channel entity instance. |
| `Client` | `(data map[string]any) ArtilEntityBase` | Create a Client entity instance. |
| `Connection` | `(data map[string]any) ArtilEntityBase` | Create a Connection entity instance. |
| `Event` | `(data map[string]any) ArtilEntityBase` | Create an Event entity instance. |
| `Listener` | `(data map[string]any) ArtilEntityBase` | Create a Listener entity instance. |
| `Me` | `(data map[string]any) ArtilEntityBase` | Create a Me entity instance. |
| `MeToken` | `(data map[string]any) ArtilEntityBase` | Create a MeToken entity instance. |
| `Message` | `(data map[string]any) ArtilEntityBase` | Create a Message entity instance. |
| `Teammate` | `(data map[string]any) ArtilEntityBase` | Create a Teammate entity instance. |
| `Token` | `(data map[string]any) ArtilEntityBase` | Create a Token entity instance. |
| `Webhook` | `(data map[string]any) ArtilEntityBase` | Create a Webhook entity instance. |

### Entity interface (ArtilEntityBase)

All entities implement the `ArtilEntityBase` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity, and return it. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity, and return it marked as deleted. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    access, err := client.Access(nil).Load(map[string]any{"agent_id": "example"}, nil)
    if err != nil { /* handle */ }
    // access is the entity; access.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Access

| Field | Description |
| --- | --- |
| `"admit"` | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `"id"` |  |
| `"senders"` | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |

Operations: Load, Update.

API path: `/agents/{id}/access`

#### Address

| Field | Description |
| --- | --- |
| `"channel"` |  |
| `"code"` | The code the provider's consent page sent the member back with, beside setup |
| `"country"` | The ISO country of the phone number; the first one the server sells by default |
| `"createdAt"` |  |
| `"domainId"` | The workspace's own domain the address is on |
| `"id"` |  |
| `"name"` | What people know the address by when its value is an id, like a Slack bot's @name |
| `"primary"` | Whether new messages on its channel go out from it |
| `"registering"` | Whether US carriers are still registering the phone number, which sends nothing until they have |
| `"setup"` | The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token |
| `"token"` | What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between |
| `"value"` | The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids |

Operations: Create, List, Load, Remove, Update.

API path: `/agents/{id}/addresses/{addressId}/primary`

#### AddressSetup

| Field | Description |
| --- | --- |
| `"channel"` |  |
| `"token"` | What installs an app the member made: a Slack app's client id, client secret and signing secret, in that order, with spaces between. |

Operations: Create.

API path: `/agents/{id}/addresses/setups`

#### Agent

| Field | Description |
| --- | --- |
| `"createdAt"` |  |
| `"icon"` |  |
| `"id"` |  |
| `"name"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/agents`

#### Channel

| Field | Description |
| --- | --- |
| `"kind"` | The channel's kind, which messages and events name |
| `"labels"` | Words a client builds its texts about the channel from |
| `"limits"` | The most a message on the channel carries |
| `"name"` | What people and agents call the channel, like Telegram |

Operations: List.

API path: `/agents/{id}/channels`

#### Client

| Field | Description |
| --- | --- |
| `"createdAt"` |  |
| `"id"` | The credential identifying this client |
| `"lastUsedAt"` |  |
| `"name"` | The recorded client or device name, or the name of a manually created token |

Operations: List.

API path: `/agents/{id}/clients`

#### Connection

| Field | Description |
| --- | --- |
| `"client"` |  |
| `"id"` |  |
| `"machine"` |  |
| `"tokenId"` | The agent's token the client connected with |

Operations: Load, Update.

API path: `/agents/{id}/connection`

#### Event

| Field | Description |
| --- | --- |
| `"attachments"` | The files that came with a message Artil keeps no copy of |
| `"channel"` |  |
| `"client"` | The client you send from, like Codex, which the agent sees beside your name. |
| `"createdAt"` |  |
| `"id"` |  |
| `"messageId"` | The message's id, to read it with |
| `"sender"` |  |
| `"text"` | The text of a message Artil keeps no copy of, which comes whole |
| `"thread"` | The thread of your client you send from, so the agent can answer there. |
| `"toThread"` | The thread of the agent's client to hand the message to, from a message it sent |
| `"type"` |  |

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
| `"addressId"` | The agent's address the message came to or went from; all zeros on url, where the agent's id is its address |
| `"admission"` | Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified |
| `"attachments"` |  |
| `"author"` | Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel |
| `"authorName"` | The name the author goes by, when the channel tells it |
| `"cc"` | Whom the message names as getting a copy |
| `"channel"` | The channel's kind, from listChannels |
| `"client"` | On url, the client you send from, like Codex, which the agent sees beside your name. |
| `"counterpart"` | Who sent an inbound message, or the group it came in, or the recipients of an outbound one |
| `"counterpartName"` | The name an inbound message's sender or group goes by, when the channel tells it |
| `"createdAt"` |  |
| `"direction"` |  |
| `"error"` | Why a failed message was not sent or did not arrive |
| `"forward"` |  |
| `"id"` |  |
| `"refusal"` | Why a refused message did not wake the agent |
| `"replyTo"` |  |
| `"status"` | `reported` when the recipient marked an email the agent sent as spam |
| `"subject"` |  |
| `"text"` |  |
| `"thread"` | For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered |
| `"to"` | Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy |

Operations: Create, List, Load.

API path: `/agents/{id}/messages`

#### Teammate

| Field | Description |
| --- | --- |
| `"addresses"` | Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number |
| `"email"` | The agent's primary email address, or the member's |
| `"icon"` | The agent's icon; null for members |
| `"id"` | The agent's or member's id |
| `"imageUrl"` | The member's picture from their sign-in profile, or the avatar it makes them; null for agents |
| `"kind"` |  |
| `"listening"` | Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members |
| `"name"` |  |
| `"phone"` | The agent's primary phone number, or the one a member added to their profile |
| `"role"` | The member's role in the workspace; null for agents |

Operations: List.

API path: `/team`

#### Token

| Field | Description |
| --- | --- |
| `"createdAt"` |  |
| `"id"` |  |
| `"lastUsedAt"` |  |
| `"name"` |  |

Operations: List, Remove.

API path: `/agents/{id}/tokens`

#### Webhook

| Field | Description |
| --- | --- |
| `"attempts"` | How many times the event Artil is retrying has failed |
| `"bearerToken"` | A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger. |
| `"createdAt"` |  |
| `"deliveredAt"` |  |
| `"error"` | Why the last delivery failed |
| `"erroredAt"` |  |
| `"id"` |  |
| `"retryAt"` | When Artil next retries a failed event |
| `"url"` | Where Artil posts the agent's events |

Operations: Create, List, Remove.

API path: `/agents/{id}/webhooks`



## Entities


### Access

Create an instance: `access := client.Access(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admit` | `string` | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `id` | `string` |  |
| `senders` | `[]any` | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |

#### Example: Load

```go
access, err := client.Access(nil).Load(map[string]any{"agent_id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(access.(sdk.Entity).Data()) // the loaded entity's record
```


### Address

Create an instance: `address := client.Address(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channel` | `string` |  |
| `code` | `string` | The code the provider's consent page sent the member back with, beside setup |
| `country` | `string` | The ISO country of the phone number; the first one the server sells by default |
| `createdAt` | `string` |  |
| `domainId` | `any` | The workspace's own domain the address is on |
| `id` | `string` |  |
| `name` | `any` | What people know the address by when its value is an id, like a Slack bot's @name |
| `primary` | `bool` | Whether new messages on its channel go out from it |
| `registering` | `bool` | Whether US carriers are still registering the phone number, which sends nothing until they have |
| `setup` | `string` | The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token |
| `token` | `string` | What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between |
| `value` | `string` | The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids |

#### Example: Load

```go
address, err := client.Address(nil).Load(map[string]any{"id": "address_id", "agent_id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(address.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
addresss, err := client.Address(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range addresss.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Address(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "channel": "example_channel",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AddressSetup

Create an instance: `addressSetup := client.AddressSetup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channel` | `string` |  |
| `token` | `string` | What installs an app the member made: a Slack app's client id, client secret and signing secret, in that order, with spaces between. |

#### Example: Create

```go
result, err := client.AddressSetup(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "channel": "example_channel",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Agent

Create an instance: `agent := client.Agent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `icon` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```go
agent, err := client.Agent(nil).Load(map[string]any{"id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agent.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agents, err := client.Agent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agents.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Agent(nil).Create(map[string]any{
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Channel

Create an instance: `channel := client.Channel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `kind` | `string` | The channel's kind, which messages and events name |
| `labels` | `map[string]any` | Words a client builds its texts about the channel from |
| `limits` | `map[string]any` | The most a message on the channel carries |
| `name` | `string` | What people and agents call the channel, like Telegram |

#### Example: List

```go
channels, err := client.Channel(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range channels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Client

Create an instance: `client_ := client.Client(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `id` | `string` | The credential identifying this client |
| `lastUsedAt` | `any` |  |
| `name` | `string` | The recorded client or device name, or the name of a manually created token |

#### Example: List

```go
client_s, err := client.Client(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range client_s.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Connection

Create an instance: `connection := client.Connection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `client` | `string` |  |
| `id` | `string` |  |
| `machine` | `any` |  |
| `tokenId` | `string` | The agent's token the client connected with |

#### Example: Load

```go
connection, err := client.Connection(nil).Load(map[string]any{"agent_id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(connection.(sdk.Entity).Data()) // the loaded entity's record
```


### Event

Create an instance: `event := client.Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachments` | `[]any` | The files that came with a message Artil keeps no copy of |
| `channel` | `string` |  |
| `client` | `string` | The client you send from, like Codex, which the agent sees beside your name. |
| `createdAt` | `string` |  |
| `id` | `int` |  |
| `messageId` | `string` | The message's id, to read it with |
| `sender` | `map[string]any` |  |
| `text` | `string` | The text of a message Artil keeps no copy of, which comes whole |
| `thread` | `string` | The thread of your client you send from, so the agent can answer there. |
| `toThread` | `string` | The thread of the agent's client to hand the message to, from a message it sent |
| `type` | `string` |  |

#### Example: List

```go
events, err := client.Event(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range events.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Event(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Listener

Create an instance: `listener := client.Listener(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Example: List

```go
listeners, err := client.Listener(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range listeners.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Me

Create an instance: `me := client.Me(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
me, err := client.Me(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(me.(sdk.Entity).Data()) // the loaded entity's record
```


### MeToken

Create an instance: `meToken := client.MeToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### Message

Create an instance: `message := client.Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addressId` | `string` | The agent's address the message came to or went from; all zeros on url, where the agent's id is its address |
| `admission` | `any` | Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified |
| `attachments` | `[]any` |  |
| `author` | `any` | Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel |
| `authorName` | `any` | The name the author goes by, when the channel tells it |
| `cc` | `[]any` | Whom the message names as getting a copy |
| `channel` | `string` | The channel's kind, from listChannels |
| `client` | `string` | On url, the client you send from, like Codex, which the agent sees beside your name. |
| `counterpart` | `string` | Who sent an inbound message, or the group it came in, or the recipients of an outbound one |
| `counterpartName` | `any` | The name an inbound message's sender or group goes by, when the channel tells it |
| `createdAt` | `string` |  |
| `direction` | `string` |  |
| `error` | `any` | Why a failed message was not sent or did not arrive |
| `forward` | `string` |  |
| `id` | `string` |  |
| `refusal` | `any` | Why a refused message did not wake the agent |
| `replyTo` | `string` |  |
| `status` | `string` | `reported` when the recipient marked an email the agent sent as spam |
| `subject` | `any` |  |
| `text` | `string` |  |
| `thread` | `any` | For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered |
| `to` | `[]any` | Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy |

#### Example: Load

```go
message, err := client.Message(nil).Load(map[string]any{"id": "message_id", "agent_id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(message.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
messages, err := client.Message(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range messages.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Message(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "text": "example_text",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Teammate

Create an instance: `teammate := client.Teammate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `[]any` | Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number |
| `email` | `any` | The agent's primary email address, or the member's |
| `icon` | `any` | The agent's icon; null for members |
| `id` | `string` | The agent's or member's id |
| `imageUrl` | `any` | The member's picture from their sign-in profile, or the avatar it makes them; null for agents |
| `kind` | `string` |  |
| `listening` | `any` | Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members |
| `name` | `any` |  |
| `phone` | `any` | The agent's primary phone number, or the one a member added to their profile |
| `role` | `any` | The member's role in the workspace; null for agents |

#### Example: List

```go
teammates, err := client.Teammate(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range teammates.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Token

Create an instance: `token := client.Token(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `id` | `string` |  |
| `lastUsedAt` | `any` |  |
| `name` | `string` |  |

#### Example: List

```go
tokens, err := client.Token(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range tokens.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Webhook

Create an instance: `webhook := client.Webhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempts` | `int` | How many times the event Artil is retrying has failed |
| `bearerToken` | `string` | A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger. |
| `createdAt` | `string` |  |
| `deliveredAt` | `any` |  |
| `error` | `any` | Why the last delivery failed |
| `erroredAt` | `any` |  |
| `id` | `string` |  |
| `retryAt` | `any` | When Artil next retries a failed event |
| `url` | `string` | Where Artil posts the agent's events |

#### Example: List

```go
webhooks, err := client.Webhook(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range webhooks.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Webhook(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "url": "example_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

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

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/artil-sdk/go/
├── artil.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/artil-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
agent := client.Agent(nil)
agent.List(nil, nil)

// agent.Data() now returns the agent data from the last list
// agent.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
