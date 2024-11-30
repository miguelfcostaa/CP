// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4_avI8j_F6FTbzstBr0UEcyk_foLtQxY",
  authDomain: "cpersuasiva-dff97.firebaseapp.com",
  projectId: "cpersuasiva-dff97",
  storageBucket: "cpersuasiva-dff97.firebasestorage.app",
  messagingSenderId: "66837816910",
  appId: "1:66837816910:web:891bb771fb093f64f4451f",
  measurementId: "G-8LDZ70PERC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

