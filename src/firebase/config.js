import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration (Uses Vite environment variables or fallback values)
const firebaseConfig = {
  apiKey: "AIzaSyD_UoP5PpLeQs30ewjpKpiRBvxdqoXKOT8",
  authDomain: "golden-electricals-cc50d.firebaseapp.com",
  projectId: "golden-electricals-cc50d",
  storageBucket: "golden-electricals-cc50d.firebasestorage.app",
  messagingSenderId: "194217499499",
  appId: "1:194217499499:web:aadb75ddc3746da4624a2e",
  measurementId: "G-7PW35EVMR6"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);
export default app;
