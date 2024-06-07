'use strict'

import { build } from '../../../../../../../src/api/build.js'

import { before, after, it } from 'node:test'
import assert from 'assert'
import jwt from 'jsonwebtoken'
import config from 'config'

import { verifyLoginChallenge } from '../../../../../../../src/controllers/login/index.js'

const basePath = '/beetalik/v1/login/challenge'

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

  it(`GET ${basePath} should return an object`, async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: `${basePath}`,
    })
    try {
      assert.equal(typeof JSON.parse(response.body), 'object')
    } catch (e) {
      assert.fail(e)
    }
  })

  it(`GET ${basePath} returned object with challenge`, async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: `${basePath}`,
    })
    try {
      let object = JSON.parse(response.body)
      assert.equal(object.hasOwnProperty('challenge'), true)
      assert.equal(typeof object.challenge, 'string')
    } catch (e) {
      assert.fail(e)
    }
  })

  it(`GET ${basePath} returned object challenge is a Valid JWT`, async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: `${basePath}`,
    })
    try {
      let object = JSON.parse(response.body)

      let decoded = jwt.decode(object.challenge, config.jwt.challenge.secret)
      assert.equal(typeof decoded, 'object')
      assert.equal(verifyLoginChallenge(object.challenge), true)
    } catch (e) {
      assert.fail(e)
    }
  })
}
