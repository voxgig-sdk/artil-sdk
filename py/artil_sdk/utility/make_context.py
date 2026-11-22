# Artil SDK utility: make_context

from artil_sdk.core.context import ArtilContext


def make_context_util(ctxmap, basectx):
    return ArtilContext(ctxmap, basectx)
