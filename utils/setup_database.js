const admin = require('firebase-admin')
const csvtojson = require('csvtojson')
const { getUnixTimestamp } = require('./utils')

const serviceAccount = require(process.env.PATH_TO_SA)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const database = admin.firestore();

/* 
  Load metering data from the csv file
*/
const getMeteringData = async (path) => {
  return await csvtojson().fromFile(path)
}

/* 
  get the initial meter details object
*/
const getInitialMeterDetails = (reading, utcDateTime, timestamp) => {
  return {
    serial: reading.Serial,
    initialWHReading: reading.WH,
    initialVARHReading: reading.VARH,
    firstReadingTimestamp: timestamp,
    firstReadingUTCDateTime: utcDateTime
  }
};

/* 
  get reading details object from reading value
*/
const getReadingDetails = (reading, timestamp, lastVARHReading, lastWHReading) => {
  return {
    timestamp: timestamp,
    VARH: reading.VARH,
    WH: reading.WH,
    UTCDateTime: reading.ReadingDateTimeUTC,
    changeInVARH: lastVARHReading ? reading.VARH - lastVARHReading : 0,
    changeInWH: lastWHReading ? reading.WH - lastWHReading : 0
  }
}

/* 
  add reading to batch
*/
const addReadingToBatch = (batch, reading, timestamp, lastVARHReading, lastWHReading) => {
  const readingRef = database.collection('meters').doc(reading.Serial).collection('readings').doc(timestamp.toString())
  batch.set(readingRef, getReadingDetails(reading, timestamp, lastVARHReading, lastWHReading))
}

/* 
  add all meters data to batch
*/
const addAllMetersDataToBatch = (batch, meters) => {
  for(let serial in meters) {
    const meterRef = database.collection("meters").doc(serial);
    batch.set(meterRef, meters[serial]);
  }
}

const setupDatabase = async () => {
  console.log("Setting up initial data to the database")

  let batch = database.batch()
  const meteringData = await getMeteringData(process.env.PATH_TO_CSV_METERING_DATA)
  const meters = {}
  let batchCounter = 0;
  for(let reading of meteringData) {
    const readingUTCDateTime = reading.ReadingDateTimeUTC
    const readingUnixTimestamp = getUnixTimestamp(reading.ReadingDateTimeUTC)

    if(!meters.hasOwnProperty(reading.Serial)) {
      meters[reading.Serial] = getInitialMeterDetails(reading, readingUTCDateTime, readingUnixTimestamp)
    }

    addReadingToBatch(batch, reading, readingUnixTimestamp, meters[reading.Serial]['latestVARHReading'], meters[reading.Serial]['latestWHReading'])
    batchCounter++

    meters[reading.Serial]['latestWHReading'] = reading.WH
    meters[reading.Serial]['latestVARHReading'] = reading.VARH
    meters[reading.Serial]['latestReadingTimestamp'] = readingUnixTimestamp
    meters[reading.Serial]['latestReadingUTCDateTime'] = readingUTCDateTime

    /* 
    To stay under the firestore batch writes limit
    */
    if(batchCounter > 250) {
      batchCounter = 0
      await batch.commit()
      batch = database.batch()
    }
  }

  addAllMetersDataToBatch(batch, meters);

  return batch.commit();
}

setupDatabase().then(() => {
  console.log("Database setup successful. Existing the process...");
  process.exit();
}).catch((err) => {
  throw err;
});