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
(0, node_test_1.describe)('ConnectionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ARTIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ARTIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ArtilSDK.test();
        const ent = testsdk.Connection();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ArtilSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Connection().update({ "agent_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ARTIL_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'connection.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "client": { "a": true, "h": "Client", "n": "client", "r": true, "t": "`$STRING`", "key$": "client", "index$": 0 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 1 }, "machine": { "a": true, "h": "Machine", "n": "machine", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "machine", "index$": 2 }, "tokenId": { "a": true, "fo": "uuid", "h": "Token Id", "n": "tokenId", "r": true, "sh": "The agent's token the client connected with", "t": "`$STRING`", "key$": "tokenId", "index$": 3 } }, "id": { "field": "id", "name": "id" }, "name": "connection", "op": { "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["client", "machine"], "co": { "id": "PUT /agents/{id}/connection", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/agents/{id}/connection", "q": { "exist": ["agent_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "agents" }, { "var": "agent_id" }, { "lit": "connection" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.agent"]] }, "key$": "connection", "name__orig": "connection", "Name": "Connection", "name_": "connection", "name-": "connection", "NAME": "CONNECTION", "index$": 6 }, { "active": true, "entity": "connection", "key$": "BasicConnectionFlow", "kind": "basic", "name": "BasicConnectionFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "connection_ref01", "srcdatavar": "connection_ref01_data", "suffix": "_up0", "textfield": "client" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-connection_ref01" } }], "v": [], "unreachable": true }] }, 'Connection', { "PUT /agents/{id}/connection": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "client": { "type": "string", "minLength": 1, "maxLength": 80, "pattern": "^[^\\p{Cc}\\p{Cf}]+$", "key$": "client" }, "machine": { "type": "string", "minLength": 1, "maxLength": 64, "pattern": "^[^\\p{Cc}\\p{Cf}]+$", "key$": "machine" } }, "required": ["client"] } } } }, "parameters": [{ "in": "path", "name": "id", "required": true, "description": "The agent's id", "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "connection.update.0": "GET-only live run: needs PUT /agents/{id}/connection" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let connection_ref01_data = Object.values(setup.data.existing.connection)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/connection/ConnectionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ArtilSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['connection01', 'connection02', 'connection03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ARTIL_TEST_CONNECTION_ENTID': idmap,
        'ARTIL_TEST_LIVE': 'FALSE',
        'ARTIL_TEST_EXPLAIN': 'FALSE',
        'ARTIL_APIKEY': '',
    });
    idmap = env['ARTIL_TEST_CONNECTION_ENTID'];
    const live = 'TRUE' === env.ARTIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ARTIL_TEST_CONNECTION_ENTID'];
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
//# sourceMappingURL=ConnectionEntity.test.js.map