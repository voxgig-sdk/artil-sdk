# Artil SDK exists test

require "minitest/autorun"
require_relative "../Artil_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ArtilSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
