'use strict'

import { build } from '../../../../../src/api/build.js'
import assert from 'assert'

const basePath = '/beetalik/v1'

export default () => {
  let fastify = null
  before(async () => {
    fastify = await build({})
  })
  after(() => {
    fastify.close()
  })

  it(`GET ${basePath} should return 200`, async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: `${basePath}`,
    })
    assert.equal(response.statusCode, 200)
  })
}
