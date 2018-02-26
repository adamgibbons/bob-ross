'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  S3_URL: "'//s3.us-east-2.amazonaws.com/bob-ross-explorer/img/'"
})
