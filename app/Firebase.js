import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNO7yph74_VDtL6xzcB35qospGzT1auRE",
  authDomain: "keep-notes-bfb6a.firebaseapp.com",
  projectId: "keep-notes-bfb6a",
  storageBucket: "keep-notes-bfb6a.appspot.com",
  messagingSenderId: "727074664696",
  appId: "1:727074664696:web:4d80d763a1bd7b00b08b0d",
  measurementId: "G-CNRGD66ELC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth };
export default db;
