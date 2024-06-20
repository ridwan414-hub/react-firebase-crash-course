import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCzl_XeR347ZyHN9wfyEgEar-sO8wWLxn4",
    authDomain: "react-firebase-crash-cou-98cf8.firebaseapp.com",
    projectId: "react-firebase-crash-cou-98cf8",
    storageBucket: "react-firebase-crash-cou-98cf8.appspot.com",
    messagingSenderId: "278306946510",
    appId: "1:278306946510:web:12f11cae95444963ad7f9f",
    measurementId: "G-PTK8JXKD1P"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)