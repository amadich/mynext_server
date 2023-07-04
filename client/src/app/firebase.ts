// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk_HNbcN2yWuhkZeA3nPjKlqqC6HDQp3M",
  authDomain: "usemaster-2566b.firebaseapp.com",
  projectId: "usemaster-2566b",
  storageBucket: "usemaster-2566b.appspot.com",
  messagingSenderId: "893784526068",
  appId: "1:893784526068:web:c015e97466d05ce7ec62a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);