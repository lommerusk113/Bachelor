import React from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import styles from "../Styles/Styles"
import {useState, useEffect} from "react";

const Kjøring = () => {
    const [start, setStart] = useState(false);

    let stop = false
    //TESTING
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const handleStart = async () => {
        setStart(true)
        console.log("Starting")
        stop = false
      };

    const handleStop = () => {
        stop = true
        setStart(false)
    };

    useEffect (async () => {
        if (start){
            for (let i = 0; i < 10; i++) {
                console.log("Counter: " + i)
                if (stop){
                    console.log("Stopped")
                    return;
                }
                await sleep(1000)
              }
        }
    }, [start, stop])


    return (
        <SafeAreaView style={styles.container}>
            {/* LOGO */}
            <Image style={styles.logo} source={require("../Images/logo.png")}/>
            <Text style={styles.header}>Kjøring</Text>

            <View>
                {!start?
                    //START KNAPP
                    <View style={styles.startContainer}>
                        <TouchableOpacity onPress={handleStart} style={styles.startButton}>
                            <Image style={styles.playImage} source={require("../Images/Play.png")} />
                        </TouchableOpacity>
                        <Text style={styles.startContainerText}>Start</Text>
                    </View>
                :
                    //STOPP KNAPP
                    <View style={styles.startContainer}>
                        <TouchableOpacity onPress={handleStop} style={styles.startButton}>
                            <Image style={styles.playImage} source={require("../Images/Stop.png")} />
                        </TouchableOpacity>
                        <Text style={styles.startContainerText}>Stopp</Text>
                    </View>
                }

            </View>
        </SafeAreaView>
    )
}

export default Kjøring
