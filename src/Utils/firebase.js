// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { get } from "lodash";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW-b8iO0taACpIv_6FOQcalle-N1LBUMQ",
  authDomain: "netflix-502c3.firebaseapp.com",
  projectId: "netflix-502c3",
  storageBucket: "netflix-502c3.appspot.com",
  messagingSenderId: "192889434600",
  appId: "1:192889434600:web:d08ca3191e9889f66ff45d",
  measurementId: "G-DLG9DS610M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const database = getDatabase();
