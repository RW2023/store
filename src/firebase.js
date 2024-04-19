import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyABiGna9pSuelixJ31mVMD-UDICnyTfUoQ",
    authDomain: "store-56343.firebaseapp.com",
    databaseURL: "https://store-56343-default-rtdb.firebaseio.com",
    projectId: "store-56343",
    storageBucket: "store-56343.appspot.com",
    messagingSenderId: "229281471965",
    appId: "1:229281471965:web:5383e56cd5bd43348a2a34",
    measurementId: "G-NYQXRDGZJ8"
  };

  const app = firebase.initializeApp(firebaseConfig)
  export const db = firebase.firestore()
