import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDo2LkqlrBDDh2R2tYF6IVjvadxDk8aCNw",
  authDomain: "user-manage-64a1d.firebaseapp.com",
  projectId: "user-manage-64a1d",
  storageBucket: "user-manage-64a1d.firebasestorage.app",
  messagingSenderId: "969757073142",
  appId: "1:969757073142:web:537034c0dd214f0d7096d7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
