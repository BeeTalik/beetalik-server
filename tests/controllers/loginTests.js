'use strict'

import { it } from 'node:test'
import { signChallenge } from '../helpers/signature.js '

import assert from 'assert'
import {
  getLoginChallenge,
  verifyLoginChallenge,
  verifySignature,
  getLoggedToken,
} from '../../src/controllers/login/index.js'

import jwt from 'jsonwebtoken'
import config from 'config'

export default () => {
  it('GET login challege', () => {
    const challenge = getLoginChallenge()
    assert.notEqual(challenge, '')
    assert.equal(typeof challenge, 'string')
  })

  it('Verify login challenge', () => {
    const challenge = getLoginChallenge()
    const result = verifyLoginChallenge(challenge)
    assert.equal(result, true)
  })

  it('Verify JWT expiration', () => {
    const challenge = getLoginChallenge()
    const decoded = jwt.decode(challenge, config.jwt.challenge.secret)
    assert.equal(
      decoded.exp - decoded.iat,
      config.jwt.challenge.expiresIn / 1000,
    )
  })

  it('Verify JWT type', () => {
    const challenge = getLoginChallenge()
    try {
      const decoded = jwt.decode(challenge, config.jwt.challenge.secret)
      assert.equal(decoded.type, 'loginChallenge')
      assert.equal(typeof decoded.value, 'string')
    } catch (error) {
      assert.fail(error)
    }
  })

  it('Verify Signature', () => {
    const challenge = getLoginChallenge()
    const signature = signChallenge(challenge)
    const result = verifySignature(challenge, signature)
    assert.equal(result, true)
  })

  it('Get logged token', () => {
    const id = 'id'
    const token = getLoggedToken(id)
    try {
      const decoded = jwt.decode(token, config.jwt.challenge.secret)
      assert.equal(decoded.type, 'loginLogged')
      assert.equal(decoded.id, id)
    } catch (error) {
      assert.fail(error)
    }
  })
}
