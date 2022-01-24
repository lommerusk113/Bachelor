import React, {useState} from 'react';
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Pressable} from 'react-native';
import styles from "../Styles/Styles"
import {deleteDB, updateTitle} from "../config/firebasedb"

const HistorikkUnderside = ({navigation,  route: {params}}) => {
    const [tittel, setTittel] = useState();

    const handleUpdateTitle = () => {
        params.data.title = tittel
        updateTitle(params.data, params.id)
        setTittel("")

    };

    const handleDelete = () => {
        deleteDB(params.id)
        console.log("deleted")
        navigation.navigate("Historikk")
    };

  return(
        <SafeAreaView style={styles.container}>
           {/* Logo */}
           <Image style={[styles.logo, {marginTop: 20}]} source={require("../Images/logo.png")}/>
           <Text style={[styles.header, {marginTop: 20}]}>Din Kjøretur</Text>

           <View style={{flex: 1}}>
               <Text style={{marginTop: 50}}>Tittel</Text>
               <TextInput onChangeText={(text) => {setTittel(text)}} style={styles.input} placeholder={params.data.title} value={tittel}/>
                {
                tittel?
                <Pressable onPress={handleUpdateTitle} style={styles.lagreButton}>
                    <Text>Lagre</Text>
                </Pressable>
                :null}
               <Text style={{marginTop: 10}}>Avstand: {params.distance} km</Text>
               <Text style={{marginTop: 10}}>Tidsbruk: {params.duration}</Text>
           </View>
            <View style={styles.buttonContainer}>
                <View style={[styles.flexContainer, {marginTop: 50}]}>
                    <Pressable style={[styles.button, styles.buttonOutline, {width: 200}, {backgroundColor: "rgb(85, 175, 130)" }, {borderRadius: 0}]}>
                        <Text style={[styles.buttonOutlineText, {color: "black"}]}>Se i kart</Text>
                    </Pressable>

                    <Pressable onPress={handleDelete} style={[styles.button, styles.buttonOutline, {width: 200}, {backgroundColor: "rgb(225, 100,100)"}, {borderRadius: 0}]}>
                        <Text style={[styles.buttonOutlineText, {color: "black"}]}>Slett Tur</Text>
                    </Pressable>
                </View>
            </View>

        </SafeAreaView>
  )
};

export default HistorikkUnderside;
