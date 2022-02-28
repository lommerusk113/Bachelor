import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable, Image, Pressable} from 'react-native';
import { auth } from '../config/firebase';
import * as SecureStore from 'expo-secure-store';




// Checks if the user has typed in a valid username and password
const handleLogin = async ( email, password, navigation, signup, from) => {
    console.log("Attempting login!")
    try {
      if (email !== '' && password !== '') {
       await auth.signInWithEmailAndPassword(email, password);
       console.log("Logged in")

       return "correct"



      }else{
          //BRUKER HAR IKKE FYLLT INN NOEN FELT
        Alert.alert('','Vennligst fyll inn feltene for E-post og Passord',)
      }
    } catch (error) {

        // FEIL PASSORD
        if (error.message == "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)."){
            Alert.alert('','Brukernavn eller Passord er feil!',)

        // FEIL E-POST
        }else if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
            Alert.alert('','Brukernavn eller Passord er feil!',)

        // BRUKEREN HAR IKKE FYLT INN EPOST
        }else if(error.message == 'Firebase: Error (auth/missing-email).'){
            Alert.alert('','Vennligst fyll inn feltet for E-post',)

        // BRUKEREN HAR IKKE FYLT INN PASSORD
        }else if(error.message == 'Firebase: An internal AuthError has occurred. (auth/internal-error).'){
            Alert.alert('','Vennligst fyll inn feltet for Passord',)

        // DÅRLIG FORMATERT EPOST
        }else if (error.message == "Firebase: The email address is badly formatted. (auth/invalid-email)."){
            Alert.alert('','E-post adressen du har skrevet inn er ikke gyldig!',)

        //BRUKER EKSISTERER IKKE
        }else if (error.message == "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."){
            Alert.alert('','Brukernavn eller Passord er feil!',)

        // EN ANNEN FEIL HAR OPSTÅTT
        }else{
            Alert.alert('','En feil har oppstått!',)
            console.log(error.message);
        }
    }
 };


 export { handleLogin }