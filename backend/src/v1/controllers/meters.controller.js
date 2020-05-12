const { getMeters, getMeter, getMeterReading } = require('../models/meters.model')

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
  },
  getIndividualMetersData (req, res, next) {
    try {
      if (!req.params.meterId || req.params.meterId.length === 0) {
        throw new Error('BAD-REQUEST')
      }

      getMeter(req.params.meterId).then((meterData) => {
        res.send(meterData)
      })
    } catch (err) {
      next(err)
    }
  },
  getMeterReadings (req, res, next) {
    try {
      if (!req.params.meterId || req.params.meterId.length === 0) {
        throw new Error('BAD-REQUEST')
      }
      const period = 'all'
      // const currentDate = new Date()
      // const currentTimestamp = Math.round((currentDate).getTime() / 1000)
      // const lastMonthDate = new Date()
      // lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
      // const lastMonthTimestamp = Math.round((lastMonthDate).getTime() / 1000)

      getMeter(req.params.meterId).then((meterData) => {
        return getMeterReading(req.params.meterId).then((readings) => {
          return { meterData, readings: readings }
        })
      }).then((combinedData) => {
        const data = {
          meterId: combinedData.meterData.serial,
          period: period,
          startTimestamp: combinedData.readings[0].timestamp,
          endTimestamp: combinedData.readings[combinedData.readings.length - 1].timestamp,
          readings: combinedData.readings
        }

        res.send(data)
      }).catch((err) => {
        next(err)
      })
    } catch (err) {
      next(err)
    }
  }
}
