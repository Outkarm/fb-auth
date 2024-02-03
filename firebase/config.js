// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {FIREBASE_CONFIG} from "@/utils/constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = FIREBASE_CONFIG

  // measurementId: "G-DT3H3PVP9E",

  // apiKey: "AIzaSyAI6j09yYWUPQqetu58jZlvgzw2iBOxB7M",
  // authDomain: "pu-android-8c14f.firebaseapp.com",
  // projectId: "pu-android-8c14f",
  // storageBucket: "pu-android-8c14f.appspot.com",
  // messagingSenderId: "688714139273",
  // appId: "1:688714139273:web:8a283e073d996a390ca858",
  // measurementId: "G-DT3H3PVP9E"


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
