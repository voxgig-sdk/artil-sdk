<?php
declare(strict_types=1);

// Typed models for the Artil SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Access entity data model. */
class Access
{
    public string $admit;
    public ?string $id = null;
    public array $senders;
}

/** Request payload for Access#load. */
class AccessLoadMatch
{
    public string $agent_id;
}

/** Request payload for Access#update. */
class AccessUpdateData
{
    public string $agent_id;
    public string $id;
    public ?string $admit = null;
    public ?array $senders = null;
}

/** Address entity data model. */
class Address
{
    public string $channel;
    public ?string $code = null;
    public ?string $country = null;
    public string $createdAt;
    public mixed $domainId;
    public string $id;
    public mixed $name;
    public bool $primary;
    public ?bool $registering = null;
    public ?string $setup = null;
    public ?string $token = null;
    public string $value;
}

/** Request payload for Address#load. */
class AddressLoadMatch
{
    public string $agent_id;
    public string $id;
}

/** Request payload for Address#list. */
class AddressListMatch
{
    public string $agent_id;
}

/** Request payload for Address#create. */
class AddressCreateData
{
    public string $agent_id;
    public string $channel;
    public ?string $code = null;
    public ?string $country = null;
    public ?string $setup = null;
    public ?string $token = null;
    public ?string $value = null;
}

/** Request payload for Address#update. */
class AddressUpdateData
{
    public string $agent_id;
    public string $id;
    public ?string $value = null;
}

/** Request payload for Address#remove. */
class AddressRemoveMatch
{
    public string $agent_id;
    public string $id;
}

/** AddressSetup entity data model. */
class AddressSetup
{
    public string $channel;
    public ?string $token = null;
}

/** Request payload for AddressSetup#create. */
class AddressSetupCreateData
{
    public string $agent_id;
    public string $channel;
    public ?string $token = null;
}

/** Agent entity data model. */
class Agent
{
    public string $createdAt;
    public string $icon;
    public string $id;
    public string $name;
}

/** Request payload for Agent#load. */
class AgentLoadMatch
{
    public string $id;
}

/** Request payload for Agent#list. */
class AgentListMatch
{
    public ?string $createdAt = null;
    public ?string $icon = null;
    public ?string $id = null;
    public ?string $name = null;
}

/** Request payload for Agent#create. */
class AgentCreateData
{
    public ?string $icon = null;
    public string $name;
}

/** Request payload for Agent#update. */
class AgentUpdateData
{
    public string $id;
    public ?string $icon = null;
    public ?string $name = null;
}

/** Request payload for Agent#remove. */
class AgentRemoveMatch
{
    public string $id;
}

/** Channel entity data model. */
class Channel
{
    public string $kind;
    public array $labels;
    public array $limits;
    public string $name;
}

/** Request payload for Channel#list. */
class ChannelListMatch
{
    public string $agent_id;
}

/** Client entity data model. */
class Client
{
    public string $createdAt;
    public string $id;
    public mixed $lastUsedAt;
    public string $name;
}

/** Request payload for Client#list. */
class ClientListMatch
{
    public string $agent_id;
}

/** Connection entity data model. */
class Connection
{
    public string $client;
    public string $id;
    public mixed $machine;
    public string $tokenId;
}

/** Request payload for Connection#load. */
class ConnectionLoadMatch
{
    public string $agent_id;
}

/** Request payload for Connection#update. */
class ConnectionUpdateData
{
    public string $agent_id;
    public ?string $client = null;
    public mixed $machine = null;
}

/** Event entity data model. */
class Event
{
    public ?array $attachments = null;
    public string $channel;
    public ?string $client = null;
    public string $createdAt;
    public int $id;
    public string $messageId;
    public array $sender;
    public ?string $text = null;
    public ?string $thread = null;
    public ?string $toThread = null;
    public string $type;
}

/** Request payload for Event#list. */
class EventListMatch
{
    public string $agent_id;
    public ?int $after = null;
}

/** Request payload for Event#create. */
class EventCreateData
{
    public string $agent_id;
    public ?array $attachments = null;
    public ?string $client = null;
    public ?string $text = null;
    public ?string $thread = null;
    public ?string $toThread = null;
}

/** Listener entity data model. */
class Listener
{
}

/** Request payload for Listener#list. */
class ListenerListMatch
{
    public string $agent_id;
}

/** Me entity data model. */
class Me
{
}

/** Request payload for Me#load. */
class MeLoadMatch
{
}

/** MeToken entity data model. */
class MeToken
{
}

/** Request payload for MeToken#remove. */
class MeTokenRemoveMatch
{
}

/** Message entity data model. */
class Message
{
    public string $addressId;
    public mixed $admission;
    public array $attachments;
    public mixed $author;
    public mixed $authorName;
    public array $cc;
    public string $channel;
    public ?string $client = null;
    public string $counterpart;
    public mixed $counterpartName;
    public string $createdAt;
    public string $direction;
    public mixed $error;
    public ?string $forward = null;
    public string $id;
    public mixed $refusal;
    public ?string $replyTo = null;
    public string $status;
    public mixed $subject;
    public string $text;
    public mixed $thread;
    public array $to;
}

/** Request payload for Message#load. */
class MessageLoadMatch
{
    public string $agent_id;
    public string $id;
}

/** Request payload for Message#list. */
class MessageListMatch
{
    public string $agent_id;
    public ?string $before = null;
    public ?string $channel = null;
    public ?string $counterpart = null;
    public ?string $direction = null;
    public ?int $limit = null;
    public ?string $search = null;
}

/** Request payload for Message#create. */
class MessageCreateData
{
    public string $agent_id;
    public ?array $attachments = null;
    public ?array $cc = null;
    public ?string $channel = null;
    public ?string $client = null;
    public ?string $forward = null;
    public ?string $replyTo = null;
    public mixed $subject = null;
    public string $text;
    public mixed $thread = null;
    public ?array $to = null;
}

/** Teammate entity data model. */
class Teammate
{
    public array $addresses;
    public mixed $email;
    public mixed $icon;
    public string $id;
    public mixed $imageUrl;
    public string $kind;
    public mixed $listening;
    public mixed $name;
    public mixed $phone;
    public mixed $role;
}

/** Request payload for Teammate#list. */
class TeammateListMatch
{
    public ?array $addresses = null;
    public mixed $email = null;
    public mixed $icon = null;
    public ?string $id = null;
    public mixed $imageUrl = null;
    public ?string $kind = null;
    public mixed $listening = null;
    public mixed $name = null;
    public mixed $phone = null;
    public mixed $role = null;
}

/** Token entity data model. */
class Token
{
    public string $createdAt;
    public string $id;
    public mixed $lastUsedAt;
    public string $name;
}

/** Request payload for Token#list. */
class TokenListMatch
{
    public string $agent_id;
}

/** Request payload for Token#remove. */
class TokenRemoveMatch
{
    public string $agent_id;
    public string $id;
}

/** Webhook entity data model. */
class Webhook
{
    public int $attempts;
    public ?string $bearerToken = null;
    public string $createdAt;
    public mixed $deliveredAt;
    public mixed $error;
    public mixed $erroredAt;
    public string $id;
    public mixed $retryAt;
    public string $url;
}

/** Request payload for Webhook#list. */
class WebhookListMatch
{
    public string $agent_id;
}

/** Request payload for Webhook#create. */
class WebhookCreateData
{
    public string $agent_id;
    public ?string $bearerToken = null;
    public string $url;
}

/** Request payload for Webhook#remove. */
class WebhookRemoveMatch
{
    public string $agent_id;
    public string $id;
}

