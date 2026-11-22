

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


describe('AgentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ARTIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('ARTIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ArtilSDK.test()
    const ent = testsdk.Agent()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('agent hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ArtilSDK.test(offline).Agent().stream('list')) { }
    }, /offline/)

    for await (const _item of ArtilSDK.test(offline).Agent()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ArtilSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Agent().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ArtilSDK.test().Agent().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ArtilSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Agent().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Agent().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ArtilSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Agent().list({"createdAt":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ARTIL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"t":"`$STRING`","key$":"createdAt","index$":0},"icon":{"a":true,"h":"Icon","n":"icon","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"icon","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":3}},"id":{"field":"id","name":"id"},"name":"agent","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["icon","name"],"co":{"id":"POST /agents","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/agents","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agents"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /agents","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/agents","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agents"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /agents/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/agents/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agents"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /agents/{id}/access","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/agents/{id}/access","q":{"$action":"access","exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agents"},{"var":"id"},{"lit":"access"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /agents/{id}/connection","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/agents/{id}/connection","q":{"$action":"connection","exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agents"},{"var":"id"},{"lit":"connection"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /agents/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/agents/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"agents"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["icon","name"],"co":{"id":"PATCH /agents/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/agents/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agents"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"agent","name__orig":"agent","Name":"Agent","name_":"agent","name-":"agent","NAME":"AGENT","index$":3}, {"active":true,"entity":"agent","key$":"BasicAgentFlow","kind":"basic","name":"BasicAgentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"agent_ref01","srcdatavar":"agent_ref01_data","suffix":"_up0","textfield":"createdAt"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"agent_ref01","srcdatavar":"agent_ref01_data","suffix":"_dt0"},"m":{"id":"agent01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_ref01"}}],"index$":3,"route":"GET /agents/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"agent_ref01","suffix":"_rm0"},"m":{"id":"agent01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"agent_ref01"}}],"index$":5}]}, 'Agent', {"POST /agents":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"maxLength":80,"key$":"name"},"icon":{"default":"bot","type":"string","enum":["bot","sparkles","bug","message-square","headphones","search","file-text","mail","calendar","chart-line","code","git-pull-request","database","shield","megaphone","rocket","wrench","zap"],"key$":"icon"}},"required":["name"]}}}},"parameters":[]},"GET /agents":{"protocol":"http","parameters":[]},"GET /agents/{id}":{"protocol":"http","parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0}]},"GET /agents/{id}/access":{"protocol":"http","parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0}]},"GET /agents/{id}/connection":{"protocol":"http","parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0}]},"DELETE /agents/{id}":{"protocol":"http","parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0}]},"PATCH /agents/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"maxLength":80,"key$":"name"},"icon":{"type":"string","enum":["bot","sparkles","bug","message-square","headphones","search","file-text","mail","calendar","chart-line","code","git-pull-request","database","shield","megaphone","rocket","wrench","zap"],"key$":"icon"}}}}}},"parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent.create.0":"GET-only live run: needs POST /agents","agent.update.2":"GET-only live run: needs PATCH /agents/{id}","agent.remove.4":"GET-only live run: needs DELETE /agents/{id}","agent.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_ref01_ent = client.Agent()
    let agent_ref01_data = setup.data.new.agent['agent_ref01']

    agent_ref01_data = (await agent_ref01_ent.create(agent_ref01_data)).data()
    assert(null != agent_ref01_data.id)


    // LIST
    const agent_ref01_match: any = {}

    const agent_ref01_list = (await agent_ref01_ent.list(agent_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(agent_ref01_list, { id: agent_ref01_data.id })))


    // UPDATE
    const agent_ref01_data_up0: any = {}
    agent_ref01_data_up0.id = agent_ref01_data.id

    const agent_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-agent_ref01_' + setup.now }
    ;(agent_ref01_data_up0 as any)[agent_ref01_markdef_up0.name] = agent_ref01_markdef_up0.value

    const agent_ref01_resdata_up0 = (await agent_ref01_ent.update(agent_ref01_data_up0)).data()
    assert(agent_ref01_resdata_up0.id === agent_ref01_data_up0.id)

    assert((agent_ref01_resdata_up0 as any)[agent_ref01_markdef_up0.name] === agent_ref01_markdef_up0.value)


    // LOAD
    const agent_ref01_match_dt0: any = {}
    agent_ref01_match_dt0.id = agent_ref01_data.id
    const agent_ref01_data_dt0 = (await agent_ref01_ent.load(agent_ref01_match_dt0)).data()
    assert(agent_ref01_data_dt0.id === agent_ref01_data.id)


    // REMOVE
    const agent_ref01_match_rm0: any = { id: agent_ref01_data.id }
    await agent_ref01_ent.remove(agent_ref01_match_rm0)
  

    // LIST
    const agent_ref01_match_rt0: any = {}

    const agent_ref01_list_rt0 = (await agent_ref01_ent.list(agent_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(agent_ref01_list_rt0, { id: agent_ref01_data.id })))


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
      '../../../../.sdk/test/entity/agent/AgentTestData.json')

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
    ['agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ARTIL_TEST_AGENT_ENTID': idmap,
    'ARTIL_TEST_LIVE': 'FALSE',
    'ARTIL_TEST_EXPLAIN': 'FALSE',
    'ARTIL_APIKEY': '',
  })

  idmap = env['ARTIL_TEST_AGENT_ENTID']

  const live = 'TRUE' === env.ARTIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ARTIL_TEST_AGENT_ENTID']
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
  
