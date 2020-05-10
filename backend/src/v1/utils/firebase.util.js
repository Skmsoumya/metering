const admin = require('firebase-admin')

if (process.env.NODE_ENV !== 'production') {
  const serviceAccount = require(process.env.PATH_TO_SA)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
} else {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  })
}

module.exports = {
  firestore: admin.firestore()
}
