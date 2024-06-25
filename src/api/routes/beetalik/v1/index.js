'use strict'

export default async function V1(app) {
  app.get(
    '/',
    {
      schema: {
        description: 'Test endpoint, SHALL return "V1 API"',
        tags: ['beetalikAPI'],
        summary: 'V1 test endpoint',
        response: {
          200: {
            description: 'Successful response',
            content: {
              'text/plain': {
                schema: {
                  description: 'PLAIN output',
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    async function (request, reply) {
      reply.send(`V1 API`)
    },
  )
}
