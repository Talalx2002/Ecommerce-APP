// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";  
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKCdK_bhz6V5iMqT0ksCTo_brouYk81y0",
  authDomain: "ecommerce-app-8d674.firebaseapp.com",
  projectId: "ecommerce-app-8d674",
  storageBucket: "ecommerce-app-8d674.appspot.com",
  messagingSenderId: "598589725731",
  appId: "1:598589725731:web:dc2f5e1e8025dd7e79e596"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);