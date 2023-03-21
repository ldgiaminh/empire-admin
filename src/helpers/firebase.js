// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAPtftCfGOJfkIlRcoQ4QoJTwP1xXuBlm8",
  authDomain: "empirefirebase.firebaseapp.com",
  databaseURL:
    "https://empirefirebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "empirefirebase",
  storageBucket: "empirefirebase.appspot.com",
  messagingSenderId: "120247352484",
  appId: "1:120247352484:web:e267ed43c28f5ca580fa31",
  measurementId: "G-XBJLT0HTXL",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
