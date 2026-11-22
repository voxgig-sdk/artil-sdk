<?php
declare(strict_types=1);

// Artil SDK utility: result_headers

class ArtilResultHeaders
{
    public static function call(ArtilContext $ctx): ?ArtilResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
