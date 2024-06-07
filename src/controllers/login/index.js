'use strict'

import config from 'config'
import jwt from 'jsonwebtoken'

const JWT_TYPE_LOGIN_CHALLENGE = 'loginChallenge'

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
