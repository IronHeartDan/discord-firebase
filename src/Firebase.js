import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBSErm6B7Ri_l8Q4Xz4x70R-ReyEB8CmD4",
    authDomain: "discord-clone-42ae8.firebaseapp.com",
    databaseURL: "https://discord-clone-42ae8.firebaseio.com",
    projectId: "discord-clone-42ae8",
    storageBucket: "discord-clone-42ae8.appspot.com",
    messagingSenderId: "446082193355",
    appId: "1:446082193355:web:92cd78693a765eb905484e",
    measurementId: "G-JXKRFT6LKM"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;