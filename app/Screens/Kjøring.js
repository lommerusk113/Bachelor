import React from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, Pressable, Picker} from 'react-native';
import styles from "../Styles/Styles"
import KjøringStyles from '../Styles/KjøringStyles';
import {useState, useEffect} from "react";
//import {starting, handleStateChange, updateCounter} from "../Funksjoner/kjøringbutton"
import { auth } from '../config/firebase';
import { addDb } from "../config/firebasedb"
import Stopwatch from "../Components/Stopwatch"
import {starting, kjører, stopping, updateFunc} from "../Funksjoner/Kjørefunksjon"

import * as Location from "expo-location";

const Kjøring = ({ route: {params}}) => {
    // HVILKEN KNAPP SKAL VISES
    const [update, setUpdate] = useState();
     //const [start, setStart] = useState();
    //const[mounted, setMounted] = useState(false);

    // TRACKING
    //const [location, setLocation] = useState(null);
    //const [errorMsg, setErrorMsg] = useState(null);



 /* // VENT X ANTALL MS
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } */



    //FOR Å STOPPE FUNKSJONEN
    //let stop = false

    //BRUKER HAR TRYKT PÅ STARTKNAPPEN
    const handleStart = async () => {
        updateFunc(true)
        setUpdate(true)
        kjører()
            // setStart(true)
            // handleStateChange(true)
            // console.log("Starting")
            // stop = false

    };

            //BRUKEN HAR TRYKKET PÅ STOPP KNAPPEN
    const handleStop = () => {
        setUpdate(false)
        updateFunc(false)
        stopping()
                //stop = true
                //setStart(false)
                //handleStateChange(false)
    };



    useEffect(() => {


    }, [update])



    /*
    // BYTT TIL WHILE ELLER DO WHILE
    useEffect (async () => {
        // PAGE HAS NOT BEEN REFRESHED AND BUTTON HAS BEEN STARTED
        if (start && starting)
            // WHILE BUTTON IS STARTED
            for (let i = 0; i < Infinity; i++) {
                // TRACK USER EVERY 10 SEC
                updateCounter(i)
                if (i % 2 === 0){
                    handleTracking()
                }
                // USER HAS STOPPED
                if (starting == false){
                    // STOPPING COORDINATES
                    handleTracking()
                    console.log("Stopped")
                    storage.duration = i;
                    //CALCULATE DISTANCE
                   storage.distance = distance();
                   //ADD TIME
                   getTime()
                   //STORE TO DATABASE
                   if(i > 10){
                    addDb(storage)
                   }
                    return;
                }
                await sleep(1000)
            }
    }, [starting]) */


    return (
        <SafeAreaView style={styles.container}>
            {/* LOGO */}
            <Image style={styles.logo} source={require("../Images/logo.png")}/>
            <Text style={styles.header}>Kjøring</Text>
            <View>
                {!starting?
                    //START KNAPP
                    <View style={KjøringStyles.startContainer}>
                        <Pressable onPress={handleStart} style={KjøringStyles.startButton}>
                            <Image style={KjøringStyles.playImage} source={require("../Images/Play.png")} />
                        </Pressable>
                        <Text style={KjøringStyles.startContainerText}>Start</Text>
                    </View>
                :
                    //STOPP KNAPP
                    <View style={KjøringStyles.startContainer}>
                        <Pressable onPress={handleStop} style={KjøringStyles.startButton}>
                            <Image style={KjøringStyles.playImage} source={require("../Images/Stop.png")} />
                        </Pressable>
                        <Text style={KjøringStyles.startContainerText}>Stopp</Text>
                    </View>
                }
            </View>
            <Stopwatch style={KjøringStyles.stopwatch}/>
        </SafeAreaView>
    )
}

export default Kjøring
