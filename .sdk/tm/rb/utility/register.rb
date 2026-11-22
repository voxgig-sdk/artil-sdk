# Artil SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ArtilUtility.registrar = ->(u) {
  u.clean = ArtilUtilities::Clean
  u.clean_add = ArtilUtilities::CleanAdd
  u.clean_explain = ArtilUtilities::CleanExplain
  u.done = ArtilUtilities::Done
  u.make_error = ArtilUtilities::MakeError
  u.feature_add = ArtilUtilities::FeatureAdd
  u.feature_hook = ArtilUtilities::FeatureHook
  u.feature_init = ArtilUtilities::FeatureInit
  u.fetcher = ArtilUtilities::Fetcher
  u.make_fetch_def = ArtilUtilities::MakeFetchDef
  u.make_context = ArtilUtilities::MakeContext
  u.make_options = ArtilUtilities::MakeOptions
  u.make_request = ArtilUtilities::MakeRequest
  u.make_response = ArtilUtilities::MakeResponse
  u.make_result = ArtilUtilities::MakeResult
  u.make_point = ArtilUtilities::MakePoint
  u.make_spec = ArtilUtilities::MakeSpec
  u.make_url = ArtilUtilities::MakeUrl
  u.param = ArtilUtilities::Param
  u.prepare_auth = ArtilUtilities::PrepareAuth
  u.prepare_body = ArtilUtilities::PrepareBody
  u.prepare_headers = ArtilUtilities::PrepareHeaders
  u.prepare_method = ArtilUtilities::PrepareMethod
  u.prepare_params = ArtilUtilities::PrepareParams
  u.prepare_path = ArtilUtilities::PreparePath
  u.prepare_query = ArtilUtilities::PrepareQuery
  u.graphql_body = ArtilUtilities::GraphqlBody
  u.graphql_errors = ArtilUtilities::GraphqlErrors
  u.result_basic = ArtilUtilities::ResultBasic
  u.result_body = ArtilUtilities::ResultBody
  u.result_headers = ArtilUtilities::ResultHeaders
  u.transform_request = ArtilUtilities::TransformRequest
  u.transform_response = ArtilUtilities::TransformResponse
}
