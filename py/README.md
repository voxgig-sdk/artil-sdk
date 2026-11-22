# Artil Python SDK



The Python SDK for the Artil API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Access()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/artil-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from artil_sdk import ArtilSDK

client = ArtilSDK({
    "apikey": os.environ.get("ARTIL_APIKEY"),
})
```

### 3. Load an access

Access is nested under agent, so provide the `agent_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    access = client.Access().load({"agent_id": "example_agent_id"})
    print(access.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Update
client.Access().update({"agent_id": "example_agent_id", "channel": "example_channel"})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    agents = client.Agent().list()
    print([item.data_get() for item in agents])
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = ArtilSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
agent = client.Agent().list()
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = ArtilSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### ArtilSDK

```python
from artil_sdk import ArtilSDK

client = ArtilSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = ArtilSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### ArtilSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Access

| Field | Description |
| --- | --- |
| `admit` | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
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

Create an instance: `access = client.Access()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admit` | `str` | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `senders` | `list` | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |

#### Example: Load

```python
access = client.Access().load({"agent_id": "agent_id"})
```


### Address

Create an instance: `address = client.Address()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channel` | `str` |  |
| `code` | `str` | The code the provider's consent page sent the member back with, beside setup |
| `country` | `str` | The ISO country of the phone number; the first one the server sells by default |
| `createdAt` | `str` |  |
| `domainId` | `Any` | The workspace's own domain the address is on |
| `id` | `str` |  |
| `name` | `str | None` | What people know the address by when its value is an id, like a Slack bot's @name |
| `primary` | `bool` | Whether new messages on its channel go out from it |
| `registering` | `bool` | Whether US carriers are still registering the phone number, which sends nothing until they have |
| `setup` | `str` | The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token |
| `token` | `str` | What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between |
| `value` | `str` | The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids |

#### Example: Load

```python
address = client.Address().load({"id": "address_id", "agent_id": "agent_id"})
```

#### Example: List

```python
addresss = client.Address().list({"agent_id": "example"})
```

#### Example: Create

```python
address = client.Address().create({
    "agent_id": "example_agent_id",  # str
    "channel": "example_channel",  # str
})
```


### AddressSetup

Create an instance: `address_setup = client.AddressSetup()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channel` | `str` |  |
| `token` | `str` | What installs an app the member made: a Slack app's client id, client secret and signing secret, in that order, with spaces between. |

#### Example: Create

```python
address_setup = client.AddressSetup().create({
    "agent_id": "example_agent_id",  # str
    "channel": "example_channel",  # str
})
```


### Agent

Create an instance: `agent = client.Agent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` |  |
| `icon` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |

#### Example: Load

```python
agent = client.Agent().load({"id": "agent_id"})
```

#### Example: List

```python
agents = client.Agent().list()
```

#### Example: Create

```python
agent = client.Agent().create({
    "name": "example_name",  # str
})
```


### Channel

Create an instance: `channel = client.Channel()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `kind` | `str` | The channel's kind, which messages and events name |
| `labels` | `dict` | Words a client builds its texts about the channel from |
| `limits` | `dict` | The most a message on the channel carries |
| `name` | `str` | What people and agents call the channel, like Telegram |

#### Example: List

```python
channels = client.Channel().list({"agent_id": "example"})
```


### Client

Create an instance: `client_ = client.Client()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` |  |
| `id` | `str` | The credential identifying this client |
| `lastUsedAt` | `Any` |  |
| `name` | `str` | The recorded client or device name, or the name of a manually created token |

#### Example: List

```python
client_s = client.Client().list({"agent_id": "example"})
```


### Connection

Create an instance: `connection = client.Connection()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `client` | `str` |  |
| `id` | `str` |  |
| `machine` | `str | None` |  |
| `tokenId` | `str` | The agent's token the client connected with |

#### Example: Load

```python
connection = client.Connection().load({"agent_id": "agent_id"})
```


### Event

Create an instance: `event = client.Event()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachments` | `list` | The files that came with a message Artil keeps no copy of |
| `channel` | `str` |  |
| `client` | `str` | The client you send from, like Codex, which the agent sees beside your name. |
| `createdAt` | `str` |  |
| `id` | `int` |  |
| `messageId` | `str` | The message's id, to read it with |
| `sender` | `dict` |  |
| `text` | `str` | The text of a message Artil keeps no copy of, which comes whole |
| `thread` | `str` | The thread of your client you send from, so the agent can answer there. |
| `toThread` | `str` | The thread of the agent's client to hand the message to, from a message it sent |
| `type` | `str` |  |

#### Example: List

```python
events = client.Event().list({"agent_id": "example"})
```

#### Example: Create

```python
event = client.Event().create({
    "agent_id": "example_agent_id",  # str
})
```


### Listener

Create an instance: `listener = client.Listener()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Example: List

```python
listeners = client.Listener().list({"agent_id": "example"})
```


### Me

Create an instance: `me = client.Me()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
me = client.Me().load()
```


### MeToken

Create an instance: `me_token = client.MeToken()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### Message

Create an instance: `message = client.Message()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addressId` | `str` | The agent's address the message came to or went from; all zeros on url, where the agent's id is its address |
| `admission` | `Any` | Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified |
| `attachments` | `list` |  |
| `author` | `str | None` | Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel |
| `authorName` | `str | None` | The name the author goes by, when the channel tells it |
| `cc` | `list` | Whom the message names as getting a copy |
| `channel` | `str` | The channel's kind, from listChannels |
| `client` | `str` | On url, the client you send from, like Codex, which the agent sees beside your name. |
| `counterpart` | `str` | Who sent an inbound message, or the group it came in, or the recipients of an outbound one |
| `counterpartName` | `str | None` | The name an inbound message's sender or group goes by, when the channel tells it |
| `createdAt` | `str` |  |
| `direction` | `str` |  |
| `error` | `str | None` | Why a failed message was not sent or did not arrive |
| `forward` | `str` |  |
| `id` | `str` |  |
| `refusal` | `Any` | Why a refused message did not wake the agent |
| `replyTo` | `str` |  |
| `status` | `str` | `reported` when the recipient marked an email the agent sent as spam |
| `subject` | `str | None` |  |
| `text` | `str` |  |
| `thread` | `Any` | For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered |
| `to` | `list` | Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy |

#### Example: Load

```python
message = client.Message().load({"id": "message_id", "agent_id": "agent_id"})
```

#### Example: List

```python
messages = client.Message().list({"agent_id": "example"})
```

#### Example: Create

```python
message = client.Message().create({
    "agent_id": "example_agent_id",  # str
    "text": "example_text",  # str
})
```


### Teammate

Create an instance: `teammate = client.Teammate()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `list` | Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number |
| `email` | `str | None` | The agent's primary email address, or the member's |
| `icon` | `Any` | The agent's icon; null for members |
| `id` | `str` | The agent's or member's id |
| `imageUrl` | `str | None` | The member's picture from their sign-in profile, or the avatar it makes them; null for agents |
| `kind` | `str` |  |
| `listening` | `bool | None` | Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members |
| `name` | `str | None` |  |
| `phone` | `str | None` | The agent's primary phone number, or the one a member added to their profile |
| `role` | `Any` | The member's role in the workspace; null for agents |

#### Example: List

```python
teammates = client.Teammate().list()
```


### Token

Create an instance: `token = client.Token()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` |  |
| `id` | `str` |  |
| `lastUsedAt` | `Any` |  |
| `name` | `str` |  |

#### Example: List

```python
tokens = client.Token().list({"agent_id": "example"})
```


### Webhook

Create an instance: `webhook = client.Webhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempts` | `int` | How many times the event Artil is retrying has failed |
| `bearerToken` | `str` | A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger. |
| `createdAt` | `str` |  |
| `deliveredAt` | `Any` |  |
| `error` | `str | None` | Why the last delivery failed |
| `erroredAt` | `Any` |  |
| `id` | `str` |  |
| `retryAt` | `Any` | When Artil next retries a failed event |
| `url` | `str` | Where Artil posts the agent's events |

#### Example: List

```python
webhooks = client.Webhook().list({"agent_id": "example"})
```

#### Example: Create

```python
webhook = client.Webhook().create({
    "agent_id": "example_agent_id",  # str
    "url": "example_url",  # str
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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── artil_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`artil_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
agent = client.Agent()
agent.list()

# agent.data_get() now returns the agent data from the last list
# agent.match_get() returns the last match criteria
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
