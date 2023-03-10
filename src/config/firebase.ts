// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from "firebase/database";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASURMENT_ID,
    // databaseURL: import.meta.env.VITE_REACT_APP_DATABASEURL,
};

// const firebaseConfig = {
//     apiKey: "AIzaSyAyODvzQMqjiStjTalwqg-DuLfEgLf7mIM",
//     authDomain: "fiftycal-ea02d.firebaseapp.com",
//     projectId: "fiftycal-ea02d",
//     storageBucket: "fiftycal-ea02d.appspot.com",
//     messagingSenderId: "41767595114",
//     appId: "1:41767595114:web:2ddd97fc2a35568e1b6e13",
//     measurementId: "G-LBPQHRBYNS"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const rtdb = getDatabase(app)
export const storage = getStorage(app)
export const imagesRef = ref(storage, 'images')
export const provider = new GoogleAuthProvider();

console.log(analytics)
