import React, {useState} from 'react';
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Pressable, Keyboard, KeyboardAvoidingView, ScrollView} from 'react-native';
import styles from "../Styles/Styles"
import {deleteDB, updateTitle} from "../config/firebasedb"

const HistorikkUnderside = ({navigation,  route: {params}}) => {
    const [tittel, setTittel] = useState();
    const [description, setDescription] = useState();

    const handleUpdateTitle = () => {
        params.data.title = tittel
        updateTitle(params.data, params.id)
        setTittel("")
        Keyboard.dismiss()

    };

    const handleDelete = () => {
        deleteDB(params.id)
        navigation.navigate("Historikk")
    };

    const handleUpdateDescription = () => {

    };

  return(
        <SafeAreaView style={styles.container}>
           {/* Logo */}
           <Image style={[styles.logo]} source={require("../Images/logo.png")}/>
           <Text style={[styles.header, {marginTop: 20}]}>Din Kjøretur</Text>

           <KeyboardAvoidingView style={{flex: 1}}>
               <Text style={{marginTop: 10}}>Tittel</Text>
               <TextInput onChangeText={(text) => {setTittel(text)}} style={styles.input} placeholder={params.data.title} value={tittel}/>
                {
                tittel?
                <Pressable onPress={handleUpdateTitle} style={styles.lagreButton}>
                    <Text>Lagre</Text>
                </Pressable>
                :null}
               <Text style={{marginTop: 10}}>Avstand: {params.distance} km</Text>
               <Text style={{marginTop: 10}}>Tidsbruk: {params.duration}</Text>
               <Text style={{marginTop: 10}}>Klokkeslett: {params.data.clock}</Text>
               <Text style={{marginTop: 10}}>Dato: {params.data.date}</Text>
               <Text style={{marginTop: 30}}>Beskrivelse</Text>
               <TextInput style={styles.description} multiline={true} numberOfLiner={4} placeholder={params.data.description} onChangeText={(text) => setDescription(text)}/>
           </KeyboardAvoidingView>
            <KeyboardAvoidingView style={styles.buttonContainer}>
                <View style={[styles.flexContainer, {marginTop: 50}]}>
                    <Pressable onPress={() => {navigation.navigate("Mapscreen",{title: params.data.title, coords: params.data.coords})}}style={[styles.button, styles.buttonOutline, {width: 200}, {backgroundColor: "rgb(85, 175, 130)" }, {borderRadius: 0}]}>
                        <Text style={[styles.buttonOutlineText, {color: "black"}]}>Se i kart</Text>
                    </Pressable>

                    <Pressable onPress={handleDelete} style={[styles.button, styles.buttonOutline, {width: 200}, {backgroundColor: "rgb(225, 100,100)"}, {borderRadius: 0}]}>
                        <Text style={[styles.buttonOutlineText, {color: "black"}]}>Slett Tur</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
  )
};

export default HistorikkUnderside;
