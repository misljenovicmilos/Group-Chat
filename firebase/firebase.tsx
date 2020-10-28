import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"

const config = {
    apiKey: "AIzaSyBm35AaXXOVjEzmoa9vEcUzDtjEaij6kzc",
    authDomain: "messenger-clone-praksa.firebaseapp.com",
    databaseURL: "https://messenger-clone-praksa.firebaseio.com",
    projectId: "messenger-clone-praksa",
    storageBucket: "messenger-clone-praksa.appspot.com",
    messagingSenderId: "70857218645",
    appId: "1:70857218645:web:771ed6b18a3afcb66f52dc",
    measurementId: "G-JWYMB0KCLV"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
