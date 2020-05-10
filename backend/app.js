const express = require('express')
const cors = require('cors')

const v1Router = require('./src/v1/api')

const app = express()

// const whitelist = ['http://localhost:3000']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(cors())
app.use('/api/v1/', v1Router)

module.exports = app
