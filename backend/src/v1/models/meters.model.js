const { firestore } = require('../utils/firebase.util')

const metersModel = {
  /*
      Get a list of meters present in the system
  */
  getMeters () {
    return firestore.collection('meters').get()
      .then((snapshot) => {
        const meters = []
        if (snapshot.empty) {
          return meters
        }

        snapshot.forEach((doc) => {
          meters.push(doc.data())
        })

        return meters
      })
  }
}

module.exports = metersModel
