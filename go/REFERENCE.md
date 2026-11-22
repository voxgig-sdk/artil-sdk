# Artil Golang SDK Reference

Complete API reference for the Artil Golang SDK.


## ArtilSDK

### Constructor

```go
func NewArtilSDK(options map[string]any) *ArtilSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *ArtilSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *ArtilSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Access(data map[string]any) ArtilEntityBase`

Create a new `Access` entity instance. Pass `nil` for no initial data.

#### `Address(data map[string]any) ArtilEntityBase`

Create a new `Address` entity instance. Pass `nil` for no initial data.

#### `AddressSetup(data map[string]any) ArtilEntityBase`

Create a new `AddressSetup` entity instance. Pass `nil` for no initial data.

#### `Agent(data map[string]any) ArtilEntityBase`

Create a new `Agent` entity instance. Pass `nil` for no initial data.

#### `Channel(data map[string]any) ArtilEntityBase`

Create a new `Channel` entity instance. Pass `nil` for no initial data.

#### `Client(data map[string]any) ArtilEntityBase`

Create a new `Client` entity instance. Pass `nil` for no initial data.

#### `Connection(data map[string]any) ArtilEntityBase`

Create a new `Connection` entity instance. Pass `nil` for no initial data.

#### `Event(data map[string]any) ArtilEntityBase`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `Listener(data map[string]any) ArtilEntityBase`

Create a new `Listener` entity instance. Pass `nil` for no initial data.

#### `Me(data map[string]any) ArtilEntityBase`

Create a new `Me` entity instance. Pass `nil` for no initial data.

#### `MeToken(data map[string]any) ArtilEntityBase`

Create a new `MeToken` entity instance. Pass `nil` for no initial data.

#### `Message(data map[string]any) ArtilEntityBase`

Create a new `Message` entity instance. Pass `nil` for no initial data.

#### `Teammate(data map[string]any) ArtilEntityBase`

Create a new `Teammate` entity instance. Pass `nil` for no initial data.

#### `Token(data map[string]any) ArtilEntityBase`

Create a new `Token` entity instance. Pass `nil` for no initial data.

#### `Webhook(data map[string]any) ArtilEntityBase`

Create a new `Webhook` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AccessEntity

```go
access := client.Access(nil)
fmt.Println(access.GetName()) // "access"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admit` | `string` | Yes | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `id` | `string` | No |  |
| `senders` | `[]any` | Yes | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Access(nil).Load(map[string]any{"agent_id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Access(nil).Update(map[string]any{
    "agent_id": "agent_id",
    "id": "id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AccessEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AddressEntity

```go
address := client.Address(nil)
fmt.Println(address.GetName()) // "address"
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
| `name` | `any` | Yes | What people know the address by when its value is an id, like a Slack bot's @name |
| `primary` | `bool` | Yes | Whether new messages on its channel go out from it |
| `registering` | `bool` | No | Whether US carriers are still registering the phone number, which sends nothing until they have |
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

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Address(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Address(nil).Load(map[string]any{"id": "address_id", "agent_id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Address(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "channel": "example_channel",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Address(nil).Update(map[string]any{
    "id": "address_id",
    "agent_id": "agent_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Address(nil).Remove(map[string]any{"id": "address_id", "agent_id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AddressEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AddressSetupEntity

```go
addressSetup := client.AddressSetup(nil)
fmt.Println(addressSetup.GetName()) // "address_setup"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channel` | `string` | Yes |  |
| `token` | `string` | No | What installs an app the member made: a Slack app's client id, client secret and signing secret, in that order, with spaces between. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AddressSetup(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "channel": "example_channel",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AddressSetupEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentEntity

```go
agent := client.Agent(nil)
fmt.Println(agent.GetName()) // "agent"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Agent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Agent(nil).Load(map[string]any{"id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Agent(nil).Create(map[string]any{
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Agent(nil).Update(map[string]any{
    "id": "agent_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Agent(nil).Remove(map[string]any{"id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ChannelEntity

```go
channel := client.Channel(nil)
fmt.Println(channel.GetName()) // "channel"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `kind` | `string` | Yes | The channel's kind, which messages and events name |
| `labels` | `map[string]any` | Yes | Words a client builds its texts about the channel from |
| `limits` | `map[string]any` | Yes | The most a message on the channel carries |
| `name` | `string` | Yes | What people and agents call the channel, like Telegram |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Channel(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ChannelEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ClientEntity

```go
client_ := client.Client(nil)
fmt.Println(client_.GetName()) // "client"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes |  |
| `id` | `string` | Yes | The credential identifying this client |
| `lastUsedAt` | `any` | Yes |  |
| `name` | `string` | Yes | The recorded client or device name, or the name of a manually created token |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Client(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ClientEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ConnectionEntity

```go
connection := client.Connection(nil)
fmt.Println(connection.GetName()) // "connection"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `client` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `machine` | `any` | Yes |  |
| `tokenId` | `string` | Yes | The agent's token the client connected with |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `client` | - | - |
| `id` | - | - |
| `machine` | - | Yes |
| `tokenId` | - | - |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Connection(nil).Load(map[string]any{"agent_id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Connection(nil).Update(map[string]any{
    "agent_id": "agent_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConnectionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EventEntity

```go
event := client.Event(nil)
fmt.Println(event.GetName()) // "event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachments` | `[]any` | No | The files that came with a message Artil keeps no copy of |
| `channel` | `string` | Yes |  |
| `client` | `string` | No | The client you send from, like Codex, which the agent sees beside your name. |
| `createdAt` | `string` | Yes |  |
| `id` | `int` | Yes |  |
| `messageId` | `string` | Yes | The message's id, to read it with |
| `sender` | `map[string]any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Event(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Event(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ListenerEntity

```go
listener := client.Listener(nil)
fmt.Println(listener.GetName()) // "listener"
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Listener(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ListenerEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MeEntity

```go
me := client.Me(nil)
fmt.Println(me.GetName()) // "me"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Me(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MeEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MeTokenEntity

```go
meToken := client.MeToken(nil)
fmt.Println(meToken.GetName()) // "me_token"
```

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.MeToken(nil).Remove(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MeTokenEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MessageEntity

```go
message := client.Message(nil)
fmt.Println(message.GetName()) // "message"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addressId` | `string` | Yes | The agent's address the message came to or went from; all zeros on url, where the agent's id is its address |
| `admission` | `any` | Yes | Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified |
| `attachments` | `[]any` | Yes |  |
| `author` | `any` | Yes | Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel |
| `authorName` | `any` | Yes | The name the author goes by, when the channel tells it |
| `cc` | `[]any` | Yes | Whom the message names as getting a copy |
| `channel` | `string` | Yes | The channel's kind, from listChannels |
| `client` | `string` | No | On url, the client you send from, like Codex, which the agent sees beside your name. |
| `counterpart` | `string` | Yes | Who sent an inbound message, or the group it came in, or the recipients of an outbound one |
| `counterpartName` | `any` | Yes | The name an inbound message's sender or group goes by, when the channel tells it |
| `createdAt` | `string` | Yes |  |
| `direction` | `string` | Yes |  |
| `error` | `any` | Yes | Why a failed message was not sent or did not arrive |
| `forward` | `string` | No |  |
| `id` | `string` | Yes |  |
| `refusal` | `any` | Yes | Why a refused message did not wake the agent |
| `replyTo` | `string` | No |  |
| `status` | `string` | Yes | `reported` when the recipient marked an email the agent sent as spam |
| `subject` | `any` | Yes |  |
| `text` | `string` | Yes |  |
| `thread` | `any` | Yes | For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered |
| `to` | `[]any` | Yes | Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Message(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Message(nil).Load(map[string]any{"id": "message_id", "agent_id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Message(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "text": "example_text",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MessageEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TeammateEntity

```go
teammate := client.Teammate(nil)
fmt.Println(teammate.GetName()) // "teammate"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `[]any` | Yes | Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number |
| `email` | `any` | Yes | The agent's primary email address, or the member's |
| `icon` | `any` | Yes | The agent's icon; null for members |
| `id` | `string` | Yes | The agent's or member's id |
| `imageUrl` | `any` | Yes | The member's picture from their sign-in profile, or the avatar it makes them; null for agents |
| `kind` | `string` | Yes |  |
| `listening` | `any` | Yes | Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members |
| `name` | `any` | Yes |  |
| `phone` | `any` | Yes | The agent's primary phone number, or the one a member added to their profile |
| `role` | `any` | Yes | The member's role in the workspace; null for agents |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Teammate(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TeammateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TokenEntity

```go
token := client.Token(nil)
fmt.Println(token.GetName()) // "token"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `lastUsedAt` | `any` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Token(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Token(nil).Remove(map[string]any{"id": "token_id", "agent_id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TokenEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## WebhookEntity

```go
webhook := client.Webhook(nil)
fmt.Println(webhook.GetName()) // "webhook"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempts` | `int` | Yes | How many times the event Artil is retrying has failed |
| `bearerToken` | `string` | No | A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger. |
| `createdAt` | `string` | Yes |  |
| `deliveredAt` | `any` | Yes |  |
| `error` | `any` | Yes | Why the last delivery failed |
| `erroredAt` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `retryAt` | `any` | Yes | When Artil next retries a failed event |
| `url` | `string` | Yes | Where Artil posts the agent's events |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Webhook(nil).List(map[string]any{"agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Webhook(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "url": "example_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Webhook(nil).Remove(map[string]any{"id": "webhook_id", "agent_id": "agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WebhookEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

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

```go
client := sdk.NewArtilSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "secrets": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

