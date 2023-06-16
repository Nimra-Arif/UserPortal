// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUbFEjmbGIU0j5DT14SgwQHZId7JJQsnE",
  authDomain: "fir-crud-8b6c2.firebaseapp.com",
  projectId: "fir-crud-8b6c2",
  storageBucket: "fir-crud-8b6c2.appspot.com",
  messagingSenderId: "455680819103",
  appId: "1:455680819103:web:54d46b92e14fec6e4087aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);