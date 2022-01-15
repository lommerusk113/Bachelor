import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable, Image} from 'react-native';
import { auth } from '../config/firebase';
import { handleLogin } from "../Funksjoner/loginFunksjon"


const handleSignup = async (email, password, bekreftSignupPassword, navigation) => {
    try{
        if (email !== '' && password !== '') {
            if (bekreftSignupPassword == password){
                await auth
                .createUserWithEmailAndPassword(email, password)
                let signup = true
                handleLogin(email, password, navigation, signup)
            }else{
                //BEKREFT PASSORD OG PASSORD ER ULIK
                Alert.alert('','Passord og Bekreft Passord må være lik!',)
            }
        }else{
            Alert.alert('','Vennligst fyll inn alle feltene!',)
        }
    } catch(error){

        // EN BRUKER MED DENNE EPOSTEN EKSISTERER ALLEREDE
        if (error.message == "The email address is already in use by another account."){
            Alert.alert('','En bruker med denne e-post adressen eksisterer allerede!',)
        }

        // EPOST ADRESSE HAR FEIL FORMAT
        else if(error.message == "The email address is badly formatted."){
            Alert.alert('','E-post adressen du har skrevet inn har feil format!',)
        }

        //BRUKER HAR IKKE FYLT INN FELT FOR EPOST
        else if(error.message == 'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.'){
            Alert.alert('','Vennligst fyll inn feltet for E-post!',)
        }

        //BRUKER HAR SKREVET FOR KORT PASSORD
        else if(error.message == "Password should be at least 6 characters"){
            Alert.alert('','Passord må inneholde minimum 6 tegn!',)
        }else{
            Alert.alert('','Det har oppstått en feil!',)
            console.log(error.message)
        }
    }
}

export { handleSignup }