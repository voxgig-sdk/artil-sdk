# Artil Python SDK Reference

Complete API reference for the Artil Python SDK.


## ArtilSDK

### Constructor

```python
from artil_sdk import ArtilSDK

client = ArtilSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ArtilSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ArtilSDK.test()
```


### Instance Methods

#### `Access(data=None)`

Create a new `AccessEntity` instance. Pass `None` for no initial data.

#### `Address(data=None)`

Create a new `AddressEntity` instance. Pass `None` for no initial data.

#### `AddressSetup(data=None)`

Create a new `AddressSetupEntity` instance. Pass `None` for no initial data.

#### `Agent(data=None)`

Create a new `AgentEntity` instance. Pass `None` for no initial data.

#### `Channel(data=None)`

Create a new `ChannelEntity` instance. Pass `None` for no initial data.

#### `Client(data=None)`

Create a new `ClientEntity` instance. Pass `None` for no initial data.

#### `Connection(data=None)`

Create a new `ConnectionEntity` instance. Pass `None` for no initial data.

#### `Event(data=None)`

Create a new `EventEntity` instance. Pass `None` for no initial data.

#### `ListedTeammate(data=None)`

Create a new `ListedTeammateEntity` instance. Pass `None` for no initial data.

#### `Listener(data=None)`

Create a new `ListenerEntity` instance. Pass `None` for no initial data.

#### `Men(data=None)`

Create a new `MenEntity` instance. Pass `None` for no initial data.

#### `Message(data=None)`

Create a new `MessageEntity` instance. Pass `None` for no initial data.

#### `Token(data=None)`

Create a new `TokenEntity` instance. Pass `None` for no initial data.

#### `Webhook(data=None)`

Create a new `WebhookEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AccessEntity

```python
access = client.Access()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admit` | `str` | Yes | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `id` | `str` | No |  |
| `senders` | `list` | Yes | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |

### Operations

#### `update(reqdata, ctrl=None) -> AccessEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Access().update({
    "agent_id": "agent_id",
    "id": "id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccessEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AddressEntity

```python
address = client.Address()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channel` | `str` | Yes |  |
| `code` | `str` | No | The code the provider's consent page sent the member back with, beside setup |
| `country` | `str` | No | The ISO country of the phone number; the first one the server sells by default |
| `createdAt` | `str` | Yes |  |
| `domainId` | `Any` | Yes | The workspace's own domain the address is on |
| `id` | `str` | Yes |  |
| `name` | `str | None` | Yes | What people know the address by when its value is an id, like a Slack bot's @name |
| `primary` | `bool` | Yes | Whether new messages on its channel go out from it |
| `registering` | `bool` | No | Whether US carriers are still registering the phone number, which sends nothing until they have |
| `setup` | `str` | No | The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token |
| `token` | `str` | No | What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between |
| `value` | `str` | Yes | The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids |

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

#### `create(reqdata, ctrl=None) -> AddressEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Address().create({
    "agent_id": "example_agent_id",  # str
    "channel": "example_channel",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AddressEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Address().list({"agent_id": "example"})
for address in results:
    print(address.data_get())
```

#### `load(reqmatch, ctrl=None) -> AddressEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Address().load({"id": "address_id", "agent_id": "agent_id"})
```

#### `remove(reqmatch, ctrl=None) -> AddressEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Address().remove({"id": "address_id", "agent_id": "agent_id"})
```

#### `update(reqdata, ctrl=None) -> AddressEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Address().update({
    "id": "address_id",
    "agent_id": "agent_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AddressEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AddressSetupEntity

```python
address_setup = client.AddressSetup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channel` | `str` | Yes |  |
| `token` | `str` | No | What installs an app the member made: a Slack app's client id, client secret and signing secret, in that order, with spaces between. |

### Operations

#### `create(reqdata, ctrl=None) -> AddressSetupEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AddressSetup().create({
    "agent_id": "example_agent_id",  # str
    "channel": "example_channel",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AddressSetupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentEntity

```python
agent = client.Agent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | Yes |  |
| `icon` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `createdAt` | - | - | - | - | - |
| `icon` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl=None) -> AgentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Agent().create({
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AgentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Agent().list()
for agent in results:
    print(agent.data_get())
```

#### `load(reqmatch, ctrl=None) -> AgentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Agent().load({"id": "agent_id"})
```

#### `remove(reqmatch, ctrl=None) -> AgentEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Agent().remove({"id": "agent_id"})
```

#### `update(reqdata, ctrl=None) -> AgentEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Agent().update({
    "id": "agent_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ChannelEntity

```python
channel = client.Channel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `kind` | `str` | Yes | The channel's kind, which messages and events name |
| `labels` | `dict` | Yes | Words a client builds its texts about the channel from |
| `limits` | `dict` | Yes | The most a message on the channel carries |
| `name` | `str` | Yes | What people and agents call the channel, like Telegram |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ChannelEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Channel().list({"agent_id": "example"})
for channel in results:
    print(channel.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ChannelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ClientEntity

```python
client_ = client.Client()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | Yes |  |
| `id` | `str` | Yes | The credential identifying this client |
| `lastUsedAt` | `Any` | Yes |  |
| `name` | `str` | Yes | The recorded client or device name, or the name of a manually created token |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ClientEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Client().list({"agent_id": "example"})
for client_ in results:
    print(client_.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ClientEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConnectionEntity

```python
connection = client.Connection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `client` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `machine` | `str | None` | Yes |  |
| `tokenId` | `str` | Yes | The agent's token the client connected with |

### Field Usage by Operation

| Field | update |
| --- | --- |
| `client` | - |
| `id` | - |
| `machine` | Yes |
| `tokenId` | - |

### Operations

#### `update(reqdata, ctrl=None) -> ConnectionEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Connection().update({
    "agent_id": "agent_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConnectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventEntity

```python
event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachments` | `list` | No | The files that came with a message Artil keeps no copy of |
| `channel` | `str` | Yes |  |
| `client` | `str` | No | The client you send from, like Codex, which the agent sees beside your name. |
| `createdAt` | `str` | Yes |  |
| `id` | `int` | Yes |  |
| `messageId` | `str` | Yes | The message's id, to read it with |
| `sender` | `dict` | Yes |  |
| `text` | `str` | No | The text of a message Artil keeps no copy of, which comes whole |
| `thread` | `str` | No | The thread of your client you send from, so the agent can answer there. |
| `toThread` | `str` | No | The thread of the agent's client to hand the message to, from a message it sent |
| `type` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> EventEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Event().create({
    "agent_id": "example_agent_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[EventEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Event().list({"agent_id": "example"})
for event in results:
    print(event.data_get())
```

#### `load(reqmatch, ctrl=None) -> EventEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListedTeammateEntity

```python
listed_teammate = client.ListedTeammate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `list` | Yes | Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number |
| `email` | `str | None` | Yes | The agent's primary email address, or the member's |
| `icon` | `Any` | Yes | The agent's icon; null for members |
| `id` | `str` | Yes | The agent's or member's id |
| `imageUrl` | `str | None` | Yes | The member's picture from their sign-in profile, or the avatar it makes them; null for agents |
| `kind` | `str` | Yes |  |
| `listening` | `bool | None` | Yes | Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members |
| `name` | `str | None` | Yes |  |
| `phone` | `str | None` | Yes | The agent's primary phone number, or the one a member added to their profile |
| `role` | `Any` | Yes | The member's role in the workspace; null for agents |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ListedTeammateEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ListedTeammate().list()
for listed_teammate in results:
    print(listed_teammate.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListedTeammateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListenerEntity

```python
listener = client.Listener()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ListenerEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Listener().list({"agent_id": "example"})
for listener in results:
    print(listener.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListenerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MenEntity

```python
men = client.Men()
```

### Operations

#### `load(reqmatch, ctrl=None) -> MenEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Men().load()
```

#### `remove(reqmatch, ctrl=None) -> MenEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MessageEntity

```python
message = client.Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addressId` | `str` | Yes | The agent's address the message came to or went from; all zeros on url, where the agent's id is its address |
| `admission` | `Any` | Yes | Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified |
| `attachments` | `list` | Yes |  |
| `author` | `str | None` | Yes | Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel |
| `authorName` | `str | None` | Yes | The name the author goes by, when the channel tells it |
| `cc` | `list` | Yes | Whom the message names as getting a copy |
| `channel` | `str` | Yes | The channel's kind, from listChannels |
| `client` | `str` | No | On url, the client you send from, like Codex, which the agent sees beside your name. |
| `counterpart` | `str` | Yes | Who sent an inbound message, or the group it came in, or the recipients of an outbound one |
| `counterpartName` | `str | None` | Yes | The name an inbound message's sender or group goes by, when the channel tells it |
| `createdAt` | `str` | Yes |  |
| `direction` | `str` | Yes |  |
| `error` | `str | None` | Yes | Why a failed message was not sent or did not arrive |
| `forward` | `str` | No |  |
| `id` | `str` | Yes |  |
| `refusal` | `Any` | Yes | Why a refused message did not wake the agent |
| `replyTo` | `str` | No |  |
| `status` | `str` | Yes | `reported` when the recipient marked an email the agent sent as spam |
| `subject` | `str | None` | Yes |  |
| `text` | `str` | Yes |  |
| `thread` | `Any` | Yes | For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered |
| `to` | `list` | Yes | Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy |

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

#### `create(reqdata, ctrl=None) -> MessageEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Message().create({
    "agent_id": "example_agent_id",  # str
    "text": "example_text",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[MessageEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Message().list({"agent_id": "example"})
for message in results:
    print(message.data_get())
```

#### `load(reqmatch, ctrl=None) -> MessageEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Message().load({"id": "message_id", "agent_id": "agent_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TokenEntity

```python
token = client.Token()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `lastUsedAt` | `Any` | Yes |  |
| `name` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[TokenEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Token().list({"agent_id": "example"})
for token in results:
    print(token.data_get())
```

#### `remove(reqmatch, ctrl=None) -> TokenEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Token().remove({"id": "token_id", "agent_id": "agent_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TokenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebhookEntity

```python
webhook = client.Webhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempts` | `int` | Yes | How many times the event Artil is retrying has failed |
| `bearerToken` | `str` | No | A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger. |
| `createdAt` | `str` | Yes |  |
| `deliveredAt` | `Any` | Yes |  |
| `error` | `str | None` | Yes | Why the last delivery failed |
| `erroredAt` | `Any` | Yes |  |
| `id` | `str` | Yes |  |
| `retryAt` | `Any` | Yes | When Artil next retries a failed event |
| `url` | `str` | Yes | Where Artil posts the agent's events |

### Operations

#### `create(reqdata, ctrl=None) -> WebhookEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Webhook().create({
    "agent_id": "example_agent_id",  # str
    "url": "example_url",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[WebhookEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Webhook().list({"agent_id": "example"})
for webhook in results:
    print(webhook.data_get())
```

#### `remove(reqmatch, ctrl=None) -> WebhookEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Webhook().remove({"id": "webhook_id", "agent_id": "agent_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebhookEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = ArtilSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "secrets": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

