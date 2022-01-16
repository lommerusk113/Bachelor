import React, {useState} from 'react'
import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable, Image} from 'react-native';
import { auth } from '../config/firebase';
import { handleLogin } from "../Funksjoner/loginFunksjon"
import {handleSignup  } from "../Funksjoner/signupFunksjon"
import styles from "../Styles/Styles"

const Loginscreen = ({ navigation }) => {
    //LOGIN INPUT
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    // LOGIN - FIKS SYNTAX
     const onLogin = async () => {
        await handleLogin(email, password, navigation) == "Finished"
    }


    return (
        <SafeAreaView style={styles.container}>

                {/* LOGO */}
                <Image style={styles.logo} source={require("../Images/logo.png")}/>


                {/* SKJEMA FOR INLOGGING */}
                <Text style={styles.header}>Innlogging</Text>
                <View style={styles.inputContainer}>
                    <Text>E-post</Text>
                    <TextInput onChangeText={(username) => {setEmail(username)}} style={styles.input} placeholder={"E-post"}/>
                    <Text>Passord</Text>
                    <TextInput onChangeText={(password) => {setPassword(password)}} style={styles.input} secureTextEntry placeholder={"Passord"} />
                </View>

                {/* REGISTRERING KNAPP*/}
                <Text style={styles.clickableText} onPress={() => navigation.navigate('Registrering')}>Har du ikke en bruker enda?</Text>


                {/* KNAPPER FOR INLOGGING SKJEMA */}
                <View style={styles.buttonContainer}>
                    {/* LOGIN KNAPP */}
                    <TouchableOpacity onPress={onLogin} style={[styles.button, styles.buttonOutline]}>
                        <Text style={styles.buttonOutlineText}>Logg Inn!</Text>
                    </TouchableOpacity>

                    {/* GLEMT PASSORD */}
                    <TouchableOpacity onPress={() => navigation.navigate('Glemt Passord')} style={[styles.button, styles.buttonOutline]}>
                        <Text style={styles.buttonOutlineText}>Glemt Passord?</Text>
                    </TouchableOpacity>
                </View>

        </SafeAreaView>
    )
}



export default Loginscreen
