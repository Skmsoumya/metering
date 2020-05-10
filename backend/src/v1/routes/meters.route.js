const express = require('express')
const router = express.Router()

const { getMeters, getMeterReadings } = require('../controllers/meters.controller')

router.route('/meters').get(getMeters)
router.route('/meters/:meterId/readings').get(getMeterReadings)

module.exports = router
