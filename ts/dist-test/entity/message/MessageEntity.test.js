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
(0, node_test_1.describe)('MessageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ARTIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ARTIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ArtilSDK.test();
        const ent = testsdk.Message();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ArtilSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Message().list({ "agent_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ARTIL_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'message.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "addressId": { "a": true, "fo": "uuid", "h": "Address Id", "n": "addressId", "r": true, "sh": "The agent's address the message came to or went from; all zeros on url, where the agent's id is its address", "t": "`$STRING`", "key$": "addressId", "index$": 0 }, "admission": { "a": true, "h": "Admission", "n": "admission", "r": true, "sh": "Who the sender of a received message is to the agent: `team` for a member or agent of the workspace, `listed` for a sender on the channel's list, and `anyone` for everyone else, including senders who could not be verified", "t": "`$ANY`", "key$": "admission", "index$": 1 }, "attachments": { "a": true, "h": "Attachments", "n": "attachments", "op": { "create": { "req": false, "type": "`$ARRAY`" } }, "r": true, "t": "`$ARRAY`", "key$": "attachments", "index$": 2 }, "author": { "a": true, "h": "Author", "n": "author", "r": true, "sh": "Who wrote an inbound message in a group, such as a Telegram user id or the email of someone in a Slack channel", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "author", "index$": 3 }, "authorName": { "a": true, "h": "Author Name", "n": "authorName", "r": true, "sh": "The name the author goes by, when the channel tells it", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "authorName", "index$": 4 }, "cc": { "a": true, "h": "Cc", "n": "cc", "op": { "create": { "req": false, "type": "`$ARRAY`" } }, "r": true, "sh": "Whom the message names as getting a copy", "t": "`$ARRAY`", "key$": "cc", "index$": 5 }, "channel": { "a": true, "h": "Channel", "n": "channel", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "The channel's kind, from listChannels", "t": "`$STRING`", "key$": "channel", "index$": 6 }, "client": { "a": true, "h": "Client", "n": "client", "r": false, "sh": "On url, the client you send from, like Codex, which the agent sees beside your name.", "t": "`$STRING`", "key$": "client", "index$": 7 }, "counterpart": { "a": true, "h": "Counterpart", "n": "counterpart", "r": true, "sh": "Who sent an inbound message, or the group it came in, or the recipients of an outbound one", "t": "`$STRING`", "key$": "counterpart", "index$": 8 }, "counterpartName": { "a": true, "h": "Counterpart Name", "n": "counterpartName", "r": true, "sh": "The name an inbound message's sender or group goes by, when the channel tells it", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "counterpartName", "index$": 9 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": true, "t": "`$STRING`", "key$": "createdAt", "index$": 10 }, "direction": { "a": true, "h": "Direction", "n": "direction", "r": true, "t": "`$STRING`", "key$": "direction", "index$": 11 }, "error": { "a": true, "h": "Error", "n": "error", "r": true, "sh": "Why a failed message was not sent or did not arrive", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "error", "index$": 12 }, "forward": { "a": true, "fo": "uuid", "h": "Forward", "n": "forward", "r": false, "t": "`$STRING`", "key$": "forward", "index$": 13 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 14 }, "refusal": { "a": true, "h": "Refusal", "n": "refusal", "r": true, "sh": "Why a refused message did not wake the agent", "t": "`$ANY`", "key$": "refusal", "index$": 15 }, "replyTo": { "a": true, "fo": "uuid", "h": "Reply To", "n": "replyTo", "r": false, "t": "`$STRING`", "key$": "replyTo", "index$": 16 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "`reported` when the recipient marked an email the agent sent as spam", "t": "`$STRING`", "key$": "status", "index$": 17 }, "subject": { "a": true, "h": "Subject", "n": "subject", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "subject", "index$": 18 }, "text": { "a": true, "h": "Text", "n": "text", "r": true, "t": "`$STRING`", "key$": "text", "index$": 19 }, "thread": { "a": true, "h": "Thread", "n": "thread", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "For received and imported email, its Message-ID and References; for email the agent sent, those of the email it answered", "t": "`$ANY`", "key$": "thread", "index$": 20 }, "to": { "a": true, "h": "To", "n": "to", "op": { "create": { "req": false, "type": "`$ARRAY`" } }, "r": true, "sh": "Whom the message names as its recipients; an inbound one names the agent unless it got a blind copy", "t": "`$ARRAY`", "key$": "to", "index$": 21 } }, "id": { "field": "id", "name": "id" }, "name": "message", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["attachments", "cc", "channel", "client", "forward", "replyTo", "subject", "text", "thread", "to"], "co": { "id": "POST /agents/{id}/messages", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/agents/{id}/messages", "q": { "exist": ["agent_id"] }, "r": { "param": { "id": "agent_id" } }, "rb": { "alternatives": [{ "fields": [{ "name": "draft" }, { "name": "file" }], "kind": "multipart", "media": "multipart/form-data" }], "kind": "json", "media": "application/json" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "agents" }, { "var": "agent_id" }, { "lit": "messages" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /agents/{id}/messages", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "before", "or": "before", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "channel", "or": "channel", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "counterpart", "or": "counterpart", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "direction", "or": "direction", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "search", "or": "search", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/agents/{id}/messages", "q": { "exist": ["agent_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "agents" }, { "var": "agent_id" }, { "lit": "messages" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /agents/{id}/messages/{messageId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "messageId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/agents/{id}/messages/{messageId}", "q": { "exist": ["agent_id", "id"] }, "r": { "param": { "id": "agent_id", "messageId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "agents" }, { "var": "agent_id" }, { "lit": "messages" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.agent"]] }, "key$": "message", "name__orig": "message", "Name": "Message", "name_": "message", "name-": "message", "NAME": "MESSAGE", "index$": 11 }, { "active": true, "entity": "message", "key$": "BasicMessageFlow", "kind": "basic", "name": "BasicMessageFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "message_ref01" }, "m": { "agent_id": "agent01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "agent_id": "agent01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "message_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "message_ref01", "srcdatavar": "message_ref01_data", "suffix": "_dt0" }, "m": { "agent_id": "agent01", "id": "message01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-message_ref01" } }], "index$": 2, "route": "GET /agents/{id}/messages/{messageId}", "record": {} }] }, 'Message', { "POST /agents/{id}/messages": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "replyTo": { "type": "string", "format": "uuid", "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$", "key$": "replyTo" }, "forward": { "type": "string", "format": "uuid", "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$", "key$": "forward" }, "channel": { "description": "The channel to start a conversation on, by its kind, from listChannels", "type": "string", "key$": "channel" }, "to": { "minItems": 1, "maxItems": 10, "type": "array", "items": { "type": "string", "minLength": 1, "maxLength": 320 }, "key$": "to" }, "cc": { "maxItems": 50, "type": "array", "items": { "type": "string", "minLength": 1, "maxLength": 320 }, "key$": "cc" }, "subject": { "type": "string", "maxLength": 240, "key$": "subject" }, "text": { "type": "string", "minLength": 1, "maxLength": 32000, "key$": "text" }, "attachments": { "maxItems": 10, "type": "array", "items": { "anyOf": [{ "type": "object", "properties": {}, "required": [], "description": "A file from a message the agent received or sent, by the id in its attachments" }, { "type": "object", "properties": {}, "required": [], "description": "A text file written for this message" }] }, "key$": "attachments" }, "thread": { "description": "The thread of your client you send from, which an answer to the message wakes", "type": "string", "minLength": 1, "maxLength": 128, "pattern": "^[^\\p{Cc}\\p{Cf}]+$", "key$": "thread" }, "client": { "description": "On url, the client you send from, like Codex, which the agent sees beside your name. Without it, Artil names the client your token was made for", "type": "string", "minLength": 1, "maxLength": 64, "pattern": "^[^\\p{Cc}\\p{Cf}]+$", "key$": "client" } }, "required": ["text"] } }, "multipart/form-data": { "schema": { "type": "object", "properties": { "draft": { "type": "string", "description": "The message as JSON, with the fields of a JSON request" }, "file": { "description": "The files to send, one part each", "anyOf": [{ "type": "string", "format": "binary", "contentEncoding": "binary" }, { "maxItems": 10, "type": "array", "items": { "type": "string", "format": "binary", "contentEncoding": "binary" } }] } }, "required": ["draft"] } } } }, "parameters": [{ "in": "path", "name": "id", "required": true, "description": "The agent's id", "schema": { "type": "string" }, "index$": 0 }, { "in": "header", "name": "Idempotency-Key", "description": "A key of your choice, unique to this message. Sending again with the same key returns the message the first request sent instead of sending it twice, so a retry after a timeout is safe.", "schema": { "type": "string", "minLength": 1, "maxLength": 255 }, "index$": 1 }] }, "GET /agents/{id}/messages": { "protocol": "http", "parameters": [{ "in": "path", "name": "id", "required": true, "description": "The agent's id", "schema": { "type": "string" }, "index$": 0 }, { "in": "query", "name": "channel", "schema": { "type": "string" }, "description": "The channel's kind, from listChannels", "index$": 1 }, { "in": "query", "name": "direction", "schema": { "type": "string", "enum": ["inbound", "outbound"] }, "index$": 2 }, { "in": "query", "name": "limit", "schema": { "type": "integer", "minimum": 1, "maximum": 50 }, "index$": 3 }, { "in": "query", "name": "counterpart", "schema": { "type": "string", "minLength": 1, "maxLength": 320 }, "description": "Keep the messages from or to this address or number", "index$": 4 }, { "in": "query", "name": "before", "schema": { "type": "string", "format": "uuid", "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$" }, "description": "List the messages older than this one, to page back", "index$": 5 }, { "in": "query", "name": "search", "schema": { "type": "string", "minLength": 1, "maxLength": 200 }, "description": "Find the messages that hold these words, best match first. Only self-hosted Artil Connect servers search for now, and Artil Cloud answers forbidden", "index$": 6 }] }, "GET /agents/{id}/messages/{messageId}": { "protocol": "http", "parameters": [{ "in": "path", "name": "id", "required": true, "description": "The agent's id", "schema": { "type": "string" }, "index$": 0 }, { "schema": { "type": "string" }, "in": "path", "name": "messageId", "required": true, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "message.create.0": "GET-only live run: needs POST /agents/{id}/messages" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const message_ref01_ent = client.Message();
        let message_ref01_data = setup.data.new.message['message_ref01'];
        message_ref01_data['agent_id'] = setup.idmap['agent01'];
        message_ref01_data = (await message_ref01_ent.create(message_ref01_data)).data();
        (0, node_assert_1.default)(null != message_ref01_data.id);
        // LIST
        const message_ref01_match = {};
        message_ref01_match['agent_id'] = setup.idmap['agent01'];
        const message_ref01_list = (await message_ref01_ent.list(message_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(message_ref01_list, { id: message_ref01_data.id })));
        // LOAD
        const message_ref01_match_dt0 = {};
        message_ref01_match_dt0.id = message_ref01_data.id;
        message_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01'];
        const message_ref01_data_dt0 = (await message_ref01_ent.load(message_ref01_match_dt0)).data();
        (0, node_assert_1.default)(message_ref01_data_dt0.id === message_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/message/MessageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ArtilSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['message01', 'message02', 'message03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ARTIL_TEST_MESSAGE_ENTID': idmap,
        'ARTIL_TEST_LIVE': 'FALSE',
        'ARTIL_TEST_EXPLAIN': 'FALSE',
        'ARTIL_APIKEY': '',
    });
    idmap = env['ARTIL_TEST_MESSAGE_ENTID'];
    const live = 'TRUE' === env.ARTIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ARTIL_TEST_MESSAGE_ENTID'];
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
//# sourceMappingURL=MessageEntity.test.js.map