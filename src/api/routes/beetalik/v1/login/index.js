'use strict'

'use strict'

import {
  verifyLoginChallenge,
  verifySignature,
  getLoggedToken,
} from '../../../../../controllers/login/index.js'

export default async function loginChallenge(app) {
  app.post('/', async function (request, reply) {
    if (!request.body?.challenge) {
      reply.status(400).send('Challenge is required')
    }
    if (!request.body?.signature) {
      reply.status(400).send('Signature is required')
    }
    if (
      !request.body?.signature?.signature ||
      !request.body?.signature?.publicKey
    ) {
      reply.status(400).send('Invalid signature')
    }

    if (!verifyLoginChallenge(request.body.challenge)) {
      reply.status(400).send('Invalid challenge')
    }

    if (!verifySignature(request.body.challenge, request.body.signature)) {
      reply.status(400).send('Invalid signature')
    }

    reply.send({
      token: getLoggedToken(request.body.signature.publicKey),
    })
  })
}
