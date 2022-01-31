import { addDb } from "../config/firebasedb";
import { auth } from '../config/firebase';
import * as Location from "expo-location";

let starting = false
let counter = 0


 // TO BE STORED
 let storage =
 {
     name: "",
     duration: counter,
     distance: "",
     coords: [],
     title: "",
     time: "",
     date: "",
     clock: "",
 }

 const updateFunc = (param) => {
    starting = param
 }

// ASK PERMISSION AND TRACK USER
const handleTracking = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    // USER DID NOT ACCEPT
    if (status !== "granted"){
        setErrorMsg('Permission to access location was denied');
        return;
    }
    //USER HAS ACCEPTED
    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
    if(location){
        storage.coords.push(location);
    }
}


//CURRENT TIME
const getTime = () => {
    let today = new Date()
    storage.time = today;
    storage.date = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear()

    let hour =  today.getUTCHours() + 1
    let minutes = today.getMinutes();

    if (hour < 10){hour = "0" + hour}
    if (minutes < 10){minutes = "0" + minutes}

    storage.clock = hour + " : " + minutes
}


//CALCULATE DISTANCE
const distance = () => {
    let dist = 0
    storage.coords.forEach((element, index) => {
        if ((index + 1) != storage.coords.length){
            let lat1 = element.coords.latitude
            let lon1 = element.coords.longitude
            let lat2 = storage.coords[index + 1].coords.latitude
            let lon2 = storage.coords[index + 1].coords.longitude
            dist = dist + calcDistance(lat1, lat2, lon1, lon2)
        }
    })
    return  (dist).toFixed(3)
}



const calcDistance = (lat1, lat2, lon1, lon2) => {
    // CALCULATE THE DATA
    const R = 6371e3; // metres
    const latitude1 = lat1 * Math.PI/180; // φ, λ in radians
    const latitude2 = lat2 * Math.PI/180;
    const deltaLatitude = (lat2-lat1) * Math.PI/180;
    const deltaLongitude = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(deltaLatitude/2) * Math.sin(deltaLatitude/2) +
            Math.cos(latitude1) * Math.cos(latitude2) *
            Math.sin(deltaLongitude/2) * Math.sin(deltaLongitude/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = (R * c) / 1000; //KM
    return d
}


const start = () => {
    starting = true
}

const stop = () => {
    starting = false
}


const kjører = () => {
    const track = setInterval(()=> {

        if (counter % 5 == 0){
            console.log("tracking ")
            handleTracking()
        }
        if (!starting){
            clearInterval(track);
            return
        }
        counter ++;
    }, 1000)
}

const stopping = () => {
    handleTracking()
    let timer = counter
    console.log(timer)
    const user = auth.currentUser
    storage.name = user.email
    storage.distance = distance();
    storage.duration = timer;
    getTime()

    if (counter > 10){
        addDb(storage)
    }
    counter = 0
    storage.coords = []

}



export { starting, kjører, stopping, updateFunc, counter }