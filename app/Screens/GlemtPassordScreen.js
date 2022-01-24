import { auth } from '../config/firebase';
import React, {useState} from 'react'
import styles from "../Styles/Styles"
import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable, Image, Pressable} from 'react-native';

const GlemtPassordScreen = ({ navigation }) => {
        //E-POST FOR GLEMT BRUKER
        const [epost, setEpost] = useState();

    //Glemt Passord
    const handleGlemt = async () => {
        try{
            if (epost !== ""){
                await auth
                .sendPasswordResetEmail(epost)
                Alert.alert('','E-post for tilbakestilling av ditt passord er sendt', [{text: "Ok", onPress: () => {navigation.goBack()}}])
            }else{
                Alert.alert('','Vennligst fyll in feltet!',)
            }

        }catch(error){
            //FEIL EPOST
            Alert.alert('','Det finnes ingen bruker med denne E-posten!',)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* LOGO */}
            <Image style={styles.logo} source={require("../Images/logo.png")}/>

            {/* HEADER */}
            <Text style={styles.header}>Glemt Passord</Text>

            {/* INPUT FELT FOR GLEMT PASSORD */}
            <View style={styles.inputContainer}>
                <Text>E-post</Text>
                <TextInput onChangeText={(glemt) => {setEpost(glemt)}} style={styles.input} placeholder={"E-post"}/>
            </View>

            {/* BEKREFT GLEMT PASSORD */}
            <View style={styles.buttonContainer}>
                <Pressable onPress={handleGlemt} style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Bekreft!</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default GlemtPassordScreen
