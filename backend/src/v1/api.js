const express = require('express')
const { errorHandler } = require('./middlewares/errorHandler.middleware')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use(errorHandler)

module.exports = router
