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
