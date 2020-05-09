const getUnixTimestamp = (utcDateTime) => {
    const r = /(\d+)/g
    const match = utcDateTime.match(r)
    return Math.round(Date.UTC(match[2], parseInt(match[1]) - 1, match[0], match[3], match[4]) / 1000);
}

exports.getUnixTimestamp = getUnixTimestamp;