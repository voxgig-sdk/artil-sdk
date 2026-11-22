# Artil SDK utility: prepare_body
require_relative 'media'
module ArtilUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return ArtilUtilities.raw_body(ctx.reqdata) if ArtilUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
