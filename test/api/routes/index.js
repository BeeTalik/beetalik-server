'use strict'

import root from './root.js'
import beetalikV1 from './beetalik/v1/index.js'

export default () => {
  describe('Root routes', root)
  describe('beetalik/v1 routes', beetalikV1)
}
