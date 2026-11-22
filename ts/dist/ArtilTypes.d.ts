export interface Access {
    admit: string;
    senders: any[];
}
export interface AccessLoadMatch {
    agent_id: string;
}
export interface AccessUpdateData {
    agent_id: string;
    channel: string;
    admit?: string;
    senders?: any[];
}
export interface Address {
    channel: string;
    code?: string;
    country?: string;
    createdAt: string;
    domainId: any;
    id: string;
    name: string | null;
    primary: boolean;
    registering?: boolean;
    setup?: string;
    token?: string;
    value: string;
}
export interface AddressLoadMatch {
    agent_id: string;
    id: string;
}
export interface AddressListMatch {
    agent_id: string;
}
export interface AddressCreateData {
    agent_id: string;
    channel: string;
    code?: string;
    country?: string;
    setup?: string;
    token?: string;
    value?: string;
    $action?: string;
    [action: string]: any;
}
export interface AddressUpdateData {
    agent_id: string;
    id: string;
    value?: string;
}
export interface AddressRemoveMatch {
    agent_id: string;
    id: string;
}
export interface AddressSetup {
    channel: string;
    token?: string;
}
export interface AddressSetupCreateData {
    agent_id: string;
    channel: string;
    token?: string;
}
export interface Agent {
    createdAt: string;
    icon: string;
    id: string;
    name: string;
}
export interface AgentLoadMatch {
    id: string;
}
export interface AgentListMatch {
    createdAt?: string;
    icon?: string;
    id?: string;
    name?: string;
}
export interface AgentCreateData {
    icon?: string;
    name: string;
}
export interface AgentUpdateData {
    id: string;
    icon?: string;
    name?: string;
}
export interface AgentRemoveMatch {
    id: string;
}
export interface Channel {
    kind: string;
    labels: Record<string, any>;
    limits: Record<string, any>;
    name: string;
}
export interface ChannelListMatch {
    agent_id: string;
}
export interface Client {
    createdAt: string;
    id: string;
    lastUsedAt: any;
    name: string;
}
export interface ClientListMatch {
    agent_id: string;
}
export interface Connection {
    client: string;
    id: string;
    machine: string | null;
    tokenId: string;
}
export interface ConnectionLoadMatch {
    agent_id: string;
}
export interface ConnectionUpdateData {
    agent_id: string;
    client?: string;
    machine?: string | null;
}
export interface Event {
    attachments?: any[];
    channel: string;
    client?: string;
    createdAt: string;
    id: number;
    messageId: string;
    sender: Record<string, any>;
    text?: string;
    thread?: string;
    toThread?: string;
    type: string;
}
export interface EventListMatch {
    agent_id: string;
    after?: number;
}
export interface EventCreateData {
    agent_id: string;
    attachments?: any[];
    client?: string;
    text?: string;
    thread?: string;
    toThread?: string;
}
export interface Listener {
}
export interface ListenerListMatch {
    agent_id: string;
}
export interface Me {
}
export interface MeLoadMatch {
}
export interface MeToken {
}
export interface MeTokenRemoveMatch {
}
export interface Message {
    addressId: string;
    admission: any;
    attachments: any[];
    author: string | null;
    authorName: string | null;
    cc: any[];
    channel: string;
    client?: string;
    counterpart: string;
    counterpartName: string | null;
    createdAt: string;
    direction: string;
    error: string | null;
    forward?: string;
    id: string;
    refusal: any;
    replyTo?: string;
    status: string;
    subject: string | null;
    text: string;
    thread: any;
    to: any[];
}
export interface MessageLoadMatch {
    agent_id: string;
    id: string;
}
export interface MessageListMatch {
    agent_id: string;
    before?: string;
    channel?: string;
    counterpart?: string;
    direction?: string;
    limit?: number;
    search?: string;
}
export interface MessageCreateData {
    agent_id: string;
    attachments?: any[];
    cc?: any[];
    channel?: string;
    client?: string;
    forward?: string;
    replyTo?: string;
    subject?: string | null;
    text: string;
    thread?: any;
    to?: any[];
}
export interface Teammate {
    addresses: any[];
    email: string | null;
    icon: any;
    id: string;
    imageUrl: string | null;
    kind: string;
    listening: boolean | null;
    name: string | null;
    phone: string | null;
    role: any;
}
export interface TeammateListMatch {
    addresses?: any[];
    email?: string | null;
    icon?: any;
    id?: string;
    imageUrl?: string | null;
    kind?: string;
    listening?: boolean | null;
    name?: string | null;
    phone?: string | null;
    role?: any;
}
export interface Token {
    createdAt: string;
    id: string;
    lastUsedAt: any;
    name: string;
}
export interface TokenListMatch {
    agent_id: string;
}
export interface TokenRemoveMatch {
    agent_id: string;
    id: string;
}
export interface Webhook {
    attempts: number;
    bearerToken?: string;
    createdAt: string;
    deliveredAt: any;
    error: string | null;
    erroredAt: any;
    id: string;
    retryAt: any;
    url: string;
}
export interface WebhookListMatch {
    agent_id: string;
}
export interface WebhookCreateData {
    agent_id: string;
    bearerToken?: string;
    url: string;
}
export interface WebhookRemoveMatch {
    agent_id: string;
    id: string;
}
