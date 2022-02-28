import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable, Image} from 'react-native';
import { auth } from '../config/firebase';
import { handleLogin } from "../Funksjoner/loginFunksjon"


const handleSignup = async (email, password, bekreftSignupPassword, navigation) => {
    try{
        email = email.replace(/ /g, '')
        await auth
            .createUserWithEmailAndPassword(email, password)
            let signup = true
            handleLogin(email, password, navigation, signup).then((value) => {
                if (value == "correct"){
                    navigation.popToTop()
                    navigation.replace('Home')
                }
            })
    } catch(error){

        // EN BRUKER MED DENNE EPOSTEN EKSISTERER ALLEREDE
        if (error.message == "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."){
            Alert.alert('','En bruker med denne e-post adressen eksisterer allerede!',)
        }

        // EPOST ADRESSE HAR FEIL FORMAT
        else if(error.message == "Firebase: The email address is badly formatted. (auth/invalid-email)."){
            Alert.alert('','E-post adressen du har skrevet inn har feil format!',)
        }

        //BRUKER HAR IKKE FYLT INN FELT FOR EPOST
        else if(error.message == 'Firebase: Error (auth/missing-email).'){
            Alert.alert('','Vennligst fyll inn feltet for E-post!',)
        }
        else if(error.message == "Firebase: An internal AuthError has occurred. (auth/internal-error)."){
            Alert.alert('','Vennligst fyll inn feltet for Passord!',)
        }

        //BRUKER HAR SKREVET FOR KORT PASSORD
        else if(error.message == "Firebase: Password should be at least 6 characters (auth/weak-password)."){
            Alert.alert('','Passord må inneholde minimum 6 tegn!',)
        }else{
            Alert.alert('',error.message,)
            console.log(error.message)
        }
    }
}

export { handleSignup }