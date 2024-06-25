'use strict'

function getBearerToken(request, reply, done) {
  if (request.headers.authenticate) {
    let auth = request.headers.authenticate.match(/(Bearer) (.*)/)
    if (Array.isArray(auth) && auth[1] === 'Bearer') {
      request.token = auth[2]
    }
  }
  done()
}

export function registerBearerToken(fastifyApp) {
  fastifyApp.decorate('requireToken', (request, reply, done) => {
    if (!request.token) {
      throw 'Invalid token'
    }
    done()
  })

  return getBearerToken
}
