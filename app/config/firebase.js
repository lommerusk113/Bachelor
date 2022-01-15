import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


// Initialize Firebase

//const firebaseConfig = {
//    apiKey: Constants.manifest.extra.apiKey,
//    authDomain: Constants.manifest.extra.authDomain,
//    projectId: Constants.manifest.extra.projectId,
//    storageBucket: Constants.manifest.extra.storageBucket,
//    messagingSenderId: Constants.manifest.extra.messagingSenderId,
//    appId: Constants.manifest.extra.appId
//};

const firebaseConfig = {
    apiKey: "AIzaSyCWsMwWY-IBfy9CTXsO5e0ACn_5oRLBkEw",
    authDomain: "bacheloroppgave-f12c7.firebaseapp.com",
    projectId: "bacheloroppgave-f12c7",
    storageBucket: "bacheloroppgave-f12c7.appspot.com",
    messagingSenderId: "529406819306",
    appId: "1:529406819306:web:2f93146e43c602a6e99093"
};

// OLD /let Firebase;

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
}else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };