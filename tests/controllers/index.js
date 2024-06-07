'use strict'

import { describe } from 'node:test'
import loginTests from './loginTests.js'

export default () => {
  describe('Login controllers tests', loginTests)
}
