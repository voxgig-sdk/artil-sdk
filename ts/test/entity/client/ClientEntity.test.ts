

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


describe('ClientEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ARTIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('ARTIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ArtilSDK.test()
    const ent = testsdk.Client()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ArtilSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Client().list({"agent_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ARTIL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'client.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"t":"`$STRING`","key$":"createdAt","index$":0},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"sh":"The credential identifying this client","t":"`$STRING`","key$":"id","index$":1},"lastUsedAt":{"a":true,"h":"Last Used At","n":"lastUsedAt","r":true,"t":"`$ANY`","key$":"lastUsedAt","index$":2},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The recorded client or device name, or the name of a manually created token","t":"`$STRING`","key$":"name","index$":3}},"id":{"field":"id","name":"id"},"name":"client","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /agents/{id}/clients","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/agents/{id}/clients","q":{"exist":["agent_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agents"},{"var":"agent_id"},{"lit":"clients"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.agent"]]},"key$":"client","name__orig":"client","Name":"Client","name_":"client","name-":"client","NAME":"CLIENT","index$":5}, {"active":true,"entity":"client","key$":"BasicClientFlow","kind":"basic","name":"BasicClientFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"agent_id":"agent01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"client_ref01"}}],"index$":0}]}, 'Client', {"GET /agents/{id}/clients":{"protocol":"http","parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let client_ref01_data = Object.values(setup.data.existing.client)[0] as any

    // LIST
    const client_ref01_ent = client.Client()
    const client_ref01_match: any = {}
    client_ref01_match['agent_id'] = setup.idmap['agent01']

    const client_ref01_list = (await client_ref01_ent.list(client_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/client/ClientTestData.json')

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
    ['client01','client02','client03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ARTIL_TEST_CLIENT_ENTID': idmap,
    'ARTIL_TEST_LIVE': 'FALSE',
    'ARTIL_TEST_EXPLAIN': 'FALSE',
    'ARTIL_APIKEY': '',
  })

  idmap = env['ARTIL_TEST_CLIENT_ENTID']

  const live = 'TRUE' === env.ARTIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ARTIL_TEST_CLIENT_ENTID']
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
  
