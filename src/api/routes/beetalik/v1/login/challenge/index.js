'use strict'

import { getLoginChallenge } from '../../../../../../controllers/login/index.js'

export default async function loginChallenge(app) {
  app.get('/', async function (request, reply) {
    reply.send({
      challenge: getLoginChallenge(),
    })
  })
}
