import {useState, useEffect} from "react";
import {  StyleSheet, Keyboard, TouchableWithoutFeedback,Text, Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable, Image, Pressable} from 'react-native';
import { auth } from '../config/firebase';
import { handleLogin } from "../Funksjoner/loginFunksjon"
import {handleSignup  } from "../Funksjoner/signupFunksjon"
import styles from "../Styles/Styles"
import InnloggingStyles from "../Styles/InnloggingStyles"

const Loginscreen = ({ navigation }) => {
    //LOGIN INPUT
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();





    // LOGIN - FIKS SYNTAX
     const onLogin = async () => {
        await handleLogin(email, password, navigation) == "Finished"
    }


    return (
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
        <SafeAreaView style={styles.container}>

                {/* LOGO */}
                <Image style={styles.logo} source={require("../Images/logo.png")}/>



                {/* SKJEMA FOR INLOGGING */}
                <Text style={styles.header}>Innlogging</Text>
                <View style={InnloggingStyles.inputContainer}>
                    <Text>E-post</Text>
                    <TextInput onChangeText={(username) => {setEmail(username)}} style={InnloggingStyles.input} placeholder={"E-post"}/>
                    <Text>Passord</Text>
                    <TextInput onChangeText={(password) => {setPassword(password)}} style={InnloggingStyles.input} secureTextEntry placeholder={"Passord"} />
                </View>

                {/* REGISTRERING KNAPP*/}
                <Text style={InnloggingStyles.clickableText} onPress={() => navigation.navigate('Registrering')}>Har du ikke en bruker enda?</Text>


                {/* KNAPPER FOR INLOGGING SKJEMA */}
                <View style={InnloggingStyles.buttonContainer}>
                    {/* LOGIN KNAPP */}
                    <Pressable onPress={onLogin} style={[InnloggingStyles.button, InnloggingStyles.buttonOutline]}>
                        <Text style={InnloggingStyles.buttonOutlineText}>Logg Inn!</Text>
                    </Pressable>

                    {/* GLEMT PASSORD */}
                    <Pressable onPress={() => navigation.navigate('Glemt Passord')} style={[InnloggingStyles.button, InnloggingStyles.buttonOutline]}>
                        <Text style={InnloggingStyles.buttonOutlineText}>Glemt Passord?</Text>
                    </Pressable>
                </View>

        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}



export default Loginscreen
