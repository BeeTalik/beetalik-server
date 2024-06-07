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
