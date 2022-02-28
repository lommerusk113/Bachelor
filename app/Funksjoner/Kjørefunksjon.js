import { addDb } from "../config/firebasedb";
import { auth } from '../config/firebase';
import * as Location from "expo-location";

import * as TaskManager from 'expo-task-manager';
import { Alert} from 'react-native';

const TASK_NAME = 'background-location-task';

let starting = false
let time = 0
let counter = 0

// PARAMETERS
const minTimeStorage = 10
const trackEverySec = 5

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
     clockStart: "",
     clockEnd: "",
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
            storage.coords.push(ltt)
        }
      });

};


//CURRENT TIME
const getTime = (status) => {
    let today = new Date()
    console.log(status)

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

    if (status == "start") {
        storage.clockStart = hour + " : " + minutes
    }else if (status == "end"){
        storage.clockEnd = hour + " : " + minutes
    }
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
        if (pos == "start"){
            storage.startsted = response
        }
        if(pos == "slutt"){
            storage.sluttsted = response
        }
    }
}

const geoStart = async () => {
        const latitude = storage.coords[0].latitude
        const longitude = storage.coords[0].longitude

        let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        });
        storage.startsted = response
}

const populateStorage = (timer) => {
    storage.name = auth.currentUser.email
    storage.distance = distance();
    storage.duration = timer;
}

const kjører = async () => {
    counter = 0
    storage.coords = []
    storage.startsted = ""
    storage.sluttsted = ""
    //reverseGeolocation("start")
    handleTracking()
    time = Date.now()
    getTime("start")
    handleBackgroundTracking()
}

const stopping = (enableButton) => {
    try {
        Location.stopLocationUpdatesAsync("firstTask")
        counter = Math.floor((Date.now() - time) / 1000)
        if (counter > minTimeStorage){
            Promise.all([
                geoStart(),
                reverseGeolocation("slutt"),
                handleTracking(),
                populateStorage(counter),
                getTime("end")
            ]).then(() => {
                addDb(storage, enableButton)
            }).catch(err => {
                console.log(err)
                addDb(storage, enableButton)
            })
        }else{
            enableButton()
        }

    } catch (error) {
        addDb(storage, enableButton)
    }

}



export { starting, kjører, stopping, updateFunc, time}

