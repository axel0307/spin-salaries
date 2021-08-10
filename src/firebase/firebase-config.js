import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXPr12Z2axCMJuOf15KlcwnJscDVBqhKg",
  authDomain: "spin-salaries.firebaseapp.com",
  databaseURL: "https://spin-salaries-default-rtdb.firebaseio.com",
  projectId: "spin-salaries",
  storageBucket: "spin-salaries.appspot.com",
  messagingSenderId: "672463976753",
  appId: "1:672463976753:web:c209145d90279d9dab9810"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const fb = firebase;
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, auth, fb };
