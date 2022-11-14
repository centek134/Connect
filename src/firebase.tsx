import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, addDoc, getDoc, serverTimestamp, doc, onSnapshot, query, orderBy} from "firebase/firestore"
import {getStorage, ref, uploadBytes, list, getDownloadURL, listAll} from "firebase/storage"

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, app, collection, getDocs, doc, addDoc, getDoc, serverTimestamp, onSnapshot, query, orderBy, storage, ref, uploadBytes, list, getDownloadURL, listAll};