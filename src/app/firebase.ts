import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDCKj4TCwZn59n-_K7cTtca9vdH9pFmYC0",
    authDomain: "get-me-hooked.firebaseapp.com",
    databaseURL: "https://get-me-hooked.firebaseio.com",
    projectId: "get-me-hooked",
    storageBucket: "get-me-hooked.appspot.com",
    messagingSenderId: "42054237353"
  };

  const app = firebase.initializeApp(config);

  export default app