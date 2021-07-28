import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyDMcKO0SwY4O2cWZEJwoSjuKGDaz8cRR6M",
    authDomain: "whats-app-clone-aecdf.firebaseapp.com",
    projectId: "whats-app-clone-aecdf",
    storageBucket: "whats-app-clone-aecdf.appspot.com",
    messagingSenderId: "562206684869",
    appId: "1:562206684869:web:b06eef5127a0b69aaaa2ac"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db =firebase.firestore();

  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export{auth,provider};

  export default db;

  