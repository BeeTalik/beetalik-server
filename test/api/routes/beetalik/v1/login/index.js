'use strict'

import { signChallenge } from '../../../../../helpers/signature.js'

import { build } from '../../../../../../src/api/build.js'
import assert from 'assert'

import config from 'config'
import jwt from 'jsonwebtoken'

import { getLoginChallenge } from '../../../../../../src/controllers/login/index.js'

const basePath = '/beetalik/v1/login'

export default () => {
  let fastify = null
  before(async () => {
    fastify = await build({})
  })
  after(() => {
    fastify.close()
  })

  it(`POST ${basePath} without data should return 400`, async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: `${basePath}`,
    })
    assert.equal(response.statusCode, 400)
  })

  it(`POST ${basePath} without challenge should return 400`, async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: `${basePath}`,
      body: {
        signature: 'signature',
      },
    })
    assert.equal(response.statusCode, 400)
  })

  it(`POST ${basePath} without signature should return 400`, async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: `${basePath}`,
      body: {
        challenge: 'challenge',
      },
    })
    assert.equal(response.statusCode, 400)
  })

  it(`POST ${basePath} with invalid challenge and signature should return 400`, async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: `${basePath}`,
      body: {
        challenge: 'challenge',
        signature: 'signature',
      },
    })
    assert.equal(response.statusCode, 400)
  })

  it(`POST ${basePath} with valid challenge but invalid signature should return 400`, async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: `${basePath}`,
      body: {
        challenge: getLoginChallenge(),
        signature: 'signature',
      },
    })
    assert.equal(response.statusCode, 400)
  })

  it(`POST ${basePath} with valid challenge and signature should return 200`, async () => {
    let challenge = getLoginChallenge()
    let signature = signChallenge(challenge)
    const response = await fastify.inject({
      method: 'POST',
      url: `${basePath}`,
      body: {
        challenge,
        signature,
      },
    })
    assert.equal(response.statusCode, 200)
  })

  it(`POST ${basePath} returned token is a valid JWT`, async () => {
    let challenge = getLoginChallenge()
    let signature = signChallenge(challenge)
    const response = await fastify.inject({
      method: 'POST',
      url: `${basePath}`,
      body: {
        challenge,
        signature,
      },
    })

    try {
      let object = JSON.parse(response.body)
      let decoded = jwt.decode(object.token, config.jwt.login.secret)
      assert.equal(typeof decoded, 'object')
      assert.equal(decoded.type, 'loginLogged')
      assert.equal(typeof decoded.id, 'string')
      assert.equal(decoded.id, signature.publicKey)
    } catch (e) {
      assert.fail(e)
    }
  })
}
