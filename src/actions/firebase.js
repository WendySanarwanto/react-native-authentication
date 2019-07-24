import firebase from 'firebase';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DB_URL, 
  FIREBASE_PROJECT_ID, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from 'react-native-dotenv';

import { CHANGE_LOGIN_STATUS } from './types';

// TODO: MOve this to .json or config file
const FIREBASE_CONFIG = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DB_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

export const doInitialiseFirebaseApp = () => (dispatch) => {
  firebase.initializeApp(FIREBASE_CONFIG);
  
  firebase.auth().onAuthStateChanged((user) => {
    dispatch({
      type: CHANGE_LOGIN_STATUS,
      payload: {
        user,
        loggedIn: user ? true : false
      }
    });
  });

};

export const doSignIn = (email, password, callback) => async(dispatch) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    if (callback) callback(null)
  } catch(signInErr) {
    console.log(`[WARN] - <firebase> Sign In using as '${email}' is failing. Details: \n`, signInErr);
    try { 
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      if (callback) callback(null)
    } catch(createUserErr) {      // Show message
      console.log(`[ERROR] - <firebase> Creating a new account with email: '${email}' is failing. Details: \n `, createUserErr);
      if (callback) callback(createUserErr)
    } 
  }
}

export const doSignOut = () => async () => {
  await firebase.auth().signOut();
}
