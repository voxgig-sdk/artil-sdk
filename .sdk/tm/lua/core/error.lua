-- Artil SDK error

local json = require("dkjson")

local ArtilError = {}
ArtilError.__index = ArtilError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function ArtilError.new(code, msg, ctx)
  local self = setmetatable({}, ArtilError)
  self.is_sdk_error = true
  self.sdk = "Artil"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function ArtilError:context()
  return CONTEXT[self]
end


function ArtilError:error()
  return self.msg
end


function ArtilError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function ArtilError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function ArtilError:to_json()
  return json.encode(self:to_table())
end


function ArtilError:__tostring()
  return self.msg
end


function ArtilError.__tojson(self)
  return self:to_json()
end


return ArtilError
