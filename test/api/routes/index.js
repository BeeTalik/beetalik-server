'use strict'

import root from './root.js'
import beetalikV1 from './beetalik/v1/index.js'
import loginChallengeTests from './beetalik/v1/login/challenge/index.js'

export default () => {
  describe('Root routes', root)
  describe('beetalik/v1 routes', beetalikV1)
  describe('beetalik/v1/login/challenge tests', loginChallengeTests)
}
