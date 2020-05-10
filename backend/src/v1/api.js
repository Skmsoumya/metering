const express = require('express')
const { errorHandler } = require('./middlewares/errorHandler.middleware')

const metersRouter = require('./routes/meters.route')

const router = express.Router()

router.use('/meters', metersRouter)

router.use(errorHandler)

module.exports = router
