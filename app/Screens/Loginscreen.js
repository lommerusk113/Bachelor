import {useState, useEffect} from "react";
import {  StyleSheet, Keyboard, TouchableWithoutFeedback,Text,Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable, Image, Pressable} from 'react-native';
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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.navigate("Home")
            }else{
                console.log("not logged in")
            }
        })

        return unsubscribe
    }, [])

    return (
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
        <SafeAreaView style={styles.container}>

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
