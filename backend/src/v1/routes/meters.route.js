const express = require('express')
const router = express.Router()

const { getMeters } = require('../controllers/meters.controller')

router.route('/meters').get(getMeters)

module.exports = router
