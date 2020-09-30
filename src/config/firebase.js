import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBpuR-S22M0WnCo0-iQI94Fo5E1r7ALedc",
    authDomain: "blogframeworks.firebaseapp.com",
    databaseURL: "https://blogframeworks.firebaseio.com",
    projectId: "blogframeworks",
    storageBucket: "blogframeworks.appspot.com",
    messagingSenderId: "291878683328",
    appId: "1:291878683328:web:c4595fc170cfc731f6a325",
    measurementId: "G-2W9Y94K8SB"
};

firebase.initializeApp(config);

export default firebase;