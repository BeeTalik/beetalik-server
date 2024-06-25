'use strict'

import config from 'config'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

export async function fastifyRegisterAPIDoc(fastify) {
  await fastify.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: `${config.info.name} API`,
        description: config.info.description,
        version: config.info.version,
      },
      servers: [
        {
          url: 'http://127.0.0.1:3000',
          description: 'Development (local) server',
        },
      ],
    },
  })
  await fastify.register(fastifySwaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next()
      },
      preHandler: function (request, reply, next) {
        next()
      },
    },
    staticCSP: true,
    transformStaticCSP: header => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject
    },
    transformSpecificationClone: true,
  })
}
