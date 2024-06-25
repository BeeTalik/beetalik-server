'use strict'

import { describe, before, after, it } from 'node:test'
import { build } from '../../src/api/build.js'
import assert from 'assert'

function fastifyTests(devMode) {
  let previousEnv = null
  let fastify = null
  before(async () => {
    if (devMode === true) {
      previousEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
    }
    fastify = await build({})
  })
  after(() => {
    fastify.close()
    if (devMode === true) {
      process.env.NODE_ENV = previousEnv
    }
  })

  it('fastify should be an object', () => {
    assert.equal(typeof fastify, 'object')
  })

  it('fastify should have a ready method', () => {
    assert.equal(typeof fastify.ready, 'function')
  })

  it('fastify should have a listen method', () => {
    assert.equal(typeof fastify.listen, 'function')
  })

  it('fastify should have a close method', () => {
    assert.equal(typeof fastify.close, 'function')
  })
}

export default () => {
  describe('Fastify Framework Tests (Non Development)', () =>
    fastifyTests(false))
  describe('Fastify Framework Tests (DEVELOPMENT MODE)', () =>
    fastifyTests(true))
}
