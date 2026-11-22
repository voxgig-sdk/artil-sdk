# Typed models for the Artil SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AccessRequired(TypedDict):
    admit: str
    senders: list


class Access(AccessRequired, total=False):
    id: str


class AccessUpdateDataRequired(TypedDict):
    agent_id: str
    id: str


class AccessUpdateData(AccessUpdateDataRequired, total=False):
    admit: str
    senders: list


class AddressRequired(TypedDict):
    channel: str
    createdAt: str
    domainId: Any
    id: str
    name: str | None
    primary: bool
    value: str


class Address(AddressRequired, total=False):
    code: str
    country: str
    registering: bool
    setup: str
    token: str


class AddressLoadMatch(TypedDict):
    agent_id: str
    id: str


class AddressListMatch(TypedDict):
    agent_id: str


class AddressCreateDataRequired(TypedDict):
    agent_id: str
    channel: str


class AddressCreateData(AddressCreateDataRequired, total=False):
    code: str
    country: str
    setup: str
    token: str
    value: str


class AddressUpdateDataRequired(TypedDict):
    agent_id: str
    id: str


class AddressUpdateData(AddressUpdateDataRequired, total=False):
    value: str


class AddressRemoveMatch(TypedDict):
    agent_id: str
    id: str


class AddressSetupRequired(TypedDict):
    channel: str


class AddressSetup(AddressSetupRequired, total=False):
    token: str


class AddressSetupCreateDataRequired(TypedDict):
    agent_id: str
    channel: str


class AddressSetupCreateData(AddressSetupCreateDataRequired, total=False):
    token: str


class Agent(TypedDict):
    createdAt: str
    icon: str
    id: str
    name: str


class AgentLoadMatch(TypedDict):
    id: str


class AgentListMatch(TypedDict, total=False):
    createdAt: str
    icon: str
    id: str
    name: str


class AgentCreateDataRequired(TypedDict):
    name: str


class AgentCreateData(AgentCreateDataRequired, total=False):
    icon: str


class AgentUpdateDataRequired(TypedDict):
    id: str


class AgentUpdateData(AgentUpdateDataRequired, total=False):
    icon: str
    name: str


class AgentRemoveMatch(TypedDict):
    id: str


class Channel(TypedDict):
    kind: str
    labels: dict
    limits: dict
    name: str


class ChannelListMatch(TypedDict):
    agent_id: str


class Client(TypedDict):
    createdAt: str
    id: str
    lastUsedAt: Any
    name: str


class ClientListMatch(TypedDict):
    agent_id: str


class Connection(TypedDict):
    client: str
    id: str
    machine: str | None
    tokenId: str


class ConnectionUpdateDataRequired(TypedDict):
    agent_id: str


class ConnectionUpdateData(ConnectionUpdateDataRequired, total=False):
    client: str
    machine: str | None


class EventRequired(TypedDict):
    channel: str
    createdAt: str
    id: int
    messageId: str
    sender: dict
    type: str


class Event(EventRequired, total=False):
    attachments: list
    client: str
    text: str
    thread: str
    toThread: str


class EventLoadMatchRequired(TypedDict):
    agent_id: str


class EventLoadMatch(EventLoadMatchRequired, total=False):
    after: int
    connection: str


class EventListMatchRequired(TypedDict):
    agent_id: str


class EventListMatch(EventListMatchRequired, total=False):
    after: int


class EventCreateDataRequired(TypedDict):
    agent_id: str


class EventCreateData(EventCreateDataRequired, total=False):
    attachments: list
    client: str
    text: str
    thread: str
    toThread: str


class ListedTeammate(TypedDict):
    addresses: list
    email: str | None
    icon: Any
    id: str
    imageUrl: str | None
    kind: str
    listening: bool | None
    name: str | None
    phone: str | None
    role: Any


class ListedTeammateListMatch(TypedDict, total=False):
    addresses: list
    email: str | None
    icon: Any
    id: str
    imageUrl: str | None
    kind: str
    listening: bool | None
    name: str | None
    phone: str | None
    role: Any


class Listener(TypedDict):
    pass


class ListenerListMatch(TypedDict):
    agent_id: str


class Men(TypedDict):
    pass


class MenLoadMatch(TypedDict):
    pass


class MenRemoveMatch(TypedDict):
    pass


class MessageRequired(TypedDict):
    addressId: str
    admission: Any
    attachments: list
    author: str | None
    authorName: str | None
    cc: list
    channel: str
    counterpart: str
    counterpartName: str | None
    createdAt: str
    direction: str
    error: str | None
    id: str
    refusal: Any
    status: str
    subject: str | None
    text: str
    thread: Any
    to: list


class Message(MessageRequired, total=False):
    client: str
    forward: str
    replyTo: str


class MessageLoadMatch(TypedDict):
    agent_id: str
    id: str


class MessageListMatchRequired(TypedDict):
    agent_id: str


class MessageListMatch(MessageListMatchRequired, total=False):
    before: str
    channel: str
    counterpart: str
    direction: str
    limit: int
    search: str


class MessageCreateDataRequired(TypedDict):
    agent_id: str
    text: str


class MessageCreateData(MessageCreateDataRequired, total=False):
    attachments: list
    cc: list
    channel: str
    client: str
    forward: str
    replyTo: str
    subject: str | None
    thread: Any
    to: list


class Token(TypedDict):
    createdAt: str
    id: str
    lastUsedAt: Any
    name: str


class TokenListMatch(TypedDict):
    agent_id: str


class TokenRemoveMatch(TypedDict):
    agent_id: str
    id: str


class WebhookRequired(TypedDict):
    attempts: int
    createdAt: str
    deliveredAt: Any
    error: str | None
    erroredAt: Any
    id: str
    retryAt: Any
    url: str


class Webhook(WebhookRequired, total=False):
    bearerToken: str


class WebhookListMatch(TypedDict):
    agent_id: str


class WebhookCreateDataRequired(TypedDict):
    agent_id: str
    url: str


class WebhookCreateData(WebhookCreateDataRequired, total=False):
    bearerToken: str


class WebhookRemoveMatch(TypedDict):
    agent_id: str
    id: str
