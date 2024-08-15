// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-Y-unuJ1Xks-2ceRctIT6Ru7xbGU-ENk",
    authDomain: "albert-sharing.firebaseapp.com",
    projectId: "albert-sharing",
    storageBucket: "albert-sharing.appspot.com",
    messagingSenderId: "106375152858",
    appId: "1:106375152858:web:5d13d7ce1df160416211e3",
    measurementId: "G-88LHSBQY4L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);