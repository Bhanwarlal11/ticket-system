// backend/firebase.js

const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("../firebase-service-account.json"); // Path to your Firebase service account file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
