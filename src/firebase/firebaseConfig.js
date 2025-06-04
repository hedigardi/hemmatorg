// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// 🔐 Ditt Firebase-konfigobjekt från Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBg-x5aoTqUD1lC3U72zqaTWgWdhHPmJ5I",
    authDomain: "hemmatorg-71af1.firebaseapp.com",
    projectId: "hemmatorg-71af1",
    storageBucket: "hemmatorg-71af1.firebasestorage.app",
    messagingSenderId: "790141476189",
    appId: "1:790141476189:web:b0565f78234cca53f81cb4",
    measurementId: "G-FZE2Z7CGR1"
  };

// 🔧 Initiera Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 🔥 Exportera Firestore-instansen
const db = getFirestore(app);

export { db };


