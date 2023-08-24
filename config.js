import * as firebase from "firebase"
export const firebaseConfig = {
  apiKey: "AIzaSyAzI7XqSSj21IQKq_DYf0vW6KJaA_M2W7o",
  authDomain: "story-edb2e.firebaseapp.com",
  databaseURL: "https://story-edb2e-default-rtdb.firebaseio.com",
  projectId: "story-edb2e",
  storageBucket: "story-edb2e.appspot.com",
  messagingSenderId: "864628816253",
  appId: "1:864628816253:web:3b886b01c84f9a082f7414"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };