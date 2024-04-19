// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
