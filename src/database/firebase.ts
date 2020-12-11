import { initializeApp, credential } from 'firebase-admin';
const firebase = require('../../.credentials/firebase');

// const firebaseConfig = {
//   apiKey: 'AIzaSyBIsLoW3de3FiFC9cI5vKRzZeV71o_rAdk',
//   authDomain: 'desafio-fluke-68a72.firebaseapp.com',
//   projectId: 'desafio-fluke-68a72',
//   storageBucket: 'desafio-fluke-68a72.appspot.com',
//   messagingSenderId: '44018328514',
//   appId: '1:44018328514:web:1accf6c60dc1f431bf6c5b'
// };

const app = initializeApp({
  credential: credential.cert(firebase)
});
// linha 14: equivalente a import { firestore } from 'firebase-admin'
export const firestore = app.firestore();
