import React, {useState, useEffect} from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import { fetchDb } from '../config/firebasedb';
import { auth } from '../config/firebase';
import { getFirestore, collection, getDocs, addDoc, query, where, onSnapshot } from "firebase/firestore"



// REACT NATIVE MAPS | EXPO-PERMISSIONS | EXPO-LOCATION

import styles from "../Styles/Styles"

const Historikk = () => {
    const [data, setData] = useState();

    const user = auth.currentUser.email



    // FETCH DATA FROM FIREBASE
    useEffect (async () => {
        try {
            const fetchDb = async (user) => {
                console.log("Fetching data for: " + user)
                const q = query(collection(getFirestore(), "Kjøreturer"), where("name", "==", user))
                onSnapshot(q, (snapshot) => {
                    let turer = []
                    snapshot.docs.forEach((doc) => {
                        turer.push({...doc.data(), id: doc.id})
                    })
                    setData(turer)
                })
            }
            fetchDb(user)
        } catch (error) {
            console.log(error)
        }

    }, [])


    return (
        <SafeAreaView style={styles.container}>
            {data?.map(function(data, index){
                return(
                    <View key={index} style={{borderWidth: 1}}>
                        <Text>{data.name}</Text>
                        <Text>{data.duration} Sekunder</Text>
                        <Text>Startet:</Text>
                        <Text>lat: {data.coords[0].coords.latitude} lon: {data.coords[0].coords.longitude}</Text>
                    </View>
                )
            })}
        </SafeAreaView>
    )
}

export default Historikk
