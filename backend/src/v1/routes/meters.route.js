const express = require('express')
const router = express.Router()

const { getMeters, getMeterReadings } = require('../controllers/meters.controller')

router.route('/').get(getMeters)
router.route('/:meterId/readings').get(getMeterReadings)

module.exports = router
