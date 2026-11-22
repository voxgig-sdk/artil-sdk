

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ArtilSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('EventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ARTIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('ARTIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ArtilSDK.test()
    const ent = testsdk.Event()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ArtilSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Event().list({"agent_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ARTIL_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'event.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachments":{"a":true,"h":"Attachments","n":"attachments","r":false,"sh":"The files that came with a message Artil keeps no copy of","t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"key$":"attachments","index$":0},"channel":{"a":true,"h":"Channel","n":"channel","r":true,"t":"`$STRING`","key$":"channel","index$":1},"client":{"a":true,"h":"Client","n":"client","r":false,"sh":"The client you send from, like Codex, which the agent sees beside your name.","t":"`$STRING`","key$":"client","index$":2},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"t":"`$STRING`","key$":"createdAt","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":4},"messageId":{"a":true,"fo":"uuid","h":"Message Id","n":"messageId","r":true,"sh":"The message's id, to read it with","t":"`$STRING`","key$":"messageId","index$":5},"sender":{"a":true,"h":"Sender","n":"sender","r":true,"t":"`$OBJECT`","key$":"sender","index$":6},"text":{"a":true,"h":"Text","n":"text","r":false,"sh":"The text of a message Artil keeps no copy of, which comes whole","t":"`$STRING`","key$":"text","index$":7},"thread":{"a":true,"h":"Thread","n":"thread","r":false,"sh":"The thread of your client you send from, so the agent can answer there.","t":"`$STRING`","key$":"thread","index$":8},"toThread":{"a":true,"h":"To Thread","n":"toThread","op":{"list":{"req":true,"type":["`$ONE`",["`$STRING`","`$NULL`"]]}},"r":false,"sh":"The thread of the agent's client to hand the message to, from a message it sent","t":"`$STRING`","key$":"toThread","index$":9},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":10}},"id":{"field":"id","name":"id"},"name":"event","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["attachments","client","text","thread","toThread"],"co":{"id":"POST /agents/{id}/url","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/agents/{id}/url","q":{"exist":["agent_id"]},"r":{"param":{"id":"agent_id"}},"rb":{"alternatives":[{"fields":[{"name":"draft"},{"name":"file"}],"kind":"multipart","media":"multipart/form-data"}],"kind":"json","media":"application/json"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agents"},{"var":"agent_id"},{"lit":"url"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /agents/{id}/events","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"after","or":"after","r":false,"style":"form","t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/agents/{id}/events","q":{"exist":["agent_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agents"},{"var":"agent_id"},{"lit":"events"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /agents/{id}/events/stream","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"last_event_id","or":"Last-Event-ID","r":false,"style":"simple","t":"`$INTEGER`","index$":0}],"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"after","or":"after","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"connection","or":"connection","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/agents/{id}/events/stream","q":{"$action":"stream","exist":["agent_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"raw","media":"text/event-stream"},"s":[{"lit":"agents"},{"var":"agent_id"},{"lit":"events"},{"lit":"stream"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.agent"]]},"key$":"event","name__orig":"event","Name":"Event","name_":"event","name-":"event","NAME":"EVENT","index$":7}, {"active":true,"entity":"event","key$":"BasicEventFlow","kind":"basic","name":"BasicEventFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"event_ref01"},"m":{"agent_id":"agent01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"agent_id":"agent01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"event_ref01"}}],"index$":1},{"a":false,"d":{},"i":{"ref":"event_ref01","srcdatavar":"event_ref01_data","suffix":"_dt0"},"m":{"id":"event01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-event_ref01"}}],"unreachable":true}]}, 'Event', {"POST /agents/{id}/url":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"text":{"type":"string","maxLength":2000,"key$":"text"},"thread":{"description":"The thread of your client you send from, so the agent can answer there. With it, an agent may write to its own Message URL from one thread for another","type":"string","minLength":1,"maxLength":128,"pattern":"^[^\\p{Cc}\\p{Cf}]+$","key$":"thread"},"toThread":{"description":"The thread of the agent's client to hand the message to, from a message it sent","type":"string","minLength":1,"maxLength":128,"pattern":"^[^\\p{Cc}\\p{Cf}]+$","key$":"toThread"},"client":{"description":"The client you send from, like Codex, which the agent sees beside your name. Without it, Artil names the client your token was made for","type":"string","minLength":1,"maxLength":64,"pattern":"^[^\\p{Cc}\\p{Cf}]+$","key$":"client"},"attachments":{"maxItems":10,"type":"array","items":{"anyOf":[{"type":"object","properties":{},"required":[],"description":"A file from a message the agent received or sent, by the id in its attachments"},{"type":"object","properties":{},"required":[],"description":"A text file written for this message"}]},"key$":"attachments"}}}},"multipart/form-data":{"schema":{"type":"object","properties":{"draft":{"type":"string","description":"The message as JSON, with the fields of a JSON request"},"file":{"description":"The files to send, one part each","anyOf":[{"type":"string","format":"binary","contentEncoding":"binary"},{"maxItems":10,"type":"array","items":{"type":"string","format":"binary","contentEncoding":"binary"}}]}},"required":["draft"]}}}},"parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0}]},"GET /agents/{id}/events":{"protocol":"http","parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0},{"in":"query","name":"after","schema":{"type":"integer","minimum":0,"maximum":9007199254740991},"index$":1}]},"GET /agents/{id}/events/stream":{"protocol":"http","parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0},{"in":"header","name":"Last-Event-ID","schema":{"type":"integer"},"index$":1},{"in":"query","name":"after","schema":{"type":"integer","minimum":0,"maximum":9007199254740991},"index$":2},{"in":"query","name":"connection","schema":{"type":"string","format":"uuid","pattern":"^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"event.create.0":"GET-only live run: needs POST /agents/{id}/url"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const event_ref01_ent = client.Event()
    let event_ref01_data = setup.data.new.event['event_ref01']
    event_ref01_data['agent_id'] = setup.idmap['agent01']

    event_ref01_data = (await event_ref01_ent.create(event_ref01_data)).data()
    assert(null != event_ref01_data.id)


    // LIST
    const event_ref01_match: any = {}
    event_ref01_match['agent_id'] = setup.idmap['agent01']

    const event_ref01_list = (await event_ref01_ent.list(event_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(event_ref01_list, { id: event_ref01_data.id })))


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/event/EventTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ArtilSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['event01','event02','event03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ARTIL_TEST_EVENT_ENTID': idmap,
    'ARTIL_TEST_LIVE': 'FALSE',
    'ARTIL_TEST_EXPLAIN': 'FALSE',
    'ARTIL_APIKEY': '',
  })

  idmap = env['ARTIL_TEST_EVENT_ENTID']

  const live = 'TRUE' === env.ARTIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ARTIL_TEST_EVENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ArtilSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
