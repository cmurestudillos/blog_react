import firebase from "firebase/app";
import 'firebase/app';
import 'firebase/auth';
import {key} from '../config/key';

const firebaseConfig = {
    apiKey: key.apiKey,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);

export default Firebase;