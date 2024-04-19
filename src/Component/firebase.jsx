// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABiGna9pSuelixJ31mVMD-UDICnyTfUoQ",
  authDomain: "store-56343.firebaseapp.com",
  projectId: "store-56343",
  storageBucket: "store-56343.appspot.com",
  messagingSenderId: "229281471965",
  appId: "1:229281471965:web:5383e56cd5bd43348a2a34",
  measurementId: "G-NYQXRDGZJ8",
  databaseURL: "https://store-56343-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);



