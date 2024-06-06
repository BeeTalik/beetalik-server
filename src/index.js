'use strict'

import config from 'config'

import startApi from './api/index.js'
startApi({
    ...config.server,
    info: config.info
})
