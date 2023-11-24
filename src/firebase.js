// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCzniHYEFU1Sc6LkuolVsSSjXY1AnLB0Kw",
    authDomain: "movix-c5472.firebaseapp.com",
    projectId: "movix-c5472",
    storageBucket: "movix-c5472.appspot.com",
    messagingSenderId: "387582518478",
    appId: "1:387582518478:web:b1f988bb6b5766d8d2dc9f",
    measurementId: "G-YZ8YHY1QFJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {

    users: firestore.collection('users'),
    movies: firestore.collection('posts'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();