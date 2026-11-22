

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


describe('WebhookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ARTIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('ARTIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ArtilSDK.test()
    const ent = testsdk.Webhook()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ArtilSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Webhook().list({"agent_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ARTIL_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'webhook.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attempts":{"a":true,"h":"Attempts","n":"attempts","r":true,"sh":"How many times the event Artil is retrying has failed","t":"`$INTEGER`","key$":"attempts","index$":0},"bearerToken":{"a":true,"h":"Bearer Token","n":"bearerToken","r":false,"sh":"A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger.","t":"`$STRING`","key$":"bearerToken","index$":1},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"t":"`$STRING`","key$":"createdAt","index$":2},"deliveredAt":{"a":true,"h":"Delivered At","n":"deliveredAt","r":true,"t":"`$ANY`","key$":"deliveredAt","index$":3},"error":{"a":true,"h":"Error","n":"error","r":true,"sh":"Why the last delivery failed","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"error","index$":4},"erroredAt":{"a":true,"h":"Errored At","n":"erroredAt","r":true,"t":"`$ANY`","key$":"erroredAt","index$":5},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":6},"retryAt":{"a":true,"h":"Retry At","n":"retryAt","r":true,"sh":"When Artil next retries a failed event","t":"`$ANY`","key$":"retryAt","index$":7},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"Where Artil posts the agent's events","t":"`$STRING`","key$":"url","index$":8}},"id":{"field":"id","name":"id"},"name":"webhook","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["bearerToken","url"],"co":{"id":"POST /agents/{id}/webhooks","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/agents/{id}/webhooks","q":{"exist":["agent_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agents"},{"var":"agent_id"},{"lit":"webhooks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /agents/{id}/webhooks","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/agents/{id}/webhooks","q":{"exist":["agent_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agents"},{"var":"agent_id"},{"lit":"webhooks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /agents/{id}/webhooks/{webhookId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"webhookId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/agents/{id}/webhooks/{webhookId}","q":{"exist":["agent_id","id"]},"r":{"param":{"id":"agent_id","webhookId":"id"}},"s":[{"lit":"agents"},{"var":"agent_id"},{"lit":"webhooks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.agent"]]},"key$":"webhook","name__orig":"webhook","Name":"Webhook","name_":"webhook","name-":"webhook","NAME":"WEBHOOK","index$":13}, {"active":true,"entity":"webhook","key$":"BasicWebhookFlow","kind":"basic","name":"BasicWebhookFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"webhook_ref01"},"m":{"agent_id":"agent01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"agent_id":"agent01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"webhook_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"webhook_ref01","suffix":"_rm0"},"m":{"agent_id":"agent01","id":"webhook01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"agent_id":"agent01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"webhook_ref01"}}],"index$":3}]}, 'Webhook', {"POST /agents/{id}/webhooks":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"url":{"type":"string","maxLength":2000,"format":"uri","key$":"url"},"bearerToken":{"description":"A token Artil sends as `Authorization: Bearer` with each delivery, for an endpoint that checks one instead of the signature, like a Grok Bot routine or a Claude scheduled task's API trigger. A new one replaces the token of a URL added before.","type":"string","maxLength":1000,"pattern":"^[\\w.~+\\/\\-]+=*$","key$":"bearerToken"}},"required":["url"]}}}},"parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0}]},"GET /agents/{id}/webhooks":{"protocol":"http","parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0}]},"DELETE /agents/{id}/webhooks/{webhookId}":{"protocol":"http","parameters":[{"in":"path","name":"id","required":true,"description":"The agent's id","schema":{"type":"string"},"index$":0},{"schema":{"type":"string"},"in":"path","name":"webhookId","required":true,"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"webhook.create.0":"GET-only live run: needs POST /agents/{id}/webhooks","webhook.remove.2":"GET-only live run: needs DELETE /agents/{id}/webhooks/{webhookId}","webhook.list.3":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const webhook_ref01_ent = client.Webhook()
    let webhook_ref01_data = setup.data.new.webhook['webhook_ref01']
    webhook_ref01_data['agent_id'] = setup.idmap['agent01']

    webhook_ref01_data = (await webhook_ref01_ent.create(webhook_ref01_data)).data()
    assert(null != webhook_ref01_data.id)


    // LIST
    const webhook_ref01_match: any = {}
    webhook_ref01_match['agent_id'] = setup.idmap['agent01']

    const webhook_ref01_list = (await webhook_ref01_ent.list(webhook_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(webhook_ref01_list, { id: webhook_ref01_data.id })))


    // REMOVE
    const webhook_ref01_match_rm0: any = { id: webhook_ref01_data.id }
    webhook_ref01_match_rm0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01']
    await webhook_ref01_ent.remove(webhook_ref01_match_rm0)
  

    // LIST
    const webhook_ref01_match_rt0: any = {}
    webhook_ref01_match_rt0['agent_id'] = setup.idmap['agent01']

    const webhook_ref01_list_rt0 = (await webhook_ref01_ent.list(webhook_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(webhook_ref01_list_rt0, { id: webhook_ref01_data.id })))


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
      '../../../../.sdk/test/entity/webhook/WebhookTestData.json')

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
    ['webhook01','webhook02','webhook03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ARTIL_TEST_WEBHOOK_ENTID': idmap,
    'ARTIL_TEST_LIVE': 'FALSE',
    'ARTIL_TEST_EXPLAIN': 'FALSE',
    'ARTIL_APIKEY': '',
  })

  idmap = env['ARTIL_TEST_WEBHOOK_ENTID']

  const live = 'TRUE' === env.ARTIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ARTIL_TEST_WEBHOOK_ENTID']
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
  
