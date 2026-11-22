# Artil API

> Give AI agents their own email inbox, SMS number, Telegram bot and Slack app.
>
> Artil adds to the API without notice: new endpoints, fields, values and error codes, which clients skip when they do not know them. Fields this reference lists stay. An endpoint is marked deprecated here before it is removed, and while deprecated it answers with a Deprecation header, plus a Sunset header once its removal date is set.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 14 entities and 33 HTTP routes. There are 7 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Access

Results: The channel&#39;s access.

SDK operations: `update`.

Key fields to recognise:

- `admit`: Whether anyone, the workspace&#39;s members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its Message URL is never open to anyone
- `senders`: Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members

### Address

Results: The address is primary; The new address; The new phone number, which US carriers are still registering. Read it at Location until registering is false; it sends nothing until then.; The addresses; The address; The address is gone; The changed address.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `code`: The code the provider&#39;s consent page sent the member back with, beside setup
- `country`: The ISO country of the phone number; the first one the server sells by default
- `domainId`: The workspace&#39;s own domain the address is on
- `name`: What people know the address by when its value is an id, like a Slack bot&#39;s @name
- `primary`: Whether new messages on its channel go out from it

### AddressSetup

Results: The link.

SDK operations: `create`.

Key fields to recognise:

- `token`: What installs an app the member made: a Slack app&#39;s client id, client secret and signing secret, in that order, with spaces between.

### Agent

Results: The new agent; The agents; The agent; Each channel&#39;s access; The connection; The agent is gone; The changed agent.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### Channel

Results: The channels.

SDK operations: `list`.

Key fields to recognise:

- `kind`: The channel&#39;s kind, which messages and events name
- `labels`: Words a client builds its texts about the channel from
- `limits`: The most a message on the channel carries
- `name`: What people and agents call the channel, like Telegram

### Client

Results: The clients.

SDK operations: `list`.

Key fields to recognise:

- `id`: The credential identifying this client
- `name`: The recorded client or device name, or the name of a manually created token

### Connection

Results: The agent&#39;s new connection.

SDK operations: `update`.

Key fields to recognise:

- `tokenId`: The agent&#39;s token the client connected with

### Event

Results: The message.received event; The events; The event stream.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `attachments`: The files that came with a message Artil keeps no copy of
- `client`: The client the sender wrote a relayed message in, like Codex or ChatGPT
- `id`: The agent&#39;s or member&#39;s id
- `messageId`: The message&#39;s id, to read it with
- `text`: The text of a message Artil keeps no copy of, which comes whole

### ListedTeammate

Results: The team.

SDK operations: `list`.

Key fields to recognise:

- `addresses`: Where to reach them: the agent&#39;s primary address on each channel it has one on, or the member&#39;s email address and phone number
- `email`: The agent&#39;s primary email address, or the member&#39;s
- `icon`: The agent&#39;s icon; null for members
- `id`: The agent&#39;s or member&#39;s id
- `imageUrl`: The member&#39;s picture from their sign-in profile, or the avatar it makes them; null for agents

### Listener

Results: Who listens.

SDK operations: `list`.

### Men

Results: The signed-in member or agent; The token no longer works.

SDK operations: `load`, `remove`.

### Message

Results: The sent message; The messages; The message.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `addressId`: The agent&#39;s address the message came to or went from; all zeros on url, where the agent&#39;s id is its address
- `admission`: Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel&#39;s list, and `anyone` for everyone else, including senders who could not be verified
- `author`: Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel
- `authorName`: The name the author goes by, when the channel tells it
- `cc`: Whom the message names as getting a copy

### Token

Results: The tokens; The token no longer works.

SDK operations: `list`, `remove`.

### Webhook

Results: The webhook and its secret; The webhooks; Events are no longer posted there.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `attempts`: How many times the event Artil is retrying has failed
- `bearerToken`: A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task&#39;s API trigger.
- `error`: Why the last delivery failed
- `retryAt`: When Artil next retries a failed event
- `url`: Where Artil posts the agent&#39;s events

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Access | `update` | `PUT /agents/{id}/access/{channel}` | Required |
| Address | `create` | `POST /agents/{id}/addresses/{addressId}/primary` | Required |
| Address | `create` | `POST /agents/{id}/addresses` | Required |
| Address | `list` | `GET /agents/{id}/addresses` | Required |
| Address | `load` | `GET /agents/{id}/addresses/{addressId}` | Required |
| Address | `remove` | `DELETE /agents/{id}/addresses/{addressId}` | Required |
| Address | `update` | `PATCH /agents/{id}/addresses/{addressId}` | Required |
| AddressSetup | `create` | `POST /agents/{id}/addresses/setups` | Required |
| Agent | `create` | `POST /agents` | Required |
| Agent | `list` | `GET /agents` | Required |
| Agent | `load` | `GET /agents/{id}` | Required |
| Agent | `load` | `GET /agents/{id}/access` | Required |
| Agent | `load` | `GET /agents/{id}/connection` | Required |
| Agent | `remove` | `DELETE /agents/{id}` | Required |
| Agent | `update` | `PATCH /agents/{id}` | Required |
| Channel | `list` | `GET /agents/{id}/channels` | Required |
| Client | `list` | `GET /agents/{id}/clients` | Required |
| Connection | `update` | `PUT /agents/{id}/connection` | Required |
| Event | `create` | `POST /agents/{id}/url` | Required |
| Event | `list` | `GET /agents/{id}/events` | Required |
| Event | `load` | `GET /agents/{id}/events/stream` | Required |
| ListedTeammate | `list` | `GET /team` | Required |
| Listener | `list` | `GET /agents/{id}/listeners` | Required |
| Men | `load` | `GET /me` | Required |
| Men | `remove` | `DELETE /me/token` | Required |
| Message | `create` | `POST /agents/{id}/messages` | Required |
| Message | `list` | `GET /agents/{id}/messages` | Required |
| Message | `load` | `GET /agents/{id}/messages/{messageId}` | Required |
| Token | `list` | `GET /agents/{id}/tokens` | Required |
| Token | `remove` | `DELETE /agents/{id}/tokens/{tokenId}` | Required |
| Webhook | `create` | `POST /agents/{id}/webhooks` | Required |
| Webhook | `list` | `GET /agents/{id}/webhooks` | Required |
| Webhook | `remove` | `DELETE /agents/{id}/webhooks/{webhookId}` | Required |

## Connect to the API

- API server: `https://app.artil.ai/api`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Postman collections | `postman/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `artil_list`: List records for an entity. Supported entities: `address`, `agent`, `channel`, `client`, `event`, `listed_teammate`, `listener`, `message`, `token`, `webhook`.
- `artil_load`: Load one record for an entity. Supported entities: `address`, `agent`, `event`, `men`, `message`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `debug`: Request/response capture ring buffer for debugging
- `idempotency`: Idempotency keys for safe retries of mutating operations
- `metrics`: Statistics capture: per-operation counters and latency
- `paging`: Pagination signals for list operations
- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `secrets`: Secret access: resolve the API credential through a provider chain, and exchange a refresh token for short-lived access tokens
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

