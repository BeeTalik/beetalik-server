'use strict'

import Fastify from 'fastify'
import autoLoad from '@fastify/autoload'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export async function build(opts) {
    const fastify = Fastify(opts)

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    fastify.register(autoLoad, {
        dir: join(__dirname, 'routes'),
    })

    return fastify
}
