var admin = require("firebase-admin");

var serviceAccount = require(process.env.ADMIN_ACC);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://interndemo-25232.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };