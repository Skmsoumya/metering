const express = require('express')
const v1Router = require('./src/v1/api')

const app = express()

app.use('/api/v1/', v1Router)

module.exports = app
