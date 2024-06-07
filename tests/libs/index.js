'use strict'

import { describe } from 'node:test'
import signatureTests from './signatureTests.js'

export default () => {
  describe('Signature lib tests', signatureTests)
}
