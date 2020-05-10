const express = require('express')

const app = express()

app.use('/', () => 'hello world!')

module.exports = app
