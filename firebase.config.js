// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqxkBxtcp4kXqXcET1eST-f_JtyB9yiVE",
  authDomain: "roamreels-technologies.firebaseapp.com",
  projectId: "roamreels-technologies",
  storageBucket: "roamreels-technologies.firebasestorage.app",
  messagingSenderId: "862212208088",
  appId: "1:862212208088:web:3cbbc0848472145ae6eead",
  measurementId: "G-595ZG3ERDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);