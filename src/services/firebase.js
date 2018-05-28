// Initialize Firebase
import firebase from 'firebase'


let app = firebase.initializeApp(config);
let db = app.database();
let auth = app.auth();
let provider = new firebase.auth.GoogleAuthProvider();
let storage = app.storage();

export default {
  getDb () {
    return db
  },
  getAuth () {
    return auth
  },
  getStorage () {
    return storage
  },
  getGoogleAuthProvider () {
    return provider
  }
}
   