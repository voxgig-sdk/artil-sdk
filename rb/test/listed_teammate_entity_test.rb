# ListedTeammate entity test

require "minitest/autorun"
require "json"
require_relative "../Artil_sdk"
require_relative "runner"

class ListedTeammateEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ArtilSDK.test(nil, nil)
    ent = testsdk.ListedTeammate(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "listed_teammate" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = ArtilSDK.test(seed, nil).ListedTeammate(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "listed_teammate" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ArtilSDK.test(seed, nil)
    seen = base.ListedTeammate(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ArtilConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ArtilSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.ListedTeammate(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < ArtilBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "listed_teammate hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      ArtilSDK.test(offline, nil).ListedTeammate(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    ArtilSDK.test(offline, nil).ListedTeammate(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = ArtilConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = ArtilSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.ListedTeammate(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    ArtilSDK.test(nil, nil).ListedTeammate(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = ArtilSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.ListedTeammate(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.ListedTeammate(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = ArtilConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ArtilSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.ListedTeammate(nil).list({ "email" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = listed_teammate_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "listed_teammate." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    listed_teammate_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.listed_teammate")))
    listed_teammate_ref01_data = nil
    if listed_teammate_ref01_data_raw.length > 0
      listed_teammate_ref01_data = Helpers.to_map(listed_teammate_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    listed_teammate_ref01_ent = client.ListedTeammate(nil)
    listed_teammate_ref01_match = {}

    listed_teammate_ref01_list_result = listed_teammate_ref01_ent.list(listed_teammate_ref01_match, nil)
    assert listed_teammate_ref01_list_result.is_a?(Array)

  end
end

def listed_teammate_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "listed_teammate", "ListedTeammateTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ArtilSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["listed_teammate01", "listed_teammate02", "listed_teammate03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["ARTIL_TEST_LISTED_TEAMMATE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ARTIL_TEST_LISTED_TEAMMATE_ENTID" => idmap,
    "ARTIL_TEST_LIVE" => "FALSE",
    "ARTIL_TEST_EXPLAIN" => "FALSE",
    "ARTIL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["ARTIL_TEST_LISTED_TEAMMATE_ENTID"])
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
