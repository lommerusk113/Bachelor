import {useState, useEffect, useRef} from "react";
import {Keyboard, TouchableWithoutFeedback,Text, View, TextInput, SafeAreaView, Image, Pressable} from 'react-native';
import { auth, firebaseConfig } from '../config/firebase';
import { handleLogin } from "../Funksjoner/loginFunksjon"
import {handleSignup  } from "../Funksjoner/signupFunksjon"
import styles from "../Styles/Styles"
import InnloggingStyles from "../Styles/InnloggingStyles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

const Loginscreen = ({ navigation }) => {
    //LOGIN INPUT
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(true)
    const recaptchaVerifier = useRef(null);


    // OM BRUKER ALLEREDE ER LOGGETT INN
    const load = async () => {
        Promise.all([
            await SecureStore.getItemAsync("Username"),
            await SecureStore.getItemAsync("Password")
        ]).then((values) => {
            let uname = values[0]
            let pword = values[1]

            if (uname && pword) {
                handleLogin(uname, pword, navigation, false, "loading").then(() => {
                    navigation.navigate("Home")
                })
            }else{
                setLoading(false)
            }
        })
    }
    load()

    // LOGIN
     const onLogin = async () => {
        await handleLogin(email, password, navigation, false ,"signin").then(async (value) => {
            if (value == "correct") {
                if (auth.currentUser.phoneNumber != null){
                    auth.currentUser.reauthenticateWithPhoneNumber(auth.currentUser.phoneNumber, recaptchaVerifier.current).then((value) =>{
                        navigation.navigate("Bekreft2Faktor", {code: value, phoneNumber: auth.currentUser.phoneNumber, password: password, email: email, from: "Innlogging"})
                    })
                }else{
                    try {
                        await SecureStore.setItemAsync("Username", email)
                        await SecureStore.setItemAsync("Password", password)
                    } catch (error) {
                        console.log(error)
                    }
                    navigation.navigate("Home")
                }
            }
        })
    }

    if (loading) {return (<Text style={styles.loader}>Laster inn...</Text>)}
    return (
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
        <SafeAreaView style={styles.container}>
        <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={
                firebaseConfig
            }
        />

                {/* LOGO */}
                <Image style={styles.logo} source={require("../Images/logo.png")}/>



                {/* SKJEMA FOR INLOGGING */}
                <Text style={styles.header}>Innlogging</Text>
                <View style={InnloggingStyles.inputContainer}>
                    <Text style={InnloggingStyles.inputLabel}>E-post</Text>
                    <TextInput onChangeText={(username) => {setEmail(username)}} style={InnloggingStyles.input} placeholder={"E-post"}/>
                    <Text style={InnloggingStyles.inputLabel}>Passord</Text>
                    <TextInput onChangeText={(password) => {setPassword(password)}} style={InnloggingStyles.input} secureTextEntry placeholder={"Passord"} />
                </View>

                 {/* GLEMT PASSORD */}
                 <Pressable onPress={() => navigation.navigate('Glemt Passord')} style={InnloggingStyles.glemtPassord}>
                        <Text style={InnloggingStyles.glemtPassordTekst}>Glemt Passord</Text>
                </Pressable>

                {/* KNAPPER FOR INLOGGING SKJEMA */}
                <View style={InnloggingStyles.buttonContainer}>
                    {/* LOGIN KNAPP */}
                    <Pressable onPress={onLogin} style={[InnloggingStyles.button, InnloggingStyles.buttonOutline]}>
                        <Text style={InnloggingStyles.buttonOutlineText}>Logg Inn</Text>
                    </Pressable>

                    {/* REGISTRERING KNAPP*/}
                    <Text style={InnloggingStyles.clickableText} onPress={() => navigation.navigate('Registrering')}>Har du ikke en bruker enda?</Text>
                </View>

        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}



export default Loginscreen
