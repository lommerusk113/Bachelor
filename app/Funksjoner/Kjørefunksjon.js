import { addDb } from "../config/firebasedb";
import { auth } from '../config/firebase';
import * as Location from "expo-location";

import * as TaskManager from 'expo-task-manager';

const TASK_NAME = 'background-location-task';

let starting = false
let time = 0
let counter = 0

// PARAMETERS
const minTimeStorage = 10
const trackEverySec = 2

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
     startsted: "",
     sluttsted: "",
 }

 const updateFunc = (param) => {
    starting = param
 }

// ASK PERMISSION AND TRACK USER
const handleTracking = async () => {
    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
    if(location){
        storage.coords.push(location.coords);
    }
};

const handleBackgroundTracking = async () => {
    //USER HAS ACCEPTED
    await Location.startLocationUpdatesAsync("firstTask", {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: trackEverySec * 1000,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
            notificationTitle: 'Ekbok',
            notificationBody: 'Tracking Location!'
          },
          pausesUpdatesAutomatically: false,
    });

    TaskManager.defineTask("firstTask", ({ data, error }) => {
        if (error) {
            console.log("An error has occured")
          return;
        }
        if (data) {
            const { locations } = data;
            // do something with the locations captured in the background
            //console.log(locations)
            let c = counter = Math.floor((Date.now() - time) / 1000)
            let ltt = locations[0].coords
            console.log(c)
            storage.coords.push(ltt)
        }
      });

};


//CURRENT TIME
const getTime = () => {
    let today = new Date()

    storage.time = today;

    let year = today.getFullYear()
    let month = (today.getMonth() + 1)
    let day = today.getDate()

    if (month < 10){ month = "0" + month}
    if (day < 10){day = "0" + day}
    storage.date =  day + "." + month + "." + year

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
            let lat1 = element.latitude
            let lon1 = element.longitude
            let lat2 = storage.coords[index + 1].latitude
            let lon2 = storage.coords[index + 1].longitude
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




const reverseGeolocation = async (pos) => {
    let {coords} = await Location.getCurrentPositionAsync();
    if (coords) {
        const{ latitude, longitude } = coords;

        let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        });
        for (let item of response) {
            let address = `${item.street}, ${item.subregion}`;
            if (pos == "start"){
                storage.startsted = address
            }
            if(pos == "slutt"){
                storage.sluttsted = address
            }
        }
    }
}

const populateStorage = (timer) => {
    storage.name = auth.currentUser.email
    storage.distance = distance();
    storage.duration = timer;

}

const kjører = async () => {
    // ADD ALERT TO EXPLAIN TO USER!
    let {status} = await Location.requestBackgroundPermissionsAsync();
    // USER DID NOT ACCEPT
    if (status !== "granted"){
        setErrorMsg('Permission to access location was denied');
        stopping()
        return;
    }else{
        reverseGeolocation("start")
        handleTracking()
        time = Date.now()
        handleBackgroundTracking()
    }
}

const stopping = () => {

    Location.stopLocationUpdatesAsync("firstTask")
    Promise.all([
        reverseGeolocation("slutt"),
        handleTracking(),
        populateStorage(counter),
        getTime()
    ]).then(() => {
        if (counter > minTimeStorage){
            addDb(storage)
        }
        counter = 0
        storage.coords = []
        storage.startsted = ""
        storage.sluttsted = ""
    })



}



export { starting, kjører, stopping, updateFunc, time }