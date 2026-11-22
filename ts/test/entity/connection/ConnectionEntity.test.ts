

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


describe('ConnectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ARTIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('ARTIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ArtilSDK.test()
    const ent = testsdk.Connection()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ArtilSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Connection().update({"agent_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ARTIL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'connection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"client":{"a":true,"h":"Client","n":"client","r":true,"t":"`$STRING`","key$":"client","index$":0},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":1},"machine":{"a":true,"h":"Machine","n":"machine","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"machine","index$":2},"tokenId":{"a":true,"fo":"uuid","h":"Token Id","n":"tokenId","r":true,"sh":"The agent's token the client connected with","t":"`$STRING`","key$":"tokenId","index$":3}},"id":{"field":"id","name":"id"},"name":"connection","op":{"update":{"input":"data","name":"update","points":[{"a":true,"bf":["client","machine"],"co":{"id":"PUT /agents/{id}/connection","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/agents/{id}/connection","q":{"exist":["agent_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agents"},{"var":"agent_id"},{"lit":"connection"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.agent"]]},"key$":"connection","name__orig":"connection","Name":"Connection","name_":"connection","name-":"connection","NAME":"CONNECTION","index$":6}, {"active":true,"entity":"connection","key$":"BasicConnectionFlow","kind":"basic","name":"BasicConnectionFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"connection_ref01","srcdatavar":"connection_ref01_data","suffix":"_up0","textfield":"client"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-connection_ref01"}}],"v":[],"unreachable":true}]}, 'Connection', {"PUT /agents/{id}/connection":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"client":{"type":"string","minLength":1,"maxLength":80,"pattern":"^[^\\p{Cc}\\p{Cf}]+$","key$":"client"},"machine":{"type":"string","minLength":1,"maxLength":64,"pattern":"^[^\\p{Cc}\\p{Cf}]+$","key$":"machine"}},"required":["client"]}}}},"parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"connection.update.0":"GET-only live run: needs PUT /agents/{id}/connection"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let connection_ref01_data = Object.values(setup.data.existing.connection)[0] as any

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
      '../../../../.sdk/test/entity/connection/ConnectionTestData.json')

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
    ['connection01','connection02','connection03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ARTIL_TEST_CONNECTION_ENTID': idmap,
    'ARTIL_TEST_LIVE': 'FALSE',
    'ARTIL_TEST_EXPLAIN': 'FALSE',
    'ARTIL_APIKEY': '',
  })

  idmap = env['ARTIL_TEST_CONNECTION_ENTID']

  const live = 'TRUE' === env.ARTIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ARTIL_TEST_CONNECTION_ENTID']
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
  
