// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhV-b3e7N4UZITgh9pgbl4SR7koVK28NE",
  authDomain: "reactnativevegis.firebaseapp.com",
  projectId: "reactnativevegis",
  storageBucket: "reactnativevegis.appspot.com",
  messagingSenderId: "564437309320",
  appId: "1:564437309320:web:a728e8203ad2ead56acc3d",
  measurementId: "G-CCG6Z5VBV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);