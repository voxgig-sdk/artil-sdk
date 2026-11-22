# Address entity test

require "minitest/autorun"
require "json"
require_relative "../Artil_sdk"
require_relative "runner"

class AddressEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ArtilSDK.test(nil, nil)
    ent = testsdk.Address(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ArtilConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ArtilSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Address(nil).list({ "agent_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = address_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "address." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"address.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /agents/{id}/addresses/{addressId}/primary\"}"
      puts "LIVE STEP {\"id\":\"address.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /agents/{id}/addresses/{addressId}\"}"
      puts "LIVE STEP {\"id\":\"address.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /agents/{id}/addresses/{addressId}\"}"
      puts "LIVE STEP {\"id\":\"address.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["agent01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via ARTIL_TEST_ADDRESS_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["address01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "address", "id", _live_id) do
        client.Address(nil).list({"agent_id" => setup[:idmap]["agent01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    address_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.address")))
    address_ref01_data = nil
    if address_ref01_data_raw.length > 0
      address_ref01_data = Helpers.to_map(address_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    address_ref01_ent = client.Address(nil)
    address_ref01_match = {
      "agent_id" => setup[:idmap]["agent01"],
    }

    address_ref01_list_result = address_ref01_ent.list(address_ref01_match, nil)
    assert address_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    address_ref01_match_dt0 = {
      "id" => address_ref01_data["id"],
    }
    address_ref01_match_dt0["agent_id"] = setup[:idmap]["agent_id"] || setup[:idmap]["agent01"]
    address_ref01_data_dt0_loaded = address_ref01_ent.load(address_ref01_match_dt0, nil)
    address_ref01_data_dt0_load_result = Helpers.to_map(address_ref01_data_dt0_loaded.respond_to?(:data_get) ? address_ref01_data_dt0_loaded.data_get : address_ref01_data_dt0_loaded)
    assert !address_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(address_ref01_data_dt0_load_result["id"], address_ref01_data["id"])

      return
    end

    if setup[:live]
      ["agent01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via ARTIL_TEST_ADDRESS_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    address_ref01_ent = client.Address(nil)
    address_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.address"), "address_ref01"))
    address_ref01_data["agent_id"] = setup[:idmap]["agent01"]

    address_ref01_data_result = address_ref01_ent.create(address_ref01_data, nil)
    address_ref01_data = Helpers.to_map(address_ref01_data_result.respond_to?(:data_get) ? address_ref01_data_result.data_get : address_ref01_data_result)
    assert !address_ref01_data.nil?
    assert !address_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    address_ref01_match = {
      "agent_id" => setup[:idmap]["agent01"],
    }

    address_ref01_list_result = address_ref01_ent.list(address_ref01_match, nil)
    assert address_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(address_ref01_list_result),
      { "id" => address_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    address_ref01_data_up0_up = {
      "id" => address_ref01_data["id"],
      "agent_id" => setup[:idmap]["agent_id"],
    }

    address_ref01_markdef_up0_name = "channel"
    address_ref01_markdef_up0_value = "Mark01-address_ref01_#{setup[:now]}"
    address_ref01_data_up0_up[address_ref01_markdef_up0_name] = address_ref01_markdef_up0_value

    address_ref01_resdata_up0_result = address_ref01_ent.update(address_ref01_data_up0_up, nil)
    address_ref01_resdata_up0 = Helpers.to_map(address_ref01_resdata_up0_result.respond_to?(:data_get) ? address_ref01_resdata_up0_result.data_get : address_ref01_resdata_up0_result)
    assert !address_ref01_resdata_up0.nil?
    assert Runner.live_same_id(address_ref01_resdata_up0["id"], address_ref01_data_up0_up["id"])
    assert_equal address_ref01_resdata_up0[address_ref01_markdef_up0_name], address_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    address_ref01_match_dt0 = {
      "id" => address_ref01_data["id"],
    }
    address_ref01_match_dt0["agent_id"] = setup[:idmap]["agent_id"] || setup[:idmap]["agent01"]
    address_ref01_data_dt0_loaded = address_ref01_ent.load(address_ref01_match_dt0, nil)
    address_ref01_data_dt0_load_result = Helpers.to_map(address_ref01_data_dt0_loaded.respond_to?(:data_get) ? address_ref01_data_dt0_loaded.data_get : address_ref01_data_dt0_loaded)
    assert !address_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(address_ref01_data_dt0_load_result["id"], address_ref01_data["id"])

    Runner.live_pace if setup[:live]
    # REMOVE
    address_ref01_match_rm0 = {
      "id" => address_ref01_data["id"],
    }
    address_ref01_match_rm0["agent_id"] = setup[:idmap]["agent_id"] || setup[:idmap]["agent01"]
    address_ref01_ent.remove(address_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    address_ref01_match_rt0 = {
      "agent_id" => setup[:idmap]["agent01"],
    }

    address_ref01_list_rt0_result = address_ref01_ent.list(address_ref01_match_rt0, nil)
    assert address_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(address_ref01_list_rt0_result),
      { "id" => address_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def address_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "address", "AddressTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ArtilSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["address01", "address02", "address03", "agent01", "agent02", "agent03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["ARTIL_TEST_ADDRESS_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ARTIL_TEST_ADDRESS_ENTID" => idmap,
    "ARTIL_TEST_LIVE" => "FALSE",
    "ARTIL_TEST_EXPLAIN" => "FALSE",
    "ARTIL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["ARTIL_TEST_ADDRESS_ENTID"])
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
