// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxSnnYmQJHna8xvy4sd9JnnZ-IZPG3eeI",
  authDomain: "discordhub-d3b60.firebaseapp.com",
  projectId: "discordhub-d3b60",
  storageBucket: "discordhub-d3b60.firebasestorage.app",
  messagingSenderId: "907619302427",
  appId: "1:907619302427:web:40a608d98682b35f1b0cbe",
  measurementId: "G-E6394R4V3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);