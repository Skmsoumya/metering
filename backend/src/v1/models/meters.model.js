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
  }
}

module.exports = metersModel
