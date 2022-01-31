import { auth } from '../config/firebase';
import React, {useState} from 'react'
import styles from "../Styles/Styles"
import InnloggingStyles from '../Styles/InnloggingStyles';
import {  TouchableWithoutFeedback, Keyboard, StyleSheet,Text, Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable, Image, Pressable} from 'react-native';

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
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
        <SafeAreaView style={styles.container}>
            {/* LOGO */}
            <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("../Images/logo.png")}/>
            </View>

            {/* HEADER */}
            <Text style={styles.header}>Glemt Passord</Text>

            {/* INPUT FELT FOR GLEMT PASSORD */}
            <View style={InnloggingStyles.inputContainer}>
                <Text>E-post</Text>
                <TextInput onChangeText={(glemt) => {setEpost(glemt)}} style={InnloggingStyles.input} placeholder={"E-post"}/>
            </View>

            {/* BEKREFT GLEMT PASSORD */}
            <View style={InnloggingStyles.buttonContainer}>
                <Pressable onPress={handleGlemt} style={[InnloggingStyles.button, InnloggingStyles.buttonOutline]}>
                    <Text style={InnloggingStyles.buttonOutlineText}>Bekreft!</Text>
                </Pressable>
            </View>

        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default GlemtPassordScreen
