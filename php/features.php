<?php
declare(strict_types=1);

// Artil SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/DebugFeature.php';
require_once __DIR__ . '/feature/IdempotencyFeature.php';
require_once __DIR__ . '/feature/MetricsFeature.php';
require_once __DIR__ . '/feature/PagingFeature.php';
require_once __DIR__ . '/feature/RatelimitFeature.php';
require_once __DIR__ . '/feature/RetryFeature.php';
require_once __DIR__ . '/feature/SecretsFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';
require_once __DIR__ . '/feature/TimeoutFeature.php';


class ArtilFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ArtilBaseFeature();
            case "debug":
                return new ArtilDebugFeature();
            case "idempotency":
                return new ArtilIdempotencyFeature();
            case "metrics":
                return new ArtilMetricsFeature();
            case "paging":
                return new ArtilPagingFeature();
            case "ratelimit":
                return new ArtilRatelimitFeature();
            case "retry":
                return new ArtilRetryFeature();
            case "secrets":
                return new ArtilSecretsFeature();
            case "test":
                return new ArtilTestFeature();
            case "timeout":
                return new ArtilTimeoutFeature();
            default:
                return new ArtilBaseFeature();
        }
    }

    /**
     * Does a generated feature class back this name? False for a name only
     * an options extend instance can supply (the station adopt path) - the
     * constructor uses this to skip make_feature for such names instead of
     * adding a stray BaseFeature.
     */
    public static function has_feature(string $name): bool
    {
        switch ($name) {
            case "base":
            case "debug":
            case "idempotency":
            case "metrics":
            case "paging":
            case "ratelimit":
            case "retry":
            case "secrets":
            case "test":
            case "timeout":
                return true;
            default:
                return false;
        }
    }
}
