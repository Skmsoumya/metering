const { getUnixTimestamp } = require("./utils")

test('should convert a utc date time to a unix time stamp in seconds', () => {
    const UTCDateTime = '23/03/2020 04:30'
    const unixTimestamp = getUnixTimestamp(UTCDateTime)
    expect(unixTimestamp).toBe(1584937800)
})
