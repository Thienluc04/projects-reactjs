import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCDrRC2TwPzYnMcoAAqquvDmJd8m3R4UcI",
  authDomain: "monkey-blogging-446a6.firebaseapp.com",
  projectId: "monkey-blogging-446a6",
  storageBucket: "monkey-blogging-446a6.appspot.com",
  messagingSenderId: "350356000101",
  appId: "1:350356000101:web:e38535230c12d9eabc658c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
