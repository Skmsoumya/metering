const { firestore } = require('../utils/firebase.util')

const formatMetersSnapToArrayObj = (snapshot) => {
  const meters = []
  if (snapshot.empty) {
    return meters
  }

  snapshot.forEach((doc) => {
    meters.push(doc.data())
  })

  return meters
}

const metersModel = {
  /*
      Get a list of meters present in the system
  */
  getMeters (filterById) {
    let ref = firestore.collection('meters')

    if (filterById) {
      ref = ref.where('serial', '==', filterById)
    }

    return ref.get()
      .then(formatMetersSnapToArrayObj)
  },
  getMeter (meterId) {
    return firestore.collection('meters').doc(meterId).get().then((doc) => {
      if (!doc.exists) {
        throw new Error('RESOURCE-NOT-FOUND')
      }

      return doc.data()
    })
  },
  getMeterReading (meterId, startFromTimestamp, endAtTimestamp) {
    let ref = firestore.collection('meters').doc(meterId).collection('readings')

    if (startFromTimestamp) {
      ref = ref.where('timestamp', '>=', startFromTimestamp)
    }

    if (endAtTimestamp) {
      ref = ref.where('timestamp', '<', endAtTimestamp)
    }

    return ref
      .get().then((snapShot) => {
        const readings = []

        if (snapShot.empty) {
          return []
        }

        snapShot.forEach(snap => {
          const data = snap.data()
          data.WH = parseInt(data.WH)
          data.VARH = parseInt(data.VARH)
          readings.push(data)
        })

        return readings
      })
  }
}

module.exports = metersModel
