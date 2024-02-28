// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getDatabase,
  ref,
  push,
  remove,
  set,
} from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW-b8iO0taACpIv_6FOQcalle-N1LBUMQ",
  authDomain: "netflix-502c3.firebaseapp.com",
  projectId: "netflix-502c3",
  storageBucket: "netflix-502c3.appspot.com",
  messagingSenderId: "192889434600",
  appId: "1:192889434600:web:d08ca3191e9889f66ff45d",
  measurementId: "G-DLG9DS610M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Add this line to get the database object

export const auth = getAuth();
export { database, push, ref, remove, set }; // Include database in the export
