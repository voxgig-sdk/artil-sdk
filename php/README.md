# Artil PHP SDK



The PHP SDK for the Artil API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Access()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/artil-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/artil-sdk
composer config repositories.artil-sdk path ./artil-sdk/php
composer require voxgig-sdk/artil-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'artil_sdk.php';

$client = new ArtilSDK([
    "apikey" => getenv("ARTIL_APIKEY"),
]);
```

### 3. Load an address

Address is nested under agent, so provide the `agent_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Address record (throws on error).
    $address = $client->Address()->load(["agent_id" => "example_agent_id", "id" => "example_id"]);
    print_r($address->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// Update
$client->Access()->update(["agent_id" => "example_agent_id", "admit" => "example_admit"]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $agents = $client->Agent()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = ArtilSDK::test([
    "entity" => ["agent" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$agent = $client->Agent()->list();
print_r(array_map(fn($item) => $item->data_get(), $agent));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new ArtilSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
ARTIL_TEST_LIVE=TRUE
ARTIL_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### ArtilSDK

```php
require_once 'artil_sdk.php';
$client = new ArtilSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = ArtilSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### ArtilSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Access` | `($data): AccessEntity` | Create an Access entity instance. |
| `Address` | `($data): AddressEntity` | Create an Address entity instance. |
| `AddressSetup` | `($data): AddressSetupEntity` | Create an AddressSetup entity instance. |
| `Agent` | `($data): AgentEntity` | Create an Agent entity instance. |
| `Channel` | `($data): ChannelEntity` | Create a Channel entity instance. |
| `Client` | `($data): ClientEntity` | Create a Client entity instance. |
| `Connection` | `($data): ConnectionEntity` | Create a Connection entity instance. |
| `Event` | `($data): EventEntity` | Create an Event entity instance. |
| `ListedTeammate` | `($data): ListedTeammateEntity` | Create a ListedTeammate entity instance. |
| `Listener` | `($data): ListenerEntity` | Create a Listener entity instance. |
| `Men` | `($data): MenEntity` | Create a Men entity instance. |
| `Message` | `($data): MessageEntity` | Create a Message entity instance. |
| `Token` | `($data): TokenEntity` | Create a Token entity instance. |
| `Webhook` | `($data): WebhookEntity` | Create a Webhook entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `create` | `($reqdata, $ctrl): mixed` | Create a new entity, and return it. |
| `update` | `($reqdata, $ctrl): mixed` | Update an existing entity, and return it. |
| `remove` | `($reqmatch, $ctrl): mixed` | Remove an entity, and return it marked as deleted. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$access = $client->Access();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admit` | `string` | Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its… |
| `id` | `string` |  |
| `senders` | `array` | Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members |


### Address

Create an instance: `$address = $client->Address();`

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
| `domainId` | `mixed` | The workspace's own domain the address is on |
| `id` | `string` |  |
| `name` | `mixed` | What people know the address by when its value is an id, like a Slack bot's @name |
| `primary` | `bool` | Whether new messages on its channel go out from it |
| `registering` | `bool` | Whether US carriers are still registering the phone number, which sends nothing until they have |
| `setup` | `string` | The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token |
| `token` | `string` | What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between |
| `value` | `string` | The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Address record (throws on error).
$address = $client->Address()->load(["id" => "address_id", "agent_id" => "agent_id"]);
```

#### Example: List

```php
// list() returns an array of Address entities, one per record (throws on error).
$addresss = $client->Address()->list(["agent_id" => "example"]);
```

#### Example: Create

```php
$address = $client->Address()->create([
    "agent_id" => null, // string
    "channel" => null, // string
]);
```


### AddressSetup

Create an instance: `$address_setup = $client->AddressSetup();`

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

```php
$address_setup = $client->AddressSetup()->create([
    "agent_id" => null, // string
    "channel" => null, // string
]);
```


### Agent

Create an instance: `$agent = $client->Agent();`

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

```php
// load() returns the ENTITY — call data_get() for the Agent record (throws on error).
$agent = $client->Agent()->load(["id" => "agent_id"]);
```

#### Example: List

```php
// list() returns an array of Agent entities, one per record (throws on error).
$agents = $client->Agent()->list();
```

#### Example: Create

```php
$agent = $client->Agent()->create([
    "name" => null, // string
]);
```


### Channel

Create an instance: `$channel = $client->Channel();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `kind` | `string` | The channel's kind, which messages and events name |
| `labels` | `array` | Words a client builds its texts about the channel from |
| `limits` | `array` | The most a message on the channel carries |
| `name` | `string` | What people and agents call the channel, like Telegram |

#### Example: List

```php
// list() returns an array of Channel entities, one per record (throws on error).
$channels = $client->Channel()->list(["agent_id" => "example"]);
```


### Client

Create an instance: `$client = $client->Client();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `id` | `string` | The credential identifying this client |
| `lastUsedAt` | `mixed` |  |
| `name` | `string` | The recorded client or device name, or the name of a manually created token |

#### Example: List

```php
// list() returns an array of Client entities, one per record (throws on error).
$clients = $client->Client()->list(["agent_id" => "example"]);
```


### Connection

Create an instance: `$connection = $client->Connection();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `client` | `string` |  |
| `id` | `string` |  |
| `machine` | `mixed` |  |
| `tokenId` | `string` | The agent's token the client connected with |


### Event

Create an instance: `$event = $client->Event();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachments` | `array` | The files that came with a message Artil keeps no copy of |
| `channel` | `string` |  |
| `client` | `string` | The client you send from, like Codex, which the agent sees beside your name. |
| `createdAt` | `string` |  |
| `id` | `int` |  |
| `messageId` | `string` | The message's id, to read it with |
| `sender` | `array` |  |
| `text` | `string` | The text of a message Artil keeps no copy of, which comes whole |
| `thread` | `string` | The thread of your client you send from, so the agent can answer there. |
| `toThread` | `string` | The thread of the agent's client to hand the message to, from a message it sent |
| `type` | `string` |  |

#### Example: List

```php
// list() returns an array of Event entities, one per record (throws on error).
$events = $client->Event()->list(["agent_id" => "example"]);
```

#### Example: Create

```php
$event = $client->Event()->create([
    "agent_id" => null, // string
]);
```


### ListedTeammate

Create an instance: `$listed_teammate = $client->ListedTeammate();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `array` | Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number |
| `email` | `mixed` | The agent's primary email address, or the member's |
| `icon` | `mixed` | The agent's icon; null for members |
| `id` | `string` | The agent's or member's id |
| `imageUrl` | `mixed` | The member's picture from their sign-in profile, or the avatar it makes them; null for agents |
| `kind` | `string` |  |
| `listening` | `mixed` | Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members |
| `name` | `mixed` |  |
| `phone` | `mixed` | The agent's primary phone number, or the one a member added to their profile |
| `role` | `mixed` | The member's role in the workspace; null for agents |

#### Example: List

```php
// list() returns an array of ListedTeammate entities, one per record (throws on error).
$listed_teammates = $client->ListedTeammate()->list();
```


### Listener

Create an instance: `$listener = $client->Listener();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of Listener entities, one per record (throws on error).
$listeners = $client->Listener()->list(["agent_id" => "example"]);
```


### Men

Create an instance: `$men = $client->Men();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Men record (throws on error).
$men = $client->Men()->load();
```


### Message

Create an instance: `$message = $client->Message();`

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
| `admission` | `mixed` | Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified |
| `attachments` | `array` |  |
| `author` | `mixed` | Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel |
| `authorName` | `mixed` | The name the author goes by, when the channel tells it |
| `cc` | `array` | Whom the message names as getting a copy |
| `channel` | `string` | The channel's kind, from listChannels |
| `client` | `string` | On url, the client you send from, like Codex, which the agent sees beside your name. |
| `counterpart` | `string` | Who sent an inbound message, or the group it came in, or the recipients of an outbound one |
| `counterpartName` | `mixed` | The name an inbound message's sender or group goes by, when the channel tells it |
| `createdAt` | `string` |  |
| `direction` | `string` |  |
| `error` | `mixed` | Why a failed message was not sent or did not arrive |
| `forward` | `string` |  |
| `id` | `string` |  |
| `refusal` | `mixed` | Why a refused message did not wake the agent |
| `replyTo` | `string` |  |
| `status` | `string` | `reported` when the recipient marked an email the agent sent as spam |
| `subject` | `mixed` |  |
| `text` | `string` |  |
| `thread` | `mixed` | For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered |
| `to` | `array` | Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Message record (throws on error).
$message = $client->Message()->load(["id" => "message_id", "agent_id" => "agent_id"]);
```

#### Example: List

```php
// list() returns an array of Message entities, one per record (throws on error).
$messages = $client->Message()->list(["agent_id" => "example"]);
```

#### Example: Create

```php
$message = $client->Message()->create([
    "agent_id" => null, // string
    "text" => null, // string
]);
```


### Token

Create an instance: `$token = $client->Token();`

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
| `lastUsedAt` | `mixed` |  |
| `name` | `string` |  |

#### Example: List

```php
// list() returns an array of Token entities, one per record (throws on error).
$tokens = $client->Token()->list(["agent_id" => "example"]);
```


### Webhook

Create an instance: `$webhook = $client->Webhook();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempts` | `int` | How many times the event Artil is retrying has failed |
| `bearerToken` | `string` | A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger. |
| `createdAt` | `string` |  |
| `deliveredAt` | `mixed` |  |
| `error` | `mixed` | Why the last delivery failed |
| `erroredAt` | `mixed` |  |
| `id` | `string` |  |
| `retryAt` | `mixed` | When Artil next retries a failed event |
| `url` | `string` | Where Artil posts the agent's events |

#### Example: List

```php
// list() returns an array of Webhook entities, one per record (throws on error).
$webhooks = $client->Webhook()->list(["agent_id" => "example"]);
```

#### Example: Create

```php
$webhook = $client->Webhook()->create([
    "agent_id" => null, // string
    "url" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
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

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── artil_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`artil_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$agent = $client->Agent();
$agent->list();

// $agent->data_get() now returns the agent data from the last list
// $agent->match_get() returns the last match criteria
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
