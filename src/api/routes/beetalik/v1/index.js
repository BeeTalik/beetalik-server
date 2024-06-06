'use strict'

export default async function V1(app) {
    app.get('/', async function (request, reply) {
        reply.send(`V1 API`)
    })
}
