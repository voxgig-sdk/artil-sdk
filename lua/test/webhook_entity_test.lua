-- Webhook entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("artil_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("WebhookEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Webhook(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:Webhook(nil):list({ ["agent_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = webhook_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "webhook." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"webhook.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /agents/{id}/webhooks\"}")
      print("LIVE STEP {\"id\":\"webhook.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /agents/{id}/webhooks/{webhookId}\"}")
      print("LIVE STEP {\"id\":\"webhook.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    if setup.live then
      for _, _live_key in ipairs({"agent01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via ARTIL_TEST_WEBHOOK_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local webhook_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.webhook")))
    local webhook_ref01_data = nil
    if #webhook_ref01_data_raw > 0 then
      webhook_ref01_data = helpers.to_map(webhook_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local webhook_ref01_ent = client:Webhook(nil)
    local webhook_ref01_match = {
      ["agent_id"] = setup.idmap["agent01"],
    }

    local webhook_ref01_list_result, err = webhook_ref01_ent:list(webhook_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(webhook_ref01_list_result)

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"agent01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via ARTIL_TEST_WEBHOOK_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local webhook_ref01_ent = client:Webhook(nil)
    local webhook_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.webhook"), "webhook_ref01"))
    webhook_ref01_data["agent_id"] = setup.idmap["agent01"]

    local webhook_ref01_data_result, err = webhook_ref01_ent:create(webhook_ref01_data, nil)
    assert.is_nil(err)
    webhook_ref01_data = helpers.to_map(type(webhook_ref01_data_result) == 'table' and webhook_ref01_data_result.data_get and webhook_ref01_data_result:data_get() or webhook_ref01_data_result)
    assert.is_not_nil(webhook_ref01_data)
    assert.is_not_nil(webhook_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local webhook_ref01_match = {
      ["agent_id"] = setup.idmap["agent01"],
    }

    local webhook_ref01_list_result, err = webhook_ref01_ent:list(webhook_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(webhook_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(webhook_ref01_list_result),
      { id = webhook_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- REMOVE
    local webhook_ref01_match_rm0 = {
      id = webhook_ref01_data["id"],
    }
    webhook_ref01_match_rm0["agent_id"] = setup.idmap["agent_id"] or setup.idmap["agent01"]
    local _, err = webhook_ref01_ent:remove(webhook_ref01_match_rm0, nil)
    assert.is_nil(err)

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local webhook_ref01_match_rt0 = {
      ["agent_id"] = setup.idmap["agent01"],
    }

    local webhook_ref01_list_rt0_result, err = webhook_ref01_ent:list(webhook_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(webhook_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(webhook_ref01_list_rt0_result),
      { id = webhook_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function webhook_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/webhook/WebhookTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read webhook test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "webhook01", "webhook02", "webhook03", "agent01", "agent02", "agent03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("ARTIL_TEST_WEBHOOK_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["ARTIL_TEST_WEBHOOK_ENTID"] = idmap,
    ["ARTIL_TEST_LIVE"] = "FALSE",
    ["ARTIL_TEST_EXPLAIN"] = "FALSE",
    ["ARTIL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["ARTIL_TEST_WEBHOOK_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["ARTIL_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["ARTIL_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["ARTIL_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["ARTIL_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
