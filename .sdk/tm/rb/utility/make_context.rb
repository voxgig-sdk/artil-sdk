# Artil SDK utility: make_context
require_relative '../core/context'
module ArtilUtilities
  MakeContext = ->(ctxmap, basectx) {
    ArtilContext.new(ctxmap, basectx)
  }
end
