import React from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import styles from "../Styles/Styles"
import {useState, useEffect} from "react";

const Kjøring = () => {
    const [status, setStatus] = useState(true);

    const handleStart = () => {
        setStatus(false)
      };

      const handleStop = () => {
        setStatus(true)
      };


    return (
        <SafeAreaView style={styles.container}>
            {/* LOGO */}
            <Image style={styles.logo} source={require("../Images/logo.png")}/>
            <Text style={styles.header}>Kjøring</Text>

            <View>
                {status?
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
