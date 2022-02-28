import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, Pressable, Alert} from 'react-native';
import styles from "../Styles/Styles"
import KjøringStyles from '../Styles/KjøringStyles';
import {useState, useEffect} from "react";
import { auth } from '../config/firebase';
import { addDb } from "../config/firebasedb"
import Stopwatch from "../Components/Stopwatch"
import {starting, kjører, stopping, updateFunc} from "../Funksjoner/Kjørefunksjon"
// import BackgroundTask from 'react-native-background-task'

import * as Location from "expo-location";

const Kjøring = ({ navigation, route: {params}}) => {
    // HVILKEN KNAPP SKAL VISES
    const [update, setUpdate] = useState();
    const [loading, setLoading] = useState(false);

    const userInfor = async () => {
        const status = await Location.getBackgroundPermissionsAsync()


        if (status.granted == false) {
            Alert.alert(
                "Posisjon",
                "For å bruke denne applikasjonen må du gi tilgang til bakgrunnslokasjon.",
                [
                {
                    text: "Ok",
                    onPress: () => {handleStart()},
                },
                ]
            );
        }else{
            handleStart()
        }
    }

    const enableButton = () => {
        console.log("Enabling Button")
        setLoading(false)
    }

    //BRUKER HAR TRYKT PÅ STARTKNAPPEN
    const handleStart = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        let { status1 } = await Location.requestBackgroundPermissionsAsync()
        console.log(status)
            // USER DID NOT ACCEPT
            if (status !== "granted"){
                console.log("no: " + status)

                Alert.alert('','Vennligst tillat posisjon.',)
                return;
            }else{
                updateFunc(true)
                setUpdate(true)
                kjører()
            }

    };

    //BRUKEN HAR TRYKKET PÅ STOPP KNAPPEN
    const handleStop = async  () => {
        setLoading(true)
        setUpdate(false)
        updateFunc(false)
        stopping(enableButton)

    };


    // REFRESH ON UPDATE
    useEffect(() => {
    }, [update])

    return (
        <SafeAreaView style={styles.container}>
            {/* LOGO */}
            <Image style={styles.logo} source={require("../Images/logo.png")}/>
            {
                loading?
                    <View style={[{elevation: 3},{width: "100%"}, {height: "100%"}, {position:"absolute"}, {top: "0%"}, {left: "0%"}, {backgroundColor: "white"}, {justifyContent: "center"}, {alignItems: "center"}]}>
                        <Text style={styles.header}>Lagrer Kjøretur.</Text>
                    </View>
                :
                    null
            }


            <View>
                {!starting?
                    //START KNAPP
                    <View style={KjøringStyles.startContainer}>
                        <TouchableOpacity disabled={loading} onPress={userInfor} style={KjøringStyles.startButton}>
                            <Image style={KjøringStyles.playImage} source={require("../Images/Play.png")} />
                        </TouchableOpacity>
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
