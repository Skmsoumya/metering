const { getMeters } = require('../models/meters.model')

module.exports = {
  getMeters (req, res, next) {
    try {
      getMeters().then(meters => {
        res.send(meters)
      })
    } catch (err) {
      next(err)
    }
  }
}
