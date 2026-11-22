"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('AddressEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ARTIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ARTIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ArtilSDK.test();
        const ent = testsdk.Address();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ArtilSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Address().list({ "agent_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ARTIL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'address.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "channel": { "a": true, "h": "Channel", "n": "channel", "r": true, "t": "`$STRING`", "key$": "channel", "index$": 0 }, "code": { "a": true, "h": "Code", "n": "code", "r": false, "sh": "The code the provider's consent page sent the member back with, beside setup", "t": "`$STRING`", "key$": "code", "index$": 1 }, "country": { "a": true, "h": "Country", "n": "country", "r": false, "sh": "The ISO country of the phone number; the first one the server sells by default", "t": "`$STRING`", "key$": "country", "index$": 2 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": true, "t": "`$STRING`", "key$": "createdAt", "index$": 3 }, "domainId": { "a": true, "h": "Domain Id", "n": "domainId", "r": true, "sh": "The workspace's own domain the address is on", "t": "`$ANY`", "key$": "domainId", "index$": 4 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "What people know the address by when its value is an id, like a Slack bot's @name", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "name", "index$": 6 }, "primary": { "a": true, "h": "Primary", "n": "primary", "r": true, "sh": "Whether new messages on its channel go out from it", "t": "`$BOOLEAN`", "key$": "primary", "index$": 7 }, "registering": { "a": true, "h": "Registering", "n": "registering", "r": false, "sh": "Whether US carriers are still registering the phone number, which sends nothing until they have", "t": "`$BOOLEAN`", "key$": "registering", "index$": 8 }, "setup": { "a": true, "fo": "uuid", "h": "Setup", "n": "setup", "r": false, "sh": "The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token", "t": "`$STRING`", "key$": "setup", "index$": 9 }, "token": { "a": true, "h": "Token", "n": "token", "r": false, "sh": "What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between", "t": "`$STRING`", "key$": "token", "index$": 10 }, "value": { "a": true, "fo": "email", "h": "Value", "n": "value", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "The email address, phone number, Telegram bot's @username, or Slack bot's workspace and member ids", "t": "`$STRING`", "key$": "value", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "address", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /agents/{id}/addresses/{addressId}/primary", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "addressId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/agents/{id}/addresses/{addressId}/primary", "q": { "$action": "primary", "exist": ["agent_id", "id"] }, "r": { "param": { "addressId": "id", "id": "agent_id" } }, "s": [{ "lit": "agents" }, { "var": "agent_id" }, { "lit": "addresses" }, { "var": "id" }, { "lit": "primary" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["channel", "code", "country", "setup", "token", "value"], "co": { "id": "POST /agents/{id}/addresses", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/agents/{id}/addresses", "q": { "exist": ["agent_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "agents" }, { "var": "agent_id" }, { "lit": "addresses" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /agents/{id}/addresses", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/agents/{id}/addresses", "q": { "exist": ["agent_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "agents" }, { "var": "agent_id" }, { "lit": "addresses" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /agents/{id}/addresses/{addressId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "addressId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/agents/{id}/addresses/{addressId}", "q": { "exist": ["agent_id", "id"] }, "r": { "param": { "addressId": "id", "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "agents" }, { "var": "agent_id" }, { "lit": "addresses" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /agents/{id}/addresses/{addressId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "addressId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/agents/{id}/addresses/{addressId}", "q": { "exist": ["agent_id", "id"] }, "r": { "param": { "addressId": "id", "id": "agent_id" } }, "s": [{ "lit": "agents" }, { "var": "agent_id" }, { "lit": "addresses" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["value"], "co": { "id": "PATCH /agents/{id}/addresses/{addressId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "addressId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/agents/{id}/addresses/{addressId}", "q": { "exist": ["agent_id", "id"] }, "r": { "param": { "addressId": "id", "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "agents" }, { "var": "agent_id" }, { "lit": "addresses" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.agent"]] }, "key$": "address", "name__orig": "address", "Name": "Address", "name_": "address", "name-": "address", "NAME": "ADDRESS", "index$": 1 }, { "active": true, "entity": "address", "key$": "BasicAddressFlow", "kind": "basic", "name": "BasicAddressFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "address_ref01" }, "m": { "agent_id": "agent01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "agent_id": "agent01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "address_ref01" } }], "index$": 1 }, { "a": true, "d": { "agent_id": "agent01" }, "i": { "ref": "address_ref01", "srcdatavar": "address_ref01_data", "suffix": "_up0", "textfield": "channel" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-address_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "address_ref01", "srcdatavar": "address_ref01_data", "suffix": "_dt0" }, "m": { "agent_id": "agent01", "id": "address01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-address_ref01" } }], "index$": 3, "route": "GET /agents/{id}/addresses/{addressId}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "address_ref01", "suffix": "_rm0" }, "m": { "agent_id": "agent01", "id": "address01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "agent_id": "agent01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "address_ref01" } }], "index$": 5 }] }, 'Address', { "POST /agents/{id}/addresses/{addressId}/primary": { "protocol": "http", "parameters": [{ "in": "path", "name": "id", "required": true, "description": "The agent's id", "schema": { "type": "string" }, "index$": 0 }, { "schema": { "type": "string" }, "in": "path", "name": "addressId", "required": true, "index$": 1 }] }, "POST /agents/{id}/addresses": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "channel": { "type": "string", "enum": ["email", "sms", "telegram", "slack"], "key$": "channel" }, "value": { "type": "string", "format": "email", "pattern": "^(?:[A-Za-z0-9_'+\\-]+\\.)*[A-Za-z0-9_'+\\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$", "key$": "value" }, "country": { "description": "The ISO country of the phone number; the first one the server sells by default", "type": "string", "pattern": "^[A-Z]{2}$", "key$": "country" }, "token": { "description": "What connects an address the workspace already has: the token @BotFather gave a Telegram bot, or a Slack app's bot token and signing secret with a space between", "type": "string", "minLength": 1, "key$": "token" }, "setup": { "description": "The state a provider's consent page sent the member back with, for an app they installed from the link setUpAddress gave with token", "type": "string", "format": "uuid", "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$", "key$": "setup" }, "code": { "description": "The code the provider's consent page sent the member back with, beside setup", "type": "string", "minLength": 1, "key$": "code" } }, "required": ["channel"] } } } }, "parameters": [{ "in": "path", "name": "id", "required": true, "description": "The agent's id", "schema": { "type": "string" }, "index$": 0 }] }, "GET /agents/{id}/addresses": { "protocol": "http", "parameters": [{ "in": "path", "name": "id", "required": true, "description": "The agent's id", "schema": { "type": "string" }, "index$": 0 }] }, "GET /agents/{id}/addresses/{addressId}": { "protocol": "http", "parameters": [{ "in": "path", "name": "id", "required": true, "description": "The agent's id", "schema": { "type": "string" }, "index$": 0 }, { "schema": { "type": "string" }, "in": "path", "name": "addressId", "required": true, "index$": 1 }] }, "DELETE /agents/{id}/addresses/{addressId}": { "protocol": "http", "parameters": [{ "in": "path", "name": "id", "required": true, "description": "The agent's id", "schema": { "type": "string" }, "index$": 0 }, { "schema": { "type": "string" }, "in": "path", "name": "addressId", "required": true, "index$": 1 }] }, "PATCH /agents/{id}/addresses/{addressId}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "value": { "type": "string", "format": "email", "pattern": "^(?:[A-Za-z0-9_'+\\-]+\\.)*[A-Za-z0-9_'+\\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$", "key$": "value" } }, "required": ["value"] } } } }, "parameters": [{ "in": "path", "name": "id", "required": true, "description": "The agent's id", "schema": { "type": "string" }, "index$": 0 }, { "schema": { "type": "string" }, "in": "path", "name": "addressId", "required": true, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "address.create.0": "GET-only live run: needs POST /agents/{id}/addresses/{addressId}/primary", "address.update.2": "GET-only live run: needs PATCH /agents/{id}/addresses/{addressId}", "address.remove.4": "GET-only live run: needs DELETE /agents/{id}/addresses/{addressId}", "address.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const address_ref01_ent = client.Address();
        let address_ref01_data = setup.data.new.address['address_ref01'];
        address_ref01_data['agent_id'] = setup.idmap['agent01'];
        address_ref01_data = (await address_ref01_ent.create(address_ref01_data)).data();
        (0, node_assert_1.default)(null != address_ref01_data.id);
        // LIST
        const address_ref01_match = {};
        address_ref01_match['agent_id'] = setup.idmap['agent01'];
        const address_ref01_list = (await address_ref01_ent.list(address_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(address_ref01_list, { id: address_ref01_data.id })));
        // UPDATE
        const address_ref01_data_up0 = {};
        address_ref01_data_up0.id = address_ref01_data.id;
        address_ref01_data_up0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01'];
        const address_ref01_markdef_up0 = { name: 'channel', value: 'Mark01-address_ref01_' + setup.now };
        address_ref01_data_up0[address_ref01_markdef_up0.name] = address_ref01_markdef_up0.value;
        const address_ref01_resdata_up0 = (await address_ref01_ent.update(address_ref01_data_up0)).data();
        (0, node_assert_1.default)(address_ref01_resdata_up0.id === address_ref01_data_up0.id);
        (0, node_assert_1.default)(address_ref01_resdata_up0[address_ref01_markdef_up0.name] === address_ref01_markdef_up0.value);
        // LOAD
        const address_ref01_match_dt0 = {};
        address_ref01_match_dt0.id = address_ref01_data.id;
        address_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01'];
        const address_ref01_data_dt0 = (await address_ref01_ent.load(address_ref01_match_dt0)).data();
        (0, node_assert_1.default)(address_ref01_data_dt0.id === address_ref01_data.id);
        // REMOVE
        const address_ref01_match_rm0 = { id: address_ref01_data.id };
        address_ref01_match_rm0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01'];
        await address_ref01_ent.remove(address_ref01_match_rm0);
        // LIST
        const address_ref01_match_rt0 = {};
        address_ref01_match_rt0['agent_id'] = setup.idmap['agent01'];
        const address_ref01_list_rt0 = (await address_ref01_ent.list(address_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(address_ref01_list_rt0, { id: address_ref01_data.id })));
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/address/AddressTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ArtilSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['address01', 'address02', 'address03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ARTIL_TEST_ADDRESS_ENTID': idmap,
        'ARTIL_TEST_LIVE': 'FALSE',
        'ARTIL_TEST_EXPLAIN': 'FALSE',
        'ARTIL_APIKEY': '',
    });
    idmap = env['ARTIL_TEST_ADDRESS_ENTID'];
    const live = 'TRUE' === env.ARTIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ARTIL_TEST_ADDRESS_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ArtilSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.ARTIL_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ARTIL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=AddressEntity.test.js.map