import firebase from 'firebase';
import { CHANGE_LOGIN_STATUS } from './types';

// TODO: MOve this to .json or config file
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDf6UWB0FEs4-biGOUW1MCo4dkPqtDF5xY',
  authDomain: 'rn-authentication-505a8.firebaseapp.com',
  databaseURL: 'https://rn-authentication-505a8.firebaseio.com',
  projectId: 'rn-authentication-505a8',
  storageBucket: 'rn-authentication-505a8.appspot.com',
  messagingSenderId: '749524062865'
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