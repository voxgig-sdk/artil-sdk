-- Artil SDK exists test

local sdk = require("artil_sdk")

describe("ArtilSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
