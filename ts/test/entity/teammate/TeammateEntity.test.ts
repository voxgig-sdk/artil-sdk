

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


describe('TeammateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ARTIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('ARTIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ArtilSDK.test()
    const ent = testsdk.Teammate()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('teammate hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ArtilSDK.test(offline).Teammate().stream('list')) { }
    }, /offline/)

    for await (const _item of ArtilSDK.test(offline).Teammate()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ArtilSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Teammate().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ArtilSDK.test().Teammate().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ArtilSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Teammate().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Teammate().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ArtilSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Teammate().list({"email":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ARTIL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'teammate.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"addresses":{"a":true,"h":"Addresses","n":"addresses","r":true,"sh":"Where to reach them: the agent's primary address on each channel it has one on, or the member's email address and phone number","t":"`$ARRAY`","key$":"addresses","index$":0},"email":{"a":true,"h":"Email","n":"email","r":true,"sh":"The agent's primary email address, or the member's","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"email","index$":1},"icon":{"a":true,"h":"Icon","n":"icon","r":true,"sh":"The agent's icon; null for members","t":"`$ANY`","key$":"icon","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The agent's or member's id","t":"`$STRING`","key$":"id","index$":3},"imageUrl":{"a":true,"h":"Image Url","n":"imageUrl","r":true,"sh":"The member's picture from their sign-in profile, or the avatar it makes them; null for agents","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"imageUrl","index$":4},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":5},"listening":{"a":true,"h":"Listening","n":"listening","r":true,"sh":"Whether a client or webhook hears the agent now, so a message at its Message URL reaches it; null for members","t":["`$ONE`",["`$BOOLEAN`","`$NULL`"]],"key$":"listening","index$":6},"name":{"a":true,"h":"Name","n":"name","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"name","index$":7},"phone":{"a":true,"h":"Phone","n":"phone","r":true,"sh":"The agent's primary phone number, or the one a member added to their profile","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"phone","index$":8},"role":{"a":true,"h":"Role","n":"role","r":true,"sh":"The member's role in the workspace; null for agents","t":"`$ANY`","key$":"role","index$":9}},"id":{"field":"id","name":"id"},"name":"teammate","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /team","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/team","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"team"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"teammate","name__orig":"teammate","Name":"Teammate","name_":"teammate","name-":"teammate","NAME":"TEAMMATE","index$":12}, {"active":true,"entity":"teammate","key$":"BasicTeammateFlow","kind":"basic","name":"BasicTeammateFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"teammate_ref01"}}],"index$":0}]}, 'Teammate', {"GET /team":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let teammate_ref01_data = Object.values(setup.data.existing.teammate)[0] as any

    // LIST
    const teammate_ref01_ent = client.Teammate()
    const teammate_ref01_match: any = {}

    const teammate_ref01_list = (await teammate_ref01_ent.list(teammate_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/teammate/TeammateTestData.json')

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
    ['teammate01','teammate02','teammate03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ARTIL_TEST_TEAMMATE_ENTID': idmap,
    'ARTIL_TEST_LIVE': 'FALSE',
    'ARTIL_TEST_EXPLAIN': 'FALSE',
    'ARTIL_APIKEY': '',
  })

  idmap = env['ARTIL_TEST_TEAMMATE_ENTID']

  const live = 'TRUE' === env.ARTIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ARTIL_TEST_TEAMMATE_ENTID']
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
  
