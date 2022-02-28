import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, addDoc, query, where, onSnapshot, updateDoc, doc, setDoc, deleteDoc} from "firebase/firestore"
import Constants from 'expo-constants';


// Initialize Firebase
const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId
};

initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, "Kjøreturer")



// ADD KJØRETUR TO DB
const addDb = async (data, enableButton) => {
    addDoc(colRef, data)
    .then((response) => {
        enableButton()
    }).catch((error) => {
        enableButton()
    })
}

//UPDATE TITLE
const updateTitle = async ( data, id ) => {
    await setDoc(doc(db, "Kjøreturer", id), data)
}

//DELETE TRIP
const deleteDB = async (id) => {
    await deleteDoc(doc(db, "Kjøreturer", id));
}

export {addDb, updateTitle, deleteDB}