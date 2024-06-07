'use strict'

import { before, after, it } from 'node:test'
import { build } from '../../../src/api/build.js'
import assert from 'assert'

export default () => {
  let fastify = null
  before(async () => {
    fastify = await build({})
  })
  after(() => {
    fastify.close()
  })

  it('GET / should return 200', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/',
    })
    assert.equal(response.statusCode, 200)
  })
}
