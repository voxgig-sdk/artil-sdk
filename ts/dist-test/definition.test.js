"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "access",
        "accessor": "Access",
        "op": "load",
        "method": "GET",
        "path": "/agents/{id}/access",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "access",
        "accessor": "Access",
        "op": "update",
        "method": "PUT",
        "path": "/agents/{id}/access/{channel}",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "channel",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "admit": "anyone",
            "senders": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "address",
        "accessor": "Address",
        "op": "create",
        "method": "POST",
        "path": "/agents/{id}/addresses/{addressId}/primary",
        "action": "primary",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "addressId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "address",
        "accessor": "Address",
        "op": "create",
        "method": "POST",
        "path": "/agents/{id}/addresses",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "x",
            "channel": "email",
            "value": "x",
            "name": "x",
            "domainId": "x",
            "primary": true,
            "registering": true,
            "createdAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "address",
        "accessor": "Address",
        "op": "list",
        "method": "GET",
        "path": "/agents/{id}/addresses",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "x",
                "channel": "email",
                "value": "x",
                "name": "x",
                "domainId": "x",
                "primary": true,
                "registering": true,
                "createdAt": "2026-01-01T00:00:00Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "address",
        "accessor": "Address",
        "op": "load",
        "method": "GET",
        "path": "/agents/{id}/addresses/{addressId}",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "addressId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "channel": "email",
            "value": "x",
            "name": "x",
            "domainId": "x",
            "primary": true,
            "registering": true,
            "createdAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "address",
        "accessor": "Address",
        "op": "remove",
        "method": "DELETE",
        "path": "/agents/{id}/addresses/{addressId}",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "addressId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "address",
        "accessor": "Address",
        "op": "update",
        "method": "PATCH",
        "path": "/agents/{id}/addresses/{addressId}",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "addressId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "channel": "email",
            "value": "x",
            "name": "x",
            "domainId": "x",
            "primary": true,
            "registering": true,
            "createdAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "address_setup",
        "accessor": "AddressSetup",
        "op": "create",
        "method": "POST",
        "path": "/agents/{id}/addresses/setups",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "url": "x"
        },
        "idField": "id"
    },
    {
        "entity": "agent",
        "accessor": "Agent",
        "op": "create",
        "method": "POST",
        "path": "/agents",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "x",
            "name": "x",
            "icon": "bot",
            "createdAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "agent",
        "accessor": "Agent",
        "op": "list",
        "method": "GET",
        "path": "/agents",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "x",
                "name": "x",
                "icon": "bot",
                "createdAt": "2026-01-01T00:00:00Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "agent",
        "accessor": "Agent",
        "op": "load",
        "method": "GET",
        "path": "/agents/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "name": "x",
            "icon": "bot",
            "createdAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "agent",
        "accessor": "Agent",
        "op": "remove",
        "method": "DELETE",
        "path": "/agents/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "agent",
        "accessor": "Agent",
        "op": "update",
        "method": "PATCH",
        "path": "/agents/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "name": "x",
            "icon": "bot",
            "createdAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "channel",
        "accessor": "Channel",
        "op": "list",
        "method": "GET",
        "path": "/agents/{id}/channels",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "kind": "x",
                "name": "x",
                "labels": {
                    "address": "x",
                    "contact": "x",
                    "token": "x"
                },
                "limits": {
                    "recipients": 1,
                    "text": 1,
                    "files": 1,
                    "fileSize": 1
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "client",
        "accessor": "Client",
        "op": "list",
        "method": "GET",
        "path": "/agents/{id}/clients",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "x",
                "name": "x",
                "createdAt": "2026-01-01T00:00:00Z",
                "lastUsedAt": "2026-01-01T00:00:00Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "connection",
        "accessor": "Connection",
        "op": "load",
        "method": "GET",
        "path": "/agents/{id}/connection",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "client": "x",
            "machine": "x",
            "tokenId": "x"
        },
        "idField": "id"
    },
    {
        "entity": "connection",
        "accessor": "Connection",
        "op": "update",
        "method": "PUT",
        "path": "/agents/{id}/connection",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "client": "x",
            "machine": "x",
            "tokenId": "x"
        },
        "idField": "id"
    },
    {
        "entity": "event",
        "accessor": "Event",
        "op": "create",
        "method": "POST",
        "path": "/agents/{id}/url",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": 1,
            "type": "x",
            "channel": "email",
            "messageId": "x",
            "text": "x",
            "sender": {
                "id": "x",
                "kind": "agent",
                "name": "x",
                "email": "x",
                "phone": "x"
            },
            "thread": "x",
            "toThread": "x",
            "client": "x",
            "attachments": [
                {
                    "id": "x",
                    "name": "x",
                    "type": "x",
                    "size": 1,
                    "url": "x"
                }
            ],
            "createdAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "event",
        "accessor": "Event",
        "op": "list",
        "method": "GET",
        "path": "/agents/{id}/events",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {
            "after": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "after"
        ],
        "queryArgs": [
            {
                "name": "after",
                "wire": "after"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "type": "x",
                "channel": "email",
                "messageId": "x",
                "text": "x",
                "sender": {
                    "id": "x",
                    "kind": "agent",
                    "name": "x",
                    "email": "x",
                    "phone": "x"
                },
                "thread": "x",
                "toThread": "x",
                "client": "x",
                "attachments": [
                    {
                        "id": "x",
                        "name": "x",
                        "type": "x",
                        "size": 1,
                        "url": "x"
                    }
                ],
                "createdAt": "2026-01-01T00:00:00Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "listener",
        "accessor": "Listener",
        "op": "list",
        "method": "GET",
        "path": "/agents/{id}/listeners",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "kind": "x",
                "client": "x",
                "machine": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "me",
        "accessor": "Me",
        "op": "load",
        "method": "GET",
        "path": "/me",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "kind": "x",
            "userId": "x",
            "role": "admin",
            "email": "x",
            "orgId": "x",
            "workspace": {
                "name": "x"
            },
            "agent": {
                "id": "x",
                "name": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "me_token",
        "accessor": "MeToken",
        "op": "remove",
        "method": "DELETE",
        "path": "/me/token",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "message",
        "accessor": "Message",
        "op": "create",
        "method": "POST",
        "path": "/agents/{id}/messages",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "idempotency_key",
                "wire": "Idempotency-Key",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "x",
            "addressId": "x",
            "channel": "x",
            "direction": "inbound",
            "counterpart": "x",
            "counterpartName": "x",
            "author": "x",
            "authorName": "x",
            "to": [
                "x"
            ],
            "cc": [
                "x"
            ],
            "subject": "x",
            "text": "x",
            "attachments": [
                {
                    "id": "x",
                    "name": "x",
                    "type": "x",
                    "size": 1,
                    "url": "x"
                }
            ],
            "thread": {
                "messageId": "x",
                "references": [
                    "x"
                ]
            },
            "status": "received",
            "refusal": "self",
            "admission": "team",
            "error": "x",
            "createdAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "message",
        "accessor": "Message",
        "op": "list",
        "method": "GET",
        "path": "/agents/{id}/messages",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {
            "before": "v1",
            "channel": "v1",
            "counterpart": "v1",
            "direction": "v1",
            "limit": "v1",
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "channel",
            "direction",
            "limit",
            "counterpart",
            "before",
            "search"
        ],
        "queryArgs": [
            {
                "name": "before",
                "wire": "before"
            },
            {
                "name": "channel",
                "wire": "channel"
            },
            {
                "name": "counterpart",
                "wire": "counterpart"
            },
            {
                "name": "direction",
                "wire": "direction"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "x",
                "addressId": "x",
                "channel": "x",
                "direction": "inbound",
                "counterpart": "x",
                "counterpartName": "x",
                "author": "x",
                "authorName": "x",
                "to": [
                    "x"
                ],
                "cc": [
                    "x"
                ],
                "subject": "x",
                "text": "x",
                "attachments": [
                    {
                        "id": "x",
                        "name": "x",
                        "type": "x",
                        "size": 1,
                        "url": "x"
                    }
                ],
                "thread": {
                    "messageId": "x",
                    "references": [
                        "x"
                    ]
                },
                "status": "received",
                "refusal": "self",
                "admission": "team",
                "error": "x",
                "createdAt": "2026-01-01T00:00:00Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "message",
        "accessor": "Message",
        "op": "load",
        "method": "GET",
        "path": "/agents/{id}/messages/{messageId}",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "messageId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "addressId": "x",
            "channel": "x",
            "direction": "inbound",
            "counterpart": "x",
            "counterpartName": "x",
            "author": "x",
            "authorName": "x",
            "to": [
                "x"
            ],
            "cc": [
                "x"
            ],
            "subject": "x",
            "text": "x",
            "attachments": [
                {
                    "id": "x",
                    "name": "x",
                    "type": "x",
                    "size": 1,
                    "url": "x"
                }
            ],
            "thread": {
                "messageId": "x",
                "references": [
                    "x"
                ]
            },
            "status": "received",
            "refusal": "self",
            "admission": "team",
            "error": "x",
            "createdAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "teammate",
        "accessor": "Teammate",
        "op": "list",
        "method": "GET",
        "path": "/team",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "x",
                "kind": "agent",
                "name": "x",
                "email": "x",
                "phone": "x",
                "addresses": [
                    {
                        "channel": "email",
                        "value": "x"
                    }
                ],
                "icon": "bot",
                "imageUrl": "x",
                "role": "admin",
                "listening": true
            }
        ],
        "idField": "id"
    },
    {
        "entity": "token",
        "accessor": "Token",
        "op": "list",
        "method": "GET",
        "path": "/agents/{id}/tokens",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "x",
                "name": "x",
                "createdAt": "2026-01-01T00:00:00Z",
                "lastUsedAt": "2026-01-01T00:00:00Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "token",
        "accessor": "Token",
        "op": "remove",
        "method": "DELETE",
        "path": "/agents/{id}/tokens/{tokenId}",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "tokenId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "webhook",
        "accessor": "Webhook",
        "op": "create",
        "method": "POST",
        "path": "/agents/{id}/webhooks",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "x",
            "url": "x",
            "deliveredAt": "2026-01-01T00:00:00Z",
            "error": "x",
            "erroredAt": "2026-01-01T00:00:00Z",
            "attempts": 1,
            "retryAt": "2026-01-01T00:00:00Z",
            "createdAt": "2026-01-01T00:00:00Z",
            "secret": "x"
        },
        "idField": "id"
    },
    {
        "entity": "webhook",
        "accessor": "Webhook",
        "op": "list",
        "method": "GET",
        "path": "/agents/{id}/webhooks",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "x",
                "url": "x",
                "deliveredAt": "2026-01-01T00:00:00Z",
                "error": "x",
                "erroredAt": "2026-01-01T00:00:00Z",
                "attempts": 1,
                "retryAt": "2026-01-01T00:00:00Z",
                "createdAt": "2026-01-01T00:00:00Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "webhook",
        "accessor": "Webhook",
        "op": "remove",
        "method": "DELETE",
        "path": "/agents/{id}/webhooks/{webhookId}",
        "args": [
            {
                "name": "agent_id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "webhookId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map