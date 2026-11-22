package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Artil",
			"slug": "artil",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"secrets": map[string]any{
				"options": map[string]any{
					"active": false,
					"cache": true,
					"exchange": map[string]any{
						"active": false,
						"method": "POST",
						"path": "auth/token",
						"refresh": "",
						"request": "refresh_token",
						"response": "access_token",
						"retries": 1,
						"statuses": []any{
							401,
						},
					},
					"name": "apikey",
					"providers": []any{},
				},
				"optspec": map[string]any{},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://app.artil.ai/api",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"access": map[string]any{},
				"address": map[string]any{},
				"address_setup": map[string]any{},
				"agent": map[string]any{},
				"channel": map[string]any{},
				"client": map[string]any{},
				"connection": map[string]any{},
				"event": map[string]any{},
				"listener": map[string]any{},
				"me": map[string]any{},
				"me_token": map[string]any{},
				"message": map[string]any{},
				"teammate": map[string]any{},
				"token": map[string]any{},
				"webhook": map[string]any{},
			},
		},
		"entity": map[string]any{
			"access": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "admit",
						"title": "Admit",
						"type": "`$STRING`",
						"req": true,
						"short": "Whether anyone, the workspace's members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its…",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "senders",
						"title": "Senders",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "access",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}/access",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "access",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"access",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/agents/{id}/access/{channel}",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "access",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"access",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"channel": "id",
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "channel",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.agent",
						},
					},
				},
			},
			"address": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "channel",
						"title": "Channel",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
						"short": "The code the provider's consent page sent the member back with, beside setup",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"short": "The ISO country of the phone number; the first one the server sells by default",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "domainId",
						"title": "Domain Id",
						"type": "`$ANY`",
						"req": true,
						"short": "The workspace's own domain the address is on",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"format": "uuid",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "What people know the address by when its value is an id, like a Slack bot's @name",
					},
					map[string]any{
						"name": "primary",
						"title": "Primary",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether new messages on its channel go out from it",
					},
					map[string]any{
						"name": "registering",
						"title": "Registering",
						"type": "`$BOOLEAN`",
						"short": "Whether US carriers are still registering the phone number, which sends nothing until they have",
					},
					map[string]any{
						"name": "setup",
						"title": "Setup",
						"type": "`$STRING`",
						"short": "The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token",
						"format": "uuid",
					},
					map[string]any{
						"name": "token",
						"title": "Token",
						"type": "`$STRING`",
						"short": "What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between",
					},
					map[string]any{
						"name": "value",
						"title": "Value",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids",
						"format": "email",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "address",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/agents/{id}/addresses/{addressId}/primary",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "addresses",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "primary",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"addresses",
									"{id}",
									"primary",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"addressId": "id",
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "addressId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "primary",
									"exist": []any{
										"agent_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/agents/{id}/addresses",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "addresses",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"addresses",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}/addresses",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "addresses",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"addresses",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}/addresses/{addressId}",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "addresses",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"addresses",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"addressId": "id",
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "addressId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/agents/{id}/addresses/{addressId}",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "addresses",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"addresses",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"addressId": "id",
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "addressId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/agents/{id}/addresses/{addressId}",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "addresses",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"addresses",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"addressId": "id",
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "addressId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.agent",
						},
					},
				},
			},
			"address_setup": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "channel",
						"title": "Channel",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "token",
						"title": "Token",
						"type": "`$STRING`",
						"short": "What installs an app the member made: a Slack app's client id, client secret and signing secret, in that order, with spaces between.",
					},
				},
				"name": "address_setup",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/agents/{id}/addresses/setups",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "addresses",
									},
									map[string]any{
										"lit": "setups",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"addresses",
									"setups",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.agent",
						},
					},
				},
			},
			"agent": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "icon",
						"title": "Icon",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "agent",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/agents",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
								},
								"parts": []any{
									"agents",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
								},
								"parts": []any{
									"agents",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"agents",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/agents/{id}",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"agents",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/agents/{id}",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"agents",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"channel": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
						"short": "The channel's kind, which messages and events name",
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Words a client builds its texts about the channel from",
					},
					map[string]any{
						"name": "limits",
						"title": "Limits",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The most a message on the channel carries",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "What people and agents call the channel, like Telegram",
					},
				},
				"name": "channel",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}/channels",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "channels",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"channels",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.agent",
						},
					},
				},
			},
			"client": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The credential identifying this client",
						"format": "uuid",
					},
					map[string]any{
						"name": "lastUsedAt",
						"title": "Last Used At",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The recorded client or device name, or the name of a manually created token",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "client",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}/clients",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "clients",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"clients",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.agent",
						},
					},
				},
			},
			"connection": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "client",
						"title": "Client",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"format": "uuid",
					},
					map[string]any{
						"name": "machine",
						"title": "Machine",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "tokenId",
						"title": "Token Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The agent's token the client connected with",
						"format": "uuid",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "connection",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}/connection",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "connection",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"connection",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/agents/{id}/connection",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "connection",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"connection",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.agent",
						},
					},
				},
			},
			"event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attachments",
						"title": "Attachments",
						"type": "`$ARRAY`",
						"short": "The files that came with a message Artil keeps no copy of",
					},
					map[string]any{
						"name": "channel",
						"title": "Channel",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "client",
						"title": "Client",
						"type": "`$STRING`",
						"short": "The client you send from, like Codex, which the agent sees beside your name.",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "messageId",
						"title": "Message Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The message's id, to read it with",
						"format": "uuid",
					},
					map[string]any{
						"name": "sender",
						"title": "Sender",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"short": "The text of a message Artil keeps no copy of, which comes whole",
					},
					map[string]any{
						"name": "thread",
						"title": "Thread",
						"type": "`$STRING`",
						"short": "The thread of your client you send from, so the agent can answer there.",
					},
					map[string]any{
						"name": "toThread",
						"title": "To Thread",
						"type": "`$STRING`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": []any{
									"`$ONE`",
									[]any{
										"`$STRING`",
										"`$NULL`",
									},
								},
							},
						},
						"short": "The thread of the agent's client to hand the message to, from a message it sent",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "event",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/agents/{id}/url",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "url",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"url",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"body": map[string]any{
									"alternatives": []any{
										map[string]any{
											"fields": []any{
												map[string]any{
													"name": "draft",
												},
												map[string]any{
													"name": "file",
												},
											},
											"kind": "multipart",
											"media": "multipart/form-data",
										},
									},
									"kind": "json",
									"media": "application/json",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}/events",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "events",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"events",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "after",
											"orig": "after",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.agent",
						},
					},
				},
			},
			"listener": map[string]any{
				"fields": []any{},
				"name": "listener",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}/listeners",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "listeners",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"listeners",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.agent",
						},
					},
				},
			},
			"me": map[string]any{
				"fields": []any{},
				"name": "me",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/me",
								"segments": []any{
									map[string]any{
										"lit": "me",
									},
								},
								"parts": []any{
									"me",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"me_token": map[string]any{
				"fields": []any{},
				"name": "me_token",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/me/token",
								"segments": []any{
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"lit": "token",
									},
								},
								"parts": []any{
									"me",
									"token",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"message": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "addressId",
						"title": "Address Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The agent's address the message came to or went from; all zeros on url, where the agent's id is its address",
						"format": "uuid",
					},
					map[string]any{
						"name": "admission",
						"title": "Admission",
						"type": "`$ANY`",
						"req": true,
						"short": "Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified",
					},
					map[string]any{
						"name": "attachments",
						"title": "Attachments",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
						},
					},
					map[string]any{
						"name": "author",
						"title": "Author",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel",
					},
					map[string]any{
						"name": "authorName",
						"title": "Author Name",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The name the author goes by, when the channel tells it",
					},
					map[string]any{
						"name": "cc",
						"title": "Cc",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"short": "Whom the message names as getting a copy",
					},
					map[string]any{
						"name": "channel",
						"title": "Channel",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The channel's kind, from listChannels",
					},
					map[string]any{
						"name": "client",
						"title": "Client",
						"type": "`$STRING`",
						"short": "On url, the client you send from, like Codex, which the agent sees beside your name.",
					},
					map[string]any{
						"name": "counterpart",
						"title": "Counterpart",
						"type": "`$STRING`",
						"req": true,
						"short": "Who sent an inbound message, or the group it came in, or the recipients of an outbound one",
					},
					map[string]any{
						"name": "counterpartName",
						"title": "Counterpart Name",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The name an inbound message's sender or group goes by, when the channel tells it",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "direction",
						"title": "Direction",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Why a failed message was not sent or did not arrive",
					},
					map[string]any{
						"name": "forward",
						"title": "Forward",
						"type": "`$STRING`",
						"format": "uuid",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"format": "uuid",
					},
					map[string]any{
						"name": "refusal",
						"title": "Refusal",
						"type": "`$ANY`",
						"req": true,
						"short": "Why a refused message did not wake the agent",
					},
					map[string]any{
						"name": "replyTo",
						"title": "Reply To",
						"type": "`$STRING`",
						"format": "uuid",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "`reported` when the recipient marked an email the agent sent as spam",
					},
					map[string]any{
						"name": "subject",
						"title": "Subject",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "thread",
						"title": "Thread",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"short": "Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "message",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/agents/{id}/messages",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "messages",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"messages",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "Idempotency-Key",
											"type": "`$STRING`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"body": map[string]any{
									"alternatives": []any{
										map[string]any{
											"fields": []any{
												map[string]any{
													"name": "draft",
												},
												map[string]any{
													"name": "file",
												},
											},
											"kind": "multipart",
											"media": "multipart/form-data",
										},
									},
									"kind": "json",
									"media": "application/json",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}/messages",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "messages",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"messages",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "before",
											"orig": "before",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "channel",
											"orig": "channel",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "counterpart",
											"orig": "counterpart",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}/messages/{messageId}",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "messages",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"messages",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
										"messageId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "messageId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.agent",
						},
					},
				},
			},
			"teammate": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "addresses",
						"title": "Addresses",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The agent's primary email address, or the member's",
					},
					map[string]any{
						"name": "icon",
						"title": "Icon",
						"type": "`$ANY`",
						"req": true,
						"short": "The agent's icon; null for members",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The agent's or member's id",
					},
					map[string]any{
						"name": "imageUrl",
						"title": "Image Url",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The member's picture from their sign-in profile, or the avatar it makes them; null for agents",
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "listening",
						"title": "Listening",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$BOOLEAN`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "phone",
						"title": "Phone",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The agent's primary phone number, or the one a member added to their profile",
					},
					map[string]any{
						"name": "role",
						"title": "Role",
						"type": "`$ANY`",
						"req": true,
						"short": "The member's role in the workspace; null for agents",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "teammate",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/team",
								"segments": []any{
									map[string]any{
										"lit": "team",
									},
								},
								"parts": []any{
									"team",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"token": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"format": "uuid",
					},
					map[string]any{
						"name": "lastUsedAt",
						"title": "Last Used At",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "token",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}/tokens",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "tokens",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"tokens",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/agents/{id}/tokens/{tokenId}",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "tokens",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"tokens",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
										"tokenId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "tokenId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.agent",
						},
					},
				},
			},
			"webhook": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attempts",
						"title": "Attempts",
						"type": "`$INTEGER`",
						"req": true,
						"short": "How many times the event Artil is retrying has failed",
					},
					map[string]any{
						"name": "bearerToken",
						"title": "Bearer Token",
						"type": "`$STRING`",
						"short": "A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger.",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "deliveredAt",
						"title": "Delivered At",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Why the last delivery failed",
					},
					map[string]any{
						"name": "erroredAt",
						"title": "Errored At",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"format": "uuid",
					},
					map[string]any{
						"name": "retryAt",
						"title": "Retry At",
						"type": "`$ANY`",
						"req": true,
						"short": "When Artil next retries a failed event",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Where Artil posts the agent's events",
						"format": "uri",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "webhook",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/agents/{id}/webhooks",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "webhooks",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"webhooks",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/agents/{id}/webhooks",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "webhooks",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"webhooks",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/agents/{id}/webhooks/{webhookId}",
								"segments": []any{
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "agent_id",
									},
									map[string]any{
										"lit": "webhooks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"agents",
									"{agent_id}",
									"webhooks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "agent_id",
										"webhookId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "agent_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "webhookId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agent_id",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.agent",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "secrets":
		if NewSecretsFeatureFunc != nil {
			return NewSecretsFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
