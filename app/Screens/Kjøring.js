import React from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, Pressable} from 'react-native';
import styles from "../Styles/Styles"
import {useState, useEffect} from "react";
import {starting, handleStateChange, updateCounter} from "../Funksjoner/kjøringbutton"
import { auth } from '../config/firebase';
import { addDb } from "../config/firebasedb"
import Stopwatch from "../Components/Stopwatch"

import * as Location from "expo-location";

const Kjøring = ({ route: {params}}) => {
    // HVILKEN KNAPP SKAL VISES
    const [start, setStart] = useState();

    // TRACKING
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);



    // TO BE STORED
    let storage =
        {
            name: auth.currentUser.email,
            duration: 0,
            distance: "",
            coords: [],
            title: "",
        }



    //FOR Å STOPPE FUNKSJONEN
    let stop = false

    // VENT X ANTALL MS
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    //BRUKER HAR TRYKT PÅ STARTKNAPPEN
    const handleStart = async () => {
        setStart(true)
        handleStateChange(true)
        console.log("Starting")
        stop = false
      };

    //BRUKEN HAR TRYKKET PÅ STOPP KNAPPEN
    const handleStop = () => {
        stop = true
        setStart(false)
        handleStateChange(false)
    };

    // ASK PERMISSION AND TRACK USER
    const handleTracking = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        // USER DID NOT ACCEPT
        if (status !== "granted"){
            setErrorMsg('Permission to access location was denied');
            return;
        }
        //USER HAS ACCEPTED
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        if(location){
            storage.coords.push(location);
        }
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


    useEffect (async () => {
        // PAGE HAS NOT BEEN REFRESHED AND BUTTON HAS BEEN STARTED
        if (start && starting)
            // WHILE BUTTON IS STARTED
            for (let i = 0; i < Infinity; i++) {
                // TRACK USER EVERY 10 SEC
                updateCounter(i)
                if (i % 5 === 0){
                    handleTracking()
                }
                // USER HAS STOPPED
                if (starting == false){
                    console.log("Stopped")
                    storage.duration = i;
                    //CALCULATE DISTANCE
                   storage.distance = distance();
                   //STORE TO DATABASE
                   if(i > 10){
                    addDb(storage)
                   }
                    return;
                }
                await sleep(1000)
            }
    }, [start])


    return (
        <SafeAreaView style={styles.container}>
            {/* LOGO */}
            <Image style={styles.logo} source={require("../Images/logo.png")}/>
            <Text style={styles.header}>Kjøring</Text>

            <View>
                {!starting?
                    //START KNAPP
                    <View style={styles.startContainer}>
                        <Pressable onPress={handleStart} style={styles.startButton}>
                            <Image style={styles.playImage} source={require("../Images/Play.png")} />
                        </Pressable>
                        <Text style={styles.startContainerText}>Start</Text>
                    </View>
                :
                    //STOPP KNAPP
                    <View style={styles.startContainer}>
                        <Pressable onPress={handleStop} style={styles.startButton}>
                            <Image style={styles.playImage} source={require("../Images/Stop.png")} />
                        </Pressable>
                        <Text style={styles.startContainerText}>Stopp</Text>
                    </View>
                }
            </View>
            <Stopwatch/>
        </SafeAreaView>
    )
}

export default Kjøring
