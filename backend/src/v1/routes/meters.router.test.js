const app = require('express')()
const request = require('supertest')

const router = require('./meters.route')

app.use('/', router)

describe('Meters endpoint', () => {
  it('Should return a list of meters', async () => {
    const res = await request(app)
      .get('/')
      .send()

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    if (res.body.length > 0) {
      expect(res.body[0]).not.toBeUndefined()
      expect(typeof res.body[0].serial).toBe('string')
      expect(res.body[0].serial).not.toBeUndefined()

      expect(typeof res.body[0].firstReadingTimestamp).toBe('number')
      expect(res.body[0].firstReadingTimestamp).not.toBeUndefined()

      expect(typeof res.body[0].latestReadingTimestamp).toBe('number')
      expect(res.body[0].latestReadingTimestamp).not.toBeUndefined()

      expect(typeof res.body[0].firstReadingUTCDateTime).toBe('string')
      expect(res.body[0].firstReadingUTCDateTime).not.toBeUndefined()

      expect(typeof res.body[0].latestReadingUTCDateTime).toBe('string')
      expect(res.body[0].latestReadingUTCDateTime).not.toBeUndefined()

      expect(typeof res.body[0].initialVARHReading).toBe('string')
      expect(res.body[0].initialVARHReading).not.toBeUndefined()

      expect(typeof res.body[0].latestVARHReading).toBe('string')
      expect(res.body[0].latestVARHReading).not.toBeUndefined()

      expect(typeof res.body[0].initialWHReading).toBe('string')
      expect(res.body[0].initialWHReading).not.toBeUndefined()

      expect(typeof res.body[0].latestWHReading).toBe('string')
      expect(res.body[0].latestWHReading).not.toBeUndefined()
    }
  })

  it('Should accept a search parameter and filter the list of meters accordingly', async () => {
    const meterId = 'METER000001'
    const res = await request(app)
      .get(`/?searchById=${meterId}`)
      .send()
    expect(res.body.length).toBe(1)
    expect(res.body[0].serial).toBe(meterId)
  })

  it('Should return an empty array when there is no meter with specified ID in the system', async () => {
    const meterId = 'METER000012'
    const res = await request(app)
      .get(`/?searchById=${meterId}`)
      .send()

    expect(res.body.length).toBe(0)
  })
})

describe('individual meter endpoint', () => {
  it('should respond with the individual meters data for each valid meter ID', async () => {
    const meterId = 'METER000001'
    const res = await request(app)
      .get(`/${meterId}`).send()

    expect(res.statusCode).toBe(200)
    expect(res.body.serial).toBe(meterId)

    expect(typeof res.body.firstReadingTimestamp).toBe('number')
    expect(res.body.firstReadingTimestamp).not.toBeUndefined()

    expect(typeof res.body.latestReadingTimestamp).toBe('number')
    expect(res.body.latestReadingTimestamp).not.toBeUndefined()

    expect(typeof res.body.firstReadingUTCDateTime).toBe('string')
    expect(res.body.firstReadingUTCDateTime).not.toBeUndefined()

    expect(typeof res.body.latestReadingUTCDateTime).toBe('string')
    expect(res.body.latestReadingUTCDateTime).not.toBeUndefined()

    expect(typeof res.body.initialVARHReading).toBe('string')
    expect(res.body.initialVARHReading).not.toBeUndefined()

    expect(typeof res.body.latestVARHReading).toBe('string')
    expect(res.body.latestVARHReading).not.toBeUndefined()

    expect(typeof res.body.initialWHReading).toBe('string')
    expect(res.body.initialWHReading).not.toBeUndefined()

    expect(typeof res.body.latestWHReading).toBe('string')
    expect(res.body.latestWHReading).not.toBeUndefined()
  })
})

describe('Meter\'s reading endpoint', () => {
  it('should respond with a list of reading for each valid meter id', async () => {
    const meterId = 'METER000001'
    const res = await request(app)
      .get(`/${meterId}/readings`).send()

    expect(res.statusCode).toBe(200)
    expect(res.body).not.toBeUndefined()
    expect(res.body.meterId).toBe(meterId)
    expect(res.body.period).toBe('last_month')

    expect(typeof res.body.startTimestamp).toBe('number')
    expect(res.body.startTimestamp).not.toBe(0)

    expect(typeof res.body.endTimestamp).toBe('number')
    expect(res.body.endTimestamp).not.toBe(0)

    expect(Array.isArray(res.body.readings)).toBe(true)

    if (res.body.readings.length > 0) {
      const aReading = res.body.readings[0]
      expect(aReading).not.toBeUndefined()

      expect(typeof aReading.timestamp).toBe('number')
      expect(aReading.timestamp).not.toBe(0)

      expect(typeof aReading.WH).toBe('number')
      expect(typeof aReading.VARH).toBe('number')
      expect(typeof aReading.changeInVARH).toBe('number')
      expect(typeof aReading.changeInWH).toBe('number')
      expect(typeof aReading.UTCDateTime).toBe('string')
    }
  })
})
