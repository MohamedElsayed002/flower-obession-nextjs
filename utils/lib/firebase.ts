// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZgG3CLTl1CGSSiMBJVIemFGDL51FpUJU",
  authDomain: "booking-app-6a26a.firebaseapp.com",
  projectId: "booking-app-6a26a",
  storageBucket: "booking-app-6a26a.firebasestorage.app",
  messagingSenderId: "639231971358",
  appId: "1:639231971358:web:c131045504746b166fde0f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();