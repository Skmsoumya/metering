const express = require('express')
const router = express.Router()

const { getMeters, getMeterReadings, getIndividualMetersData } = require('../controllers/meters.controller')

router.route('/').get(getMeters)
router.route('/:meterId').get(getIndividualMetersData)
router.route('/:meterId/readings').get(getMeterReadings)

module.exports = router
