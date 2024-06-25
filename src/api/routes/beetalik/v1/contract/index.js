'use strict'

export default async function contract(app) {
  app.route({
    method: 'GET',
    url: '/',
    onRequest: app.auth([[app.requireToken]]),
    handler: async function (request, reply) {
      reply.send(request.token)
    },
  })
}
