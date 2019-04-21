import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCAaLjm5qMBW0isRpe18wY0UT30XdThmn4",
    authDomain: "biomed-f75f3.firebaseapp.com",
    databaseURL: "https://biomed-f75f3.firebaseio.com",
    projectId: "biomed-f75f3",
    storageBucket: "biomed-f75f3.appspot.com",
    messagingSenderId: "189957252284"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;