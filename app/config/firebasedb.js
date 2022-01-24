import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, addDoc, query, where, onSnapshot, updateDoc, doc, setDoc, deleteDoc} from "firebase/firestore"
import { ImageBackgroundBase } from "react-native";


const firebaseConfig = {
    apiKey: "AIzaSyCWsMwWY-IBfy9CTXsO5e0ACn_5oRLBkEw",
    authDomain: "bacheloroppgave-f12c7.firebaseapp.com",
    projectId: "bacheloroppgave-f12c7",
    storageBucket: "bacheloroppgave-f12c7.appspot.com",
    messagingSenderId: "529406819306",
    appId: "1:529406819306:web:2f93146e43c602a6e99093"
};


initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, "Kjøreturer")



// ADD KJØRETUR TO DB
const addDb = async (data) => {
    addDoc(colRef, data)
    .then(() => {
        // DO SOMETHING
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