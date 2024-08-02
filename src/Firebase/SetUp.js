import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCyJoDYlZ49JNz5KuIjFR2bCW1dX2IyZjA",
  authDomain: "documentclosetapp.firebaseapp.com",
  projectId: "documentclosetapp",
  storageBucket: "documentclosetapp.appspot.com",
  messagingSenderId: "153030735209",
  appId: "1:153030735209:web:67b7f7a2cb21512bf6f9f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);