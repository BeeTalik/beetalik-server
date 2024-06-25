'use strict'

'use strict'

import {
  verifyLoginChallenge,
  verifySignature,
  getLoggedToken,
} from '../../../../../controllers/login/index.js'

export default async function login(app) {
  app.post(
    '/',
    {
      schema: {
        description: 'Login',
        tags: ['beetalikAPI'],
        summary: 'Login',
      },
    },
    async function (request, reply) {
      if (!request.body?.challenge) {
        reply.status(400).send('Challenge is required')
        return
      }
      if (!request.body?.signature) {
        reply.status(400).send('Signature is required')
        return
      }
      if (
        !request.body?.signature?.signature ||
        !request.body?.signature?.publicKey
      ) {
        reply.status(400).send('Invalid signature')
        return
      }

      if (!verifyLoginChallenge(request.body.challenge)) {
        reply.status(400).send('Invalid challenge')
        return
      }

      if (!verifySignature(request.body.challenge, request.body.signature)) {
        reply.status(400).send('Invalid signature')
        return
      }

      reply.send({
        token: getLoggedToken(request.body.signature.publicKey),
      })
    },
  )
}
