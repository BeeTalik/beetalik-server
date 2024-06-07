'use strict'

import { describe } from 'node:test'

import libs from './libs/index.js'
describe('Libs Tests', libs)

import api from './api/index.js'
describe('API Tests', api)

import controllers from './controllers/index.js'
describe('Controllers Tests', controllers)
