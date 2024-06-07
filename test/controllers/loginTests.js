'use strict'

import assert from 'assert'
import {
  getLoginChallenge,
  verifyLoginChallenge,
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
    const decoded = jwt.decode(challenge, config.jwt.challenge.secret)
    assert.equal(decoded.type, 'loginChallenge')
  })
}
