import {  StyleSheet, Keyboard, TouchableWithoutFeedback,Text,Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable, Image, Pressable} from 'react-native';
import styles from "../Styles/Styles"
import InnloggingStyles from "../Styles/InnloggingStyles"
import { auth } from '../config/firebase';
import {useState, useEffect} from "react";
import * as SecureStore from 'expo-secure-store';


const Bekreft2Faktor = ({navigation,  route: {params}}) => {
    const [verificationCode, setVerificationCode] = useState();

    const handleSubmit = async () => {
        try {
            await params.code.confirm(verificationCode).then( async (response) => {
                if (params.from == "Aktiver"){
                    Alert.alert('',"2 Faktor autentisering er satt på!",)
                    navigation.navigate("Home")
                }
                if (params.from == "Innlogging"){
                    try {
                        console.log(params.email)
                        Promise.all([
                            await SecureStore.setItemAsync("Username", params.email),
                            await SecureStore.setItemAsync("Password", params.password)
                        ]).then(() => {
                            navigation.navigate("Home")
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            })
        } catch (error) {
            console.log(error)
            Alert.alert('',error,)
            navigation.navigate("TwoFactor")
        }
    }
  return (
    <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
    <SafeAreaView style={styles.container}>
            {/* LOGO */}
            <Image style={styles.logo} source={require("../Images/logo.png")}/>
            {/* SKRIV INN KODE */}
            <View style={InnloggingStyles.inputContainer}>
                <Text style={InnloggingStyles.inputLabel}>Kode</Text>
                <TextInput onChangeText={(code) => {setVerificationCode(code)}} style={InnloggingStyles.input} placeholder={"Kode"}/>
            </View>


            {/* SUBMIT */}
            <View style={InnloggingStyles.buttonContainer}>
                {/* LOGIN KNAPP */}
                <Pressable onPress={handleSubmit} style={[InnloggingStyles.button, InnloggingStyles.buttonOutline]}>
                    <Text style={InnloggingStyles.buttonOutlineText}>Send Inn</Text>
                </Pressable>
            </View>

    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Bekreft2Faktor