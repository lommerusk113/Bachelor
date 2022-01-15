import React, {useState} from 'react'
import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable, Image} from 'react-native';
import { auth } from '../config/firebase';
import { handleSignup  } from "../Funksjoner/signupFunksjon"
import styles from "../Styles/Styles"

const SignupScreen = ({ navigation }) => {
    //USER INPUT
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [bekreftSignupPassword, setBekreftSignupPassword] = useState();



    // REGISTRER
    const onHandleSignup = async () => {
        await handleSignup(email, password, bekreftSignupPassword, navigation);
        setPassword("");
        setBekreftSignupPassword("");
    }

    return (
        <SafeAreaView style={styles.container} >
                {/* LOGO */}
                <Image style={styles.logo} source={require("../Images/logo.png")}/>

                {/* SKJEMA FOR REGISTRERING */}
                <Text style={styles.header}>Registrer</Text>
                <View style={styles.inputContainer}>
                    <Text>E-post</Text>
                    <TextInput onChangeText={(username) => {setEmail(username)}} style={styles.input} placeholder={"E-post"} value={email}/>
                    <Text>Passord</Text>
                    <TextInput onChangeText={(password) => {setPassword(password)}} style={styles.input} secureTextEntry value={password} placeholder={"Passord"}/>
                    <Text>Gjenta Passord</Text>
                    <TextInput onChangeText={(password) => {setBekreftSignupPassword(password)}}
                        style={styles.input} secureTextEntry value={bekreftSignupPassword} placeholder={"Gjenta Passord"}/>
                </View>

                {/* BEKREFT REGISTRERING */}
                <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress= {onHandleSignup} style={[styles.button, styles.buttonOutline]}>
                            <Text style={styles.buttonOutlineText}>Registrer!</Text>
                        </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}



export default SignupScreen



