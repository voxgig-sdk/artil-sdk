# Artil SDK exists test

import pytest
from artil_sdk import ArtilSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ArtilSDK.test(None, None)
        assert testsdk is not None
