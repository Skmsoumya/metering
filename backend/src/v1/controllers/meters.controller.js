const { getMeters } = require('../models/meters.model')

module.exports = {
  getMeters (req, res, next) {
    try {
      const getMetersPromise = req.query.searchById ? getMeters(req.query.searchById) : getMeters()
      getMetersPromise.then(meters => {
        res.send(meters)
      })
    } catch (err) {
      next(err)
    }
  }
}
