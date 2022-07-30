import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwDNuJIeJoinfM_4UMmhu36aLWzRfbjyw",
    authDomain: "instagram-clone-71b88.firebaseapp.com",
    projectId: "instagram-clone-71b88",
    storageBucket: "instagram-clone-71b88.appspot.com",
    messagingSenderId: "881581819391",
    appId: "1:881581819391:web:e79bc6d6a142bb493653ca",
    measurementId: "G-T30WD4VJKH"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };
  