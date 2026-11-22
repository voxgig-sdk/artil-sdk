# Access entity test

require "minitest/autorun"
require "json"
require_relative "../Artil_sdk"
require_relative "runner"

class AccessEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ArtilSDK.test(nil, nil)
    ent = testsdk.Access(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ArtilConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ArtilSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Access(nil).load({ "agent_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = access_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "access." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"access.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /agents/{id}/access/{channel}\"}"
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow loads a access record it has no list to find")
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    access_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.access")))
    access_ref01_data = nil
    if access_ref01_data_raw.length > 0
      access_ref01_data = Helpers.to_map(access_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LOAD
    access_ref01_ent = client.Access(nil)
    access_ref01_match_dt0 = {
      "id" => access_ref01_data["id"],
    }
    access_ref01_data_dt0_loaded = access_ref01_ent.load(access_ref01_match_dt0, nil)
    access_ref01_data_dt0_load_result = Helpers.to_map(access_ref01_data_dt0_loaded.respond_to?(:data_get) ? access_ref01_data_dt0_loaded.data_get : access_ref01_data_dt0_loaded)
    assert !access_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(access_ref01_data_dt0_load_result["id"], access_ref01_data["id"]) unless setup[:live]

      return
    end

    if setup[:live]
      ["agent01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via ARTIL_TEST_ACCESS_ENTID")
        end
      end
    end
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a access record it did not create")
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    access_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.access")))
    access_ref01_data = nil
    if access_ref01_data_raw.length > 0
      access_ref01_data = Helpers.to_map(access_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # UPDATE
    access_ref01_ent = client.Access(nil)
    access_ref01_data_up0_up = {
      "id" => access_ref01_data["id"],
      "agent_id" => setup[:idmap]["agent_id"],
    }

    access_ref01_markdef_up0_name = "admit"
    access_ref01_markdef_up0_value = "Mark01-access_ref01_#{setup[:now]}"
    access_ref01_data_up0_up[access_ref01_markdef_up0_name] = access_ref01_markdef_up0_value

    access_ref01_resdata_up0_result = access_ref01_ent.update(access_ref01_data_up0_up, nil)
    access_ref01_resdata_up0 = Helpers.to_map(access_ref01_resdata_up0_result.respond_to?(:data_get) ? access_ref01_resdata_up0_result.data_get : access_ref01_resdata_up0_result)
    assert !access_ref01_resdata_up0.nil?
    assert Runner.live_same_id(access_ref01_resdata_up0["id"], access_ref01_data_up0_up["id"]) unless setup[:live]
    assert_equal access_ref01_resdata_up0[access_ref01_markdef_up0_name], access_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    access_ref01_match_dt0 = {
      "id" => access_ref01_data["id"],
    }
    access_ref01_data_dt0_loaded = access_ref01_ent.load(access_ref01_match_dt0, nil)
    access_ref01_data_dt0_load_result = Helpers.to_map(access_ref01_data_dt0_loaded.respond_to?(:data_get) ? access_ref01_data_dt0_loaded.data_get : access_ref01_data_dt0_loaded)
    assert !access_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(access_ref01_data_dt0_load_result["id"], access_ref01_data["id"]) unless setup[:live]

  end
end

def access_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "access", "AccessTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ArtilSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["access01", "access02", "access03", "agent01", "agent02", "agent03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["ARTIL_TEST_ACCESS_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ARTIL_TEST_ACCESS_ENTID" => idmap,
    "ARTIL_TEST_LIVE" => "FALSE",
    "ARTIL_TEST_EXPLAIN" => "FALSE",
    "ARTIL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["ARTIL_TEST_ACCESS_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["agent_id"].nil?
    idmap_resolved["agent_id"] = idmap_resolved["agent01"]
  end

  if env["ARTIL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["ARTIL_APIKEY"],
      },
      extra || {},
    ])
    client = ArtilSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["ARTIL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["ARTIL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
