
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgmWuoYhAuu81AuWiQFoeviUU-NkGCo-M",
  authDomain: "fir-a8c73.firebaseapp.com",
  projectId: "fir-a8c73",
  storageBucket: "fir-a8c73.appspot.com",
  messagingSenderId: "721156180989",
  appId: "1:721156180989:web:35d924acb7eaf78c58a794",
  measurementId: "G-KFQFKTGREQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;