import React, {useState, useEffect} from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Pressable, useColorScheme} from 'react-native';
// import { fetchDb } from '../config/firebasedb';
import { auth } from '../config/firebase';
import { getFirestore, collection, query, where, onSnapshot, orderBy} from "firebase/firestore"



import { Picker } from "@react-native-picker/picker";

import { useFocusEffect } from '@react-navigation/native';
// REACT NATIVE MAPS | EXPO-PERMISSIONS | EXPO-LOCATION

import styles from "../Styles/Styles"
import HistorikkStyles from '../Styles/HistorikkStyles';

const Historikk = ({ navigation }) => {

    const [time, setTime] = useState();

    const [data, setData] = useState();
    const [selected, setSelected] = useState('newest');

    const user = auth.currentUser.email



  // FETCH DATA FROM FIREBASE
    useEffect (async () => {
        //setSorting(false)
        let felt = "time"
        let order = "desc"
        switch(selected){
            case "newest":
                felt = "time"
                order = "desc"
                break;
            case "oldest":
                felt = "time"
                order = "asc"
                break;
            case "longest":
                felt = "duration"
                order = "desc"
                break;
            case "shortest":
                felt = "duration"
                order = "asc"
                break;
            case "longDist":
                felt = "distance"
                order = "desc"
                break;
            case "shortDist":
                felt = "distance"
                order = "asc"
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







    if (!time){
        return(<Text>Loading...</Text>)
    }else{


    return (
        <SafeAreaView style={styles.container}>
            <View style={HistorikkStyles.pickerContainer}>
                <Picker
                    selectedValue={selected}
                    onValueChange={(value, index) => setSelected(value)}
                    mode="dropdown" // Android only
                    style={[HistorikkStyles.picker]}
                >
                    <Picker.Item label= "Nyeste Først" value= "newest" />
                    <Picker.Item label="Eldste Først" value= "oldest"/>
                    <Picker.Item label="Lengste Tid" value= "longest" />
                    <Picker.Item label="Korteste Tid" value= "shortest" />
                    <Picker.Item label="Lengste Avstand" value= "longDist" />
                    <Picker.Item label="Korteste Avstand" value= "shortDist"  />
                </Picker>
            </View>

            <ScrollView style={HistorikkStyles.turWrapper}>
                <View style={HistorikkStyles.turContainer}>
                    {data?.map(function(data, index){
                        return(
                            <Pressable key={index} style={HistorikkStyles.historikkDisplay} onPress={ () => {navigation.navigate("HistorikkUnderside",
                            {
                                email: data.name, duration: time[index], distance: data.distance, title: data.tittel, id: data.id, data: data
                            })}}>
                                <View>
                                    <Text style={HistorikkStyles.historikkTitle}>{data.title? data.title : data.name}</Text>
                                    <Text>{data.startsted}</Text>
                                    <Text>{data.sluttsted}</Text>
                                    <Text style={[HistorikkStyles.clockDisplay, HistorikkStyles.flexItem]}>{data.clock}</Text>
                                    <View style={HistorikkStyles.flexContainer}>
                                        <Text style={[HistorikkStyles.leftFlexItem, HistorikkStyles.flexItem]}>{data.distance} Km</Text>
                                        <Text style={[HistorikkStyles.leftFlexItem, HistorikkStyles.flexItem]}>{time? time[index] : null}</Text>
                                        <Text style={[HistorikkStyles.flexItem]}>{data.date}</Text>
                                    </View>
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
