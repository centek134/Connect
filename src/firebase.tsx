import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, addDoc, getDoc, serverTimestamp, doc, onSnapshot, query} from "firebase/firestore"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZNYL0Bgr9Yali5XVP1ZbdzSo99dHB8_U",
  authDomain: "contact-6b012.firebaseapp.com",
  projectId: "contact-6b012",
  storageBucket: "contact-6b012.appspot.com",
  messagingSenderId: "959799982343",
  appId: "1:959799982343:web:11b2945cf432822f1aada2",
  measurementId: "G-C3BKWBJ012"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app, collection, getDocs, doc, addDoc, getDoc, serverTimestamp, onSnapshot, query};