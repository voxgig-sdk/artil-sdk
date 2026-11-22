# Event entity test

require "minitest/autorun"
require "json"
require_relative "../Artil_sdk"
require_relative "runner"

class EventEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ArtilSDK.test(nil, nil)
    ent = testsdk.Event(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ArtilConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ArtilSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Event(nil).list({ "agent_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = event_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "event." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"event.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /agents/{id}/url\"}"
    if setup[:live]
      ["agent01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via ARTIL_TEST_EVENT_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    event_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.event")))
    event_ref01_data = nil
    if event_ref01_data_raw.length > 0
      event_ref01_data = Helpers.to_map(event_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    event_ref01_ent = client.Event(nil)
    event_ref01_match = {
      "agent_id" => setup[:idmap]["agent01"],
    }

    event_ref01_list_result = event_ref01_ent.list(event_ref01_match, nil)
    assert event_ref01_list_result.is_a?(Array)

      return
    end

    if setup[:live]
      ["agent01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via ARTIL_TEST_EVENT_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    event_ref01_ent = client.Event(nil)
    event_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.event"), "event_ref01"))
    event_ref01_data["agent_id"] = setup[:idmap]["agent01"]

    event_ref01_data_result = event_ref01_ent.create(event_ref01_data, nil)
    event_ref01_data = Helpers.to_map(event_ref01_data_result.respond_to?(:data_get) ? event_ref01_data_result.data_get : event_ref01_data_result)
    assert !event_ref01_data.nil?
    assert !event_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    event_ref01_match = {
      "agent_id" => setup[:idmap]["agent01"],
    }

    event_ref01_list_result = event_ref01_ent.list(event_ref01_match, nil)
    assert event_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(event_ref01_list_result),
      { "id" => event_ref01_data["id"] })
    assert !Vs.isempty(found_item)

  end
end

def event_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "event", "EventTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ArtilSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["event01", "event02", "event03", "agent01", "agent02", "agent03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["ARTIL_TEST_EVENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ARTIL_TEST_EVENT_ENTID" => idmap,
    "ARTIL_TEST_LIVE" => "FALSE",
    "ARTIL_TEST_EXPLAIN" => "FALSE",
    "ARTIL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["ARTIL_TEST_EVENT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
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
