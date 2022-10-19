
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC46Fn1JsSXPJxIptYZQXqubxhl_7JvaZ4",
  authDomain: "ia-calendar-33249.firebaseapp.com",
  databaseURL: "https://ia-calendar-33249-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ia-calendar-33249",
  storageBucket: "ia-calendar-33249.appspot.com",
  messagingSenderId: "404312708347",
  appId: "1:404312708347:web:b8f40aae45cfcc6f7e0c5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()
