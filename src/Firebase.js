// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3lJ5pIh4GvlOOU9lQ9w7NFLf2Ym1AkfY",
  authDomain: "movie-6f5fe.firebaseapp.com",
  projectId: "movie-6f5fe",
  storageBucket: "movie-6f5fe.firebasestorage.app",
  messagingSenderId: "778315983442",
  appId: "1:778315983442:web:fc30289a85254b97270d8b",
  measurementId: "G-DKNGD97Y78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();