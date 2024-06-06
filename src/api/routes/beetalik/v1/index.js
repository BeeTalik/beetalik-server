'use strict'

export default async function V1(app, info) {
    app.get('/', async function (request, reply) {
        console.log(info)
        reply.send(`V1 API`)
    })
}
