<?php
declare(strict_types=1);

// Artil SDK configuration

class ArtilConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Artil",
                "slug" => "artil",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "debug" => [
          'options' => [
            'active' => false,
            'max' => 100,
            'redact' => [
              'authorization',
              'cookie',
              'set-cookie',
              'api-key',
              'apikey',
              'x-api-key',
              'idempotency-key',
            ],
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'onEntry' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'none',
        ],
                "idempotency" => [
          'options' => [
            'active' => false,
            'header' => 'Idempotency-Key',
            'methods' => [
              'POST',
              'PUT',
              'PATCH',
              'DELETE',
            ],
            'ops' => [
              'create',
              'update',
              'remove',
            ],
          ],
          'optspec' => [
            'keygen' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'none',
        ],
                "metrics" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'none',
        ],
                "paging" => [
          'options' => [
            'active' => false,
            'afterVar' => 'after',
            'cursorParam' => 'cursor',
            'firstVar' => 'first',
            'limitParam' => 'limit',
            'pageParam' => 'page',
            'startPage' => 1,
          ],
          'optspec' => [
            'limit' => '`$NUMBER`',
            'ops' => '`$LIST`',
          ],
          'strict' => false,
          'transport' => 'none',
        ],
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "secrets" => [
          'options' => [
            'active' => false,
            'cache' => true,
            'exchange' => [
              'active' => false,
              'method' => 'POST',
              'path' => 'auth/token',
              'refresh' => '',
              'request' => 'refresh_token',
              'response' => 'access_token',
              'retries' => 1,
              'statuses' => [
                401,
              ],
            ],
            'name' => 'apikey',
            'providers' => [],
          ],
          'optspec' => [],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://app.artil.ai/api",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "access" => [],
                    "address" => [],
                    "address_setup" => [],
                    "agent" => [],
                    "channel" => [],
                    "client" => [],
                    "connection" => [],
                    "event" => [],
                    "listener" => [],
                    "me" => [],
                    "me_token" => [],
                    "message" => [],
                    "teammate" => [],
                    "token" => [],
                    "webhook" => [],
                ],
            ],
            "entity" => [
        'access' => [
          'fields' => [
            [
              'name' => 'admit',
              'title' => 'Admit',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Whether anyone, the workspace\'s members and agents besides the listed senders, or only the listed senders wake the agent; a new agent starts with team, except on Telegram, which lists the account that creates its bot from Artil, and its…',
            ],
            [
              'name' => 'senders',
              'title' => 'Senders',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Email addresses, phone numbers, Telegram user ids, group ids and usernames, Slack member ids and #channels, or for the Message URL the ids of agents and members',
            ],
          ],
          'name' => 'access',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}/access',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'access',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'access',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/agents/{id}/access/{channel}',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'access',
                    ],
                    [
                      'var' => 'channel',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'access',
                    '{channel}',
                  ],
                  'rename' => [
                    'param' => [
                      'channel' => 'channel',
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'channel',
                        'orig' => 'channel',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                      'channel',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.agent',
              ],
              [
                '$.main.kit.entity.agent',
              ],
            ],
          ],
        ],
        'address' => [
          'fields' => [
            [
              'name' => 'channel',
              'title' => 'Channel',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'code',
              'title' => 'Code',
              'type' => '`$STRING`',
              'short' => 'The code the provider\'s consent page sent the member back with, beside setup',
            ],
            [
              'name' => 'country',
              'title' => 'Country',
              'type' => '`$STRING`',
              'short' => 'The ISO country of the phone number; the first one the server sells by default',
            ],
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'date-time',
            ],
            [
              'name' => 'domainId',
              'title' => 'Domain Id',
              'type' => '`$ANY`',
              'req' => true,
              'short' => 'The workspace\'s own domain the address is on',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'uuid',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
              'short' => 'What people know the address by when its value is an id, like a Slack bot\'s @name',
            ],
            [
              'name' => 'primary',
              'title' => 'Primary',
              'type' => '`$BOOLEAN`',
              'req' => true,
              'short' => 'Whether new messages on its channel go out from it',
            ],
            [
              'name' => 'registering',
              'title' => 'Registering',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether US carriers are still registering the phone number, which sends nothing until they have',
            ],
            [
              'name' => 'setup',
              'title' => 'Setup',
              'type' => '`$STRING`',
              'short' => 'The state a provider\'s consent page sent the member back with, for an app they installed from the link setUpAddress gave with token',
              'format' => 'uuid',
            ],
            [
              'name' => 'token',
              'title' => 'Token',
              'type' => '`$STRING`',
              'short' => 'What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app\'s bot token and signing secret with a space between',
            ],
            [
              'name' => 'value',
              'title' => 'Value',
              'type' => '`$STRING`',
              'req' => true,
              'op' => [
                'create' => [
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'The email address, phone number, Telegram bot\'s @username, or Slack bot\'s workspace and member ids',
              'format' => 'email',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'address',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/agents/{id}/addresses/{addressId}/primary',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'addresses',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'primary',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'addresses',
                    '{id}',
                    'primary',
                  ],
                  'rename' => [
                    'param' => [
                      'addressId' => 'id',
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'id',
                        'orig' => 'addressId',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'primary',
                    'exist' => [
                      'agent_id',
                      'id',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/agents/{id}/addresses',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'addresses',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'addresses',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}/addresses',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'addresses',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'addresses',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}/addresses/{addressId}',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'addresses',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'addresses',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'addressId' => 'id',
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'id',
                        'orig' => 'addressId',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/agents/{id}/addresses/{addressId}',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'addresses',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'addresses',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'addressId' => 'id',
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'id',
                        'orig' => 'addressId',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                      'id',
                    ],
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'PATCH',
                  'orig' => '/agents/{id}/addresses/{addressId}',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'addresses',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'addresses',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'addressId' => 'id',
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'id',
                        'orig' => 'addressId',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.agent',
              ],
            ],
          ],
        ],
        'address_setup' => [
          'fields' => [
            [
              'name' => 'channel',
              'title' => 'Channel',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'token',
              'title' => 'Token',
              'type' => '`$STRING`',
              'short' => 'What installs an app the member made: a Slack app\'s client id, client secret and signing secret, in that order, with spaces between.',
            ],
          ],
          'name' => 'address_setup',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/agents/{id}/addresses/setups',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'addresses',
                    ],
                    [
                      'lit' => 'setups',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'addresses',
                    'setups',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.agent',
              ],
            ],
          ],
        ],
        'agent' => [
          'fields' => [
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'date-time',
            ],
            [
              'name' => 'icon',
              'title' => 'Icon',
              'type' => '`$STRING`',
              'req' => true,
              'op' => [
                'create' => [
                  'type' => '`$STRING`',
                ],
                'update' => [
                  'type' => '`$STRING`',
                ],
              ],
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
              'op' => [
                'update' => [
                  'type' => '`$STRING`',
                ],
              ],
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'agent',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/agents',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                  ],
                  'parts' => [
                    'agents',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                  ],
                  'parts' => [
                    'agents',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/agents/{id}',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'PATCH',
                  'orig' => '/agents/{id}',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'channel' => [
          'fields' => [
            [
              'name' => 'kind',
              'title' => 'Kind',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The channel\'s kind, which messages and events name',
            ],
            [
              'name' => 'labels',
              'title' => 'Labels',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Words a client builds its texts about the channel from',
            ],
            [
              'name' => 'limits',
              'title' => 'Limits',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'The most a message on the channel carries',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'What people and agents call the channel, like Telegram',
            ],
          ],
          'name' => 'channel',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}/channels',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'channels',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'channels',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.agent',
              ],
            ],
          ],
        ],
        'client' => [
          'fields' => [
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'date-time',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The credential identifying this client',
              'format' => 'uuid',
            ],
            [
              'name' => 'lastUsedAt',
              'title' => 'Last Used At',
              'type' => '`$ANY`',
              'req' => true,
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The recorded client or device name, or the name of a manually created token',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'client',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}/clients',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'clients',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'clients',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.agent',
              ],
            ],
          ],
        ],
        'connection' => [
          'fields' => [
            [
              'name' => 'client',
              'title' => 'Client',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'uuid',
            ],
            [
              'name' => 'machine',
              'title' => 'Machine',
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
              'op' => [
                'update' => [
                  'type' => '`$STRING`',
                ],
              ],
            ],
            [
              'name' => 'tokenId',
              'title' => 'Token Id',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The agent\'s token the client connected with',
              'format' => 'uuid',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'connection',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}/connection',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'connection',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'connection',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/agents/{id}/connection',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'connection',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'connection',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.agent',
              ],
            ],
          ],
        ],
        'event' => [
          'fields' => [
            [
              'name' => 'attachments',
              'title' => 'Attachments',
              'type' => '`$ARRAY`',
              'short' => 'The files that came with a message Artil keeps no copy of',
            ],
            [
              'name' => 'channel',
              'title' => 'Channel',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'client',
              'title' => 'Client',
              'type' => '`$STRING`',
              'short' => 'The client you send from, like Codex, which the agent sees beside your name.',
            ],
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'date-time',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'messageId',
              'title' => 'Message Id',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The message\'s id, to read it with',
              'format' => 'uuid',
            ],
            [
              'name' => 'sender',
              'title' => 'Sender',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'text',
              'title' => 'Text',
              'type' => '`$STRING`',
              'short' => 'The text of a message Artil keeps no copy of, which comes whole',
            ],
            [
              'name' => 'thread',
              'title' => 'Thread',
              'type' => '`$STRING`',
              'short' => 'The thread of your client you send from, so the agent can answer there.',
            ],
            [
              'name' => 'toThread',
              'title' => 'To Thread',
              'type' => '`$STRING`',
              'op' => [
                'list' => [
                  'req' => true,
                  'type' => [
                    '`$ONE`',
                    [
                      '`$STRING`',
                      '`$NULL`',
                    ],
                  ],
                ],
              ],
              'short' => 'The thread of the agent\'s client to hand the message to, from a message it sent',
            ],
            [
              'name' => 'type',
              'title' => 'Type',
              'type' => '`$STRING`',
              'req' => true,
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'event',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/agents/{id}/url',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'url',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'url',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'body' => [
                    'alternatives' => [
                      [
                        'fields' => [
                          [
                            'name' => 'draft',
                          ],
                          [
                            'name' => 'file',
                          ],
                        ],
                        'kind' => 'multipart',
                        'media' => 'multipart/form-data',
                      ],
                    ],
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}/events',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'events',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'events',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'after',
                        'orig' => 'after',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.agent',
              ],
            ],
          ],
        ],
        'listener' => [
          'fields' => [],
          'name' => 'listener',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}/listeners',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'listeners',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'listeners',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.agent',
              ],
            ],
          ],
        ],
        'me' => [
          'fields' => [],
          'name' => 'me',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/me',
                  'segments' => [
                    [
                      'lit' => 'me',
                    ],
                  ],
                  'parts' => [
                    'me',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'me_token' => [
          'fields' => [],
          'name' => 'me_token',
          'op' => [
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/me/token',
                  'segments' => [
                    [
                      'lit' => 'me',
                    ],
                    [
                      'lit' => 'token',
                    ],
                  ],
                  'parts' => [
                    'me',
                    'token',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'message' => [
          'fields' => [
            [
              'name' => 'addressId',
              'title' => 'Address Id',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The agent\'s address the message came to or went from; all zeros on url, where the agent\'s id is its address',
              'format' => 'uuid',
            ],
            [
              'name' => 'admission',
              'title' => 'Admission',
              'type' => '`$ANY`',
              'req' => true,
              'short' => 'Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel\'s list, and `anyone` for everyone else, including senders who could not be verified',
            ],
            [
              'name' => 'attachments',
              'title' => 'Attachments',
              'type' => '`$ARRAY`',
              'req' => true,
              'op' => [
                'create' => [
                  'type' => '`$ARRAY`',
                ],
              ],
            ],
            [
              'name' => 'author',
              'title' => 'Author',
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
              'short' => 'Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel',
            ],
            [
              'name' => 'authorName',
              'title' => 'Author Name',
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
              'short' => 'The name the author goes by, when the channel tells it',
            ],
            [
              'name' => 'cc',
              'title' => 'Cc',
              'type' => '`$ARRAY`',
              'req' => true,
              'op' => [
                'create' => [
                  'type' => '`$ARRAY`',
                ],
              ],
              'short' => 'Whom the message names as getting a copy',
            ],
            [
              'name' => 'channel',
              'title' => 'Channel',
              'type' => '`$STRING`',
              'req' => true,
              'op' => [
                'create' => [
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'The channel\'s kind, from listChannels',
            ],
            [
              'name' => 'client',
              'title' => 'Client',
              'type' => '`$STRING`',
              'short' => 'On url, the client you send from, like Codex, which the agent sees beside your name.',
            ],
            [
              'name' => 'counterpart',
              'title' => 'Counterpart',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Who sent an inbound message, or the group it came in, or the recipients of an outbound one',
            ],
            [
              'name' => 'counterpartName',
              'title' => 'Counterpart Name',
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
              'short' => 'The name an inbound message\'s sender or group goes by, when the channel tells it',
            ],
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'date-time',
            ],
            [
              'name' => 'direction',
              'title' => 'Direction',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'error',
              'title' => 'Error',
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
              'short' => 'Why a failed message was not sent or did not arrive',
            ],
            [
              'name' => 'forward',
              'title' => 'Forward',
              'type' => '`$STRING`',
              'format' => 'uuid',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'uuid',
            ],
            [
              'name' => 'refusal',
              'title' => 'Refusal',
              'type' => '`$ANY`',
              'req' => true,
              'short' => 'Why a refused message did not wake the agent',
            ],
            [
              'name' => 'replyTo',
              'title' => 'Reply To',
              'type' => '`$STRING`',
              'format' => 'uuid',
            ],
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$STRING`',
              'req' => true,
              'short' => '`reported` when the recipient marked an email the agent sent as spam',
            ],
            [
              'name' => 'subject',
              'title' => 'Subject',
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
              'op' => [
                'create' => [
                  'type' => '`$STRING`',
                ],
              ],
            ],
            [
              'name' => 'text',
              'title' => 'Text',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'thread',
              'title' => 'Thread',
              'type' => '`$ANY`',
              'req' => true,
              'op' => [
                'create' => [
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered',
            ],
            [
              'name' => 'to',
              'title' => 'To',
              'type' => '`$ARRAY`',
              'req' => true,
              'op' => [
                'create' => [
                  'type' => '`$ARRAY`',
                ],
              ],
              'short' => 'Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'message',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/agents/{id}/messages',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'messages',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'messages',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'header' => [
                      [
                        'name' => 'idempotency_key',
                        'orig' => 'Idempotency-Key',
                        'type' => '`$STRING`',
                        'kind' => 'header',
                      ],
                    ],
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'body' => [
                    'alternatives' => [
                      [
                        'fields' => [
                          [
                            'name' => 'draft',
                          ],
                          [
                            'name' => 'file',
                          ],
                        ],
                        'kind' => 'multipart',
                        'media' => 'multipart/form-data',
                      ],
                    ],
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}/messages',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'messages',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'messages',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'before',
                        'orig' => 'before',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'channel',
                        'orig' => 'channel',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'field' => true,
                      ],
                      [
                        'name' => 'counterpart',
                        'orig' => 'counterpart',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'field' => true,
                      ],
                      [
                        'name' => 'direction',
                        'orig' => 'direction',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'field' => true,
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'search',
                        'orig' => 'search',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}/messages/{messageId}',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'messages',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'messages',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                      'messageId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'id',
                        'orig' => 'messageId',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.agent',
              ],
            ],
          ],
        ],
        'teammate' => [
          'fields' => [
            [
              'name' => 'addresses',
              'title' => 'Addresses',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Where to reach them: the agent\'s primary address on each channel it has one on, or the member\'s email address and phone number',
            ],
            [
              'name' => 'email',
              'title' => 'Email',
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
              'short' => 'The agent\'s primary email address, or the member\'s',
            ],
            [
              'name' => 'icon',
              'title' => 'Icon',
              'type' => '`$ANY`',
              'req' => true,
              'short' => 'The agent\'s icon; null for members',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The agent\'s or member\'s id',
            ],
            [
              'name' => 'imageUrl',
              'title' => 'Image Url',
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
              'short' => 'The member\'s picture from their sign-in profile, or the avatar it makes them; null for agents',
            ],
            [
              'name' => 'kind',
              'title' => 'Kind',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'listening',
              'title' => 'Listening',
              'type' => [
                '`$ONE`',
                [
                  '`$BOOLEAN`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
              'short' => 'Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
            ],
            [
              'name' => 'phone',
              'title' => 'Phone',
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
              'short' => 'The agent\'s primary phone number, or the one a member added to their profile',
            ],
            [
              'name' => 'role',
              'title' => 'Role',
              'type' => '`$ANY`',
              'req' => true,
              'short' => 'The member\'s role in the workspace; null for agents',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'teammate',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/team',
                  'segments' => [
                    [
                      'lit' => 'team',
                    ],
                  ],
                  'parts' => [
                    'team',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'token' => [
          'fields' => [
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'date-time',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'uuid',
            ],
            [
              'name' => 'lastUsedAt',
              'title' => 'Last Used At',
              'type' => '`$ANY`',
              'req' => true,
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'token',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}/tokens',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'tokens',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'tokens',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/agents/{id}/tokens/{tokenId}',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'tokens',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'tokens',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                      'tokenId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'id',
                        'orig' => 'tokenId',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.agent',
              ],
            ],
          ],
        ],
        'webhook' => [
          'fields' => [
            [
              'name' => 'attempts',
              'title' => 'Attempts',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'How many times the event Artil is retrying has failed',
            ],
            [
              'name' => 'bearerToken',
              'title' => 'Bearer Token',
              'type' => '`$STRING`',
              'short' => 'A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task\'s API trigger.',
            ],
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'date-time',
            ],
            [
              'name' => 'deliveredAt',
              'title' => 'Delivered At',
              'type' => '`$ANY`',
              'req' => true,
            ],
            [
              'name' => 'error',
              'title' => 'Error',
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'req' => true,
              'short' => 'Why the last delivery failed',
            ],
            [
              'name' => 'erroredAt',
              'title' => 'Errored At',
              'type' => '`$ANY`',
              'req' => true,
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'uuid',
            ],
            [
              'name' => 'retryAt',
              'title' => 'Retry At',
              'type' => '`$ANY`',
              'req' => true,
              'short' => 'When Artil next retries a failed event',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Where Artil posts the agent\'s events',
              'format' => 'uri',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'webhook',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/agents/{id}/webhooks',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'webhooks',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'webhooks',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agents/{id}/webhooks',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'webhooks',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'webhooks',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/agents/{id}/webhooks/{webhookId}',
                  'segments' => [
                    [
                      'lit' => 'agents',
                    ],
                    [
                      'var' => 'agent_id',
                    ],
                    [
                      'lit' => 'webhooks',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'agents',
                    '{agent_id}',
                    'webhooks',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'agent_id',
                      'webhookId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'agent_id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'id',
                        'orig' => 'webhookId',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agent_id',
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.agent',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    /**
     * The sekreto plugin DEFINITIONS the model selected per feature, from
     * the files the catalogue's active `plugin.def` entries declare.
     * Handed to each feature (secrets builds its Sekreto with them): a
     * provider kind not listed here is unknown to this SDK.
     *
     * A method rather than a constant: a definition holds closures, and PHP
     * has no constant that can. The requires are INSIDE it, so a plugin
     * file is read only when a feature asks for its definitions.
     */
    public static function feature_plugins(string $name): array
    {
        return [];
    }

    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ArtilFeatures::make_feature($name);
    }
}
