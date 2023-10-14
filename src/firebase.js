// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'royal-estate-7233e.firebaseapp.com',
  projectId: 'royal-estate-7233e',
  storageBucket: 'royal-estate-7233e.appspot.com',
  messagingSenderId: '149646276138',
  appId: '1:149646276138:web:07c573059b2d8b025eb553',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
