import React, {useState, useEffect} from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Pressable} from 'react-native';
import { fetchDb } from '../config/firebasedb';
import { auth } from '../config/firebase';
import { getFirestore, collection, getDocs, addDoc, query, where, onSnapshot } from "firebase/firestore"



// REACT NATIVE MAPS | EXPO-PERMISSIONS | EXPO-LOCATION

import styles from "../Styles/Styles"

const Historikk = ({ navigation }) => {
    const [data, setData] = useState();
    const [time, setTime] = useState();

    const user = auth.currentUser.email





    // FETCH DATA FROM FIREBASE
    useEffect (async () => {
        try {
            const fetchDb = async (user) => {
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

    useEffect (() => {
        //Behandle Tid:
       const handleDuration = () => {
           if (data){
           let lst = []
           data.forEach(element => {
               let hour = Math.floor(element.duration  / 3600);
               let min = Math.floor((element.duration  - (hour * 3600)) / 60);
               let sec = element.duration - (hour * 3600) - (min * 60)

               if (hour < 10){hour = "0" + hour};
               if (min < 10){min = "0" + min};
               if (sec < 10){sec = "0" + sec};

               lst.push(hour + " : " + min + " : " + sec)
           })
       setTime(lst)
        }
        }
        handleDuration()
   },[data])


    if (!time){
        return(<Text>Loading...</Text>)
    }else{


    return (
        <SafeAreaView style={styles.container}>
            {/* LOGO */}
            <Image style={[styles.logo, {marginTop: 20}]} source={require("../Images/logo.png")}/>
            <Text style={styles.header}>Dine Kjøreturer</Text>
            <ScrollView style={styles.turWrapper}>
                <View style={styles.turContainer}>
                    {data?.map(function(data, index){
                        return(
                            <Pressable key={index} style={[styles.historikkDisplay, {marginBottom: 5}]} onPress={ () => {navigation.navigate("HistorikkUnderside",
                            {
                                email: data.name, duration: time[index], distance: data.distance, title: data.tittel, id: data.id, data: data
                            })}}>
                                <Text style={{marginBottom: 20}}>{data.title? data.title : data.name}</Text>
                                <View style={styles.flexContainer}>
                                    <Text style={{marginRight: 80}}>{data.distance} Km</Text>
                                    <Text>{time? time[index] : null}</Text>
                                </View>

                            </Pressable>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
        }
}

export default Historikk
