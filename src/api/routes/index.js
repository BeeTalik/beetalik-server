'use strict'

import config from 'config'

export default async function MainRoute(app) {
  app.get('/', async function (request, reply) {
    let devExtra = ''
    if (request.devMode === true) {
      devExtra = `DEVELOPMENT MODE ENABLED: ${request.overviewRoutes.map(x => `<a href='${x}'>${x}</a>`).join(', ')})`
    }
    reply.header('content-type', 'text/html').send(`<!DOCTYPE html>
<html>
<head>
<title>${config.info.name} version ${config.info.version}</title>
</head>
<body>
<h1>Welcome to ${config.info.name} version ${config.info.version}</h1>
<p>${devExtra}</p>
</body>
</html>`)
  })
}
