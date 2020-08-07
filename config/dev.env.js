'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT:'"/api"'
  API_ROOT:'"http://api.51liaobei.com"'
  // API_ROOT:'"http://test.51liaobei.com"'

})
