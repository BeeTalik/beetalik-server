'use strict'

import config from 'config'
import jwt from 'jsonwebtoken'
import { validate } from '../../libs/signature.js'

const JWT_TYPE_LOGIN_CHALLENGE = 'loginChallenge'
const JWT_TYPE_LOGGED = 'loginLogged'

export function getLoginChallenge() {
  return jwt.sign(
    { type: JWT_TYPE_LOGIN_CHALLENGE, value: Math.random() },
    config.jwt.challenge.secret,
    {
      expiresIn: config.jwt.challenge.expiresIn,
    },
  )
}

export function verifyLoginChallenge(token) {
  try {
    let decoded = jwt.verify(token, config.jwt.challenge.secret)
    return decoded.type === JWT_TYPE_LOGIN_CHALLENGE
  } catch (e) {
    return false
  }
}

export function verifySignature(challenge, signatureData) {
  return validate(challenge, signatureData)
}

export function getLoggedToken(id) {
  return jwt.sign({ type: JWT_TYPE_LOGGED, id }, config.jwt.login.secret, {
    expiresIn: config.jwt.login.expiresIn,
  })
}
