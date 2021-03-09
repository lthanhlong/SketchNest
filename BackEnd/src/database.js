const app = require("./index");
const admin = require("firebase-admin");
const serviceAccount = require("../assets/logindemo-9d736-firebase-adminsdk-zrs08-63eb7971b4.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://logindemo-9d736.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: "my-service-worker",
  },
});
const db= admin.firestore();
module.exports = db;
