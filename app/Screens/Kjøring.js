import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, Pressable} from 'react-native';
import styles from "../Styles/Styles"
import KjøringStyles from '../Styles/KjøringStyles';
import {useState, useEffect} from "react";
import { auth } from '../config/firebase';
import { addDb } from "../config/firebasedb"
import Stopwatch from "../Components/Stopwatch"
import {starting, kjører, stopping, updateFunc} from "../Funksjoner/Kjørefunksjon"
// import BackgroundTask from 'react-native-background-task'

import * as Location from "expo-location";

const Kjøring = ({ route: {params}}) => {
    // HVILKEN KNAPP SKAL VISES
    const [update, setUpdate] = useState();



    //BRUKER HAR TRYKT PÅ STARTKNAPPEN
    const handleStart = async () => {
        updateFunc(true)
        setUpdate(true)
        kjører()

    };

    //BRUKEN HAR TRYKKET PÅ STOPP KNAPPEN
    const handleStop = () => {
        setUpdate(false)
        updateFunc(false)
        stopping()

    };


    // REFRESH ON UPDATE
    useEffect(() => {
    }, [update])

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
