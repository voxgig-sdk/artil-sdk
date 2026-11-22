
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ArtilSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ArtilSDK.test()
    equal(testsdk instanceof ArtilSDK, true,
      'ArtilSDK.test() must return a client synchronously')
  })

})
