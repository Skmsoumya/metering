const app = require('express')()
const request = require('supertest')

const router = require('./meters.route')

app.use('/', router)

describe('Meters endpoint', () => {
  it('Should return a list of meters', async () => {
    const res = await request(app)
      .get('/meters')
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
      .get(`/meters?searchById=${meterId}`)
      .send()
    expect(res.body.length).toBe(1)
    expect(res.body[0].serial).toBe(meterId)
  })

  it('Should return an empty array when there is no meter with specified ID in the system', async () => {
    const meterId = 'METER000012'
    const res = await request(app)
      .get(`/meters?searchById=${meterId}`)
      .send()

    expect(res.body.length).toBe(0)
  })
})

describe('Meater\'s reading endpoint', () => {
  it('should respond with a list of reading for each valid meter id', async () => {
    const meterId = 'METER000001'
    const res = await request(app)
      .get(`/meters/${meterId}/readings`).send()

    expect(res.statusCode).toBe(200)
    expect(res.body).not.toBeUndefined()
    expect(res.body.meterId).toBe(meterId)
    expect(res.body.period).toBe('last_month')

    expect(typeof res.body.startTimestamp).toBe('number')
    expect(res.body.startTimestamp).not.toBe(0)

    expect(typeof res.body.endTimestamp).toBe('number')
    expect(res.body.endTimestamp).not.toBe(0)

    expect(typeof res.body.readings).toBe('array')

    if (res.body.readings.length > 0) {
      const aReading = res.body[0]
      expect(aReading).not.toBeUndefined()

      expect(typeof aReading.readingTimestampUnix).toBe('number')
      expect(aReading.readingTimestampUnix).not.toBe(0)

      expect(typeof aReading.wattHour).toBe('number')
      expect(typeof aReading.varh).toBe('number')
      expect(typeof aReading.changeInVARH).toBe('number')
      expect(typeof aReading.changeInWH).toBe('number')
    }
  })

  it('should respond with 404 error if meter not found on system', async () => {
    const meterId = 'METER0000012'
    const res = await request(app)
      .get(`/meters/${meterId}/readings`).send()

    expect(res.statusCode).toBe(404)
  })
})
