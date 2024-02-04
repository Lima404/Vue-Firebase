// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3gmonD1uiKbeFK_wncZZpGASpxLDur5s",
  authDomain: "vue-firebase-f9381.firebaseapp.com",
  projectId: "vue-firebase-f9381",
  storageBucket: "vue-firebase-f9381.appspot.com",
  messagingSenderId: "353975793991",
  appId: "1:353975793991:web:1a386d770d942ddd81f462"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export { db };