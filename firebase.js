// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = firebase.initializeApp({
  apiKey: "AIzaSyD5URkTEN93VGrNZCe1MtQbVszA1VcBP5I",
  authDomain: "reactnativevegis-f8fb3.firebaseapp.com",
  databaseURL: "https://reactnativevegis-f8fb3-default-rtdb.firebaseio.com",
  projectId: "reactnativevegis-f8fb3",
  storageBucket: "reactnativevegis-f8fb3.appspot.com",
  messagingSenderId: "733536075017",
  appId: "1:733536075017:web:505a1fcf90fab668eea7d8",
  measurementId: "G-S7FKN1M03Y"
});

export default app;
export const fireDB = app.firestore();