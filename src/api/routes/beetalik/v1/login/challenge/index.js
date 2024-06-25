'use strict'

import { getLoginChallenge } from '../../../../../../controllers/login/index.js'

export default async function loginChallenge(app) {
  app.get(
    '/',
    {
      schema: {
        description: 'Get challenge',
        tags: ['beetalikAPI'],
        summary: 'Get challenge for login',
      },
    },
    async function (request, reply) {
      reply.send({
        challenge: getLoginChallenge(),
      })
    },
  )
}
