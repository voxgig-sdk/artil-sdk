# Artil SDK feature factory

from artil_sdk.feature.base_feature import ArtilBaseFeature
from artil_sdk.feature.debug_feature import ArtilDebugFeature
from artil_sdk.feature.idempotency_feature import ArtilIdempotencyFeature
from artil_sdk.feature.metrics_feature import ArtilMetricsFeature
from artil_sdk.feature.paging_feature import ArtilPagingFeature
from artil_sdk.feature.ratelimit_feature import ArtilRatelimitFeature
from artil_sdk.feature.retry_feature import ArtilRetryFeature
from artil_sdk.feature.secrets_feature import ArtilSecretsFeature
from artil_sdk.feature.test_feature import ArtilTestFeature
from artil_sdk.feature.timeout_feature import ArtilTimeoutFeature


_FEATURES = {
    "base": lambda: ArtilBaseFeature(),
    "debug": lambda: ArtilDebugFeature(),
    "idempotency": lambda: ArtilIdempotencyFeature(),
    "metrics": lambda: ArtilMetricsFeature(),
    "paging": lambda: ArtilPagingFeature(),
    "ratelimit": lambda: ArtilRatelimitFeature(),
    "retry": lambda: ArtilRetryFeature(),
    "secrets": lambda: ArtilSecretsFeature(),
    "test": lambda: ArtilTestFeature(),
    "timeout": lambda: ArtilTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
