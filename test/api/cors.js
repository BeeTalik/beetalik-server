'use strict'

import { build } from '../../src/api/build.js'
import assert from 'assert'

export default () => {
  let fastify = null
  before(async () => {
    fastify = await build({})
  })
  after(() => {
    fastify.close()
  })

  it('CORS preflight for GET', async () => {
    const origin = 'http://testOrigin:3000'
    const response = await fastify.inject({
      method: 'OPTIONS',
      url: '/',
      headers: {
        'Access-Control-Request-Method': 'GET',
        Origin: origin,
      },
    })
    assert.equal(response.statusCode, 204)
    assert.equal(response.headers['access-control-allow-origin'], origin)
    assert.equal(
      response.headers['access-control-allow-methods'],
      'GET, POST, PUT, DELETE',
    )
    assert.equal(
      response.headers['access-control-allow-headers'],
      'Content-Type, Authorization',
    )
  })

  it('CORS preflight for POST', async () => {
    const origin = 'http://testOrigin:3000'
    const response = await fastify.inject({
      method: 'OPTIONS',
      url: '/',
      headers: {
        'Access-Control-Request-Method': 'POST',
        Origin: origin,
      },
    })
    assert.equal(response.statusCode, 204)
    assert.equal(response.headers['access-control-allow-origin'], origin)
    assert.equal(
      response.headers['access-control-allow-methods'],
      'GET, POST, PUT, DELETE',
    )
    assert.equal(
      response.headers['access-control-allow-headers'],
      'Content-Type, Authorization',
    )
  })

  it('CORS preflight for PUT', async () => {
    const origin = 'http://testOrigin:3000'
    const response = await fastify.inject({
      method: 'OPTIONS',
      url: '/',
      headers: {
        'Access-Control-Request-Method': 'PUT',
        Origin: origin,
      },
    })
    assert.equal(response.statusCode, 204)
    assert.equal(response.headers['access-control-allow-origin'], origin)
    assert.equal(
      response.headers['access-control-allow-methods'],
      'GET, POST, PUT, DELETE',
    )
    assert.equal(
      response.headers['access-control-allow-headers'],
      'Content-Type, Authorization',
    )
  })

  it('CORS preflight for DELETE', async () => {
    const origin = 'http://testOrigin:3000'
    const response = await fastify.inject({
      method: 'OPTIONS',
      url: '/',
      headers: {
        'Access-Control-Request-Method': 'DELETE',
        Origin: origin,
      },
    })
    assert.equal(response.statusCode, 204)
    assert.equal(response.headers['access-control-allow-origin'], origin)
    assert.equal(
      response.headers['access-control-allow-methods'],
      'GET, POST, PUT, DELETE',
    )
    assert.equal(
      response.headers['access-control-allow-headers'],
      'Content-Type, Authorization',
    )
  })
}
