import React, {useState, useEffect} from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Pressable, useColorScheme} from 'react-native';
import { fetchDb } from '../config/firebasedb';
import { auth } from '../config/firebase';
import { getFirestore, collection, getDocs, addDoc, query, where, onSnapshot, orderBy} from "firebase/firestore"

import { Picker } from "@react-native-picker/picker";


//import { Dropdown } from 'react-native-element-dropdown';

// REACT NATIVE MAPS | EXPO-PERMISSIONS | EXPO-LOCATION

import styles from "../Styles/Styles"

const Historikk = ({ navigation }) => {
    const [data, setData] = useState();
    const [time, setTime] = useState();

    const [selected, setSelected] = useState('newest');

    const [sorting, setSorting] = useState(false)

    const user = auth.currentUser.email




    // FETCH DATA FROM FIREBASE
    useEffect (async () => {
        //setSorting(false)
        let felt
        let order
        switch(selected){
            case "newest":
                felt = "time"
                order = "desc"
                console.log('newest')
                break;
            case "oldest":
                felt = "time"
                order = "asc"
                console.log('oldest')
                break;
            case "longest":
                felt = "duration"
                order = "desc"
                console.log('longest')
                break;
            case "shortest":
                felt = "duration"
                order = "asc"
                console.log('shortest')           
                break;
            case "longDist":
                felt = "distance"
                order = "desc"
                console.log('longDist')  
                break;
            case "shortDist":
                felt = "distance"
                order = "asc"
                console.log('shortDist')
                break;
        }
        try {
            const fetchDb = async (user) => {
                const q = query(collection(getFirestore(), "Kjøreturer"), where("name", "==", user), orderBy(felt, order))
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

    }, [selected])

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
  /*     
   useEffect (() => {
       if (data){
        setSorting(false)
        switch(selected){
            case "newest":
                data.sort((a, b) => (a.time > b.time) ? 1 : -1)
                setSorting(true)
                break;
            case "oldest":
                data.sort((a, b) => (a.time < b.time) ? 1 : -1)
                setSorting(true)
                //console.log(a.time)
                break;
            case "longest":
                data.sort((a, b) => (a.duration < b.duration) ? 1 : -1)
                setSorting(true)
                break;
            case "shortest":
                data.sort((a, b) => (a.duration > b.duration) ? 1 : -1)
                setSorting(true)
                break;
            case "longDist":
                data.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
                setSorting(true)
                break;
            case "shortDist":
                data.sort((a, b) => (a.distance < b.distance) ? 1 : -1)
                setSorting(true)
                break;
        }
    }
   },[selected, data])
   */
    if (!time){
        return(<Text>Loading...</Text>)
    }else{


    return (
        <SafeAreaView style={styles.container}>
            {/* LOGO */}
            <Image style={[styles.logo, {marginTop: 20}]} source={require("../Images/logo.png")}/>
            <Text style={styles.header}>Dine Kjøreturer</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selected}
                    onValueChange={(value, index) => setSelected(value)}
                    mode="dropdown" // Android only
                    style={[styles.picker]}
                >
                    <Picker.Item label= "Nyeste Først" value= "newest" />
                    <Picker.Item label="Eldste Først" value= "oldest"/>
                    <Picker.Item label="Lengste Tid" value= "longest" />
                    <Picker.Item label="Korteste Tid" value= "shortest" />
                    <Picker.Item label="Lengste Avstand" value= "longDist" />
                    <Picker.Item label="Korteste Avstand" value= "shortDist"  />
                </Picker>
            </View>

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
                                    <Text style={{marginRight: 80}}>Kl. {data.clock}</Text>
                                    <Text>{data.date}</Text>
                                </View>
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
