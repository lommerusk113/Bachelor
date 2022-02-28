import {  StyleSheet, Keyboard, TouchableWithoutFeedback,Text,Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable, Image, Pressable} from 'react-native';
import styles from "../Styles/Styles"
import InnloggingStyles from "../Styles/InnloggingStyles"
import { auth, firebaseConfig,} from '../config/firebase';
import {useState, useEffect, useRef} from "react";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

const TwoFactor = ( {navigation} ) => {
    const [phoneNumber, setPhoneNumber] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    //const [verificationId, setVerificationId] = useState(null);
    const [confirm, setConfirm] = useState();
    const recaptchaVerifier = useRef(null);
    const [verificationCode, setVerificationCode] = useState();

    const handleSubmit = async () => {
        try {
            //const confirmation = await auth.signInWithPhoneNumber("+47"+phoneNumber, recaptchaVerifier.current)
            const confirmation = await auth.currentUser.linkWithPhoneNumber("+47" + phoneNumber, recaptchaVerifier.current)

            setConfirm(confirmation)

        } catch (error) {
            Alert.alert('',error.message,)
        }

        // DO SOMETHING WITH DATA

    }

    useEffect(() => {
        if (confirm){
            navigation.navigate("Bekreft2Faktor", {code: confirm, phoneNumber: phoneNumber, from: "Aktiver"})
        }
    }, [confirm])


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
            <View style={InnloggingStyles.inputContainer}>
                <Text style={InnloggingStyles.inputLabel}>Telefon Nummer</Text>
                <TextInput textContentType="telephoneNumber" keyboardType="phone-pad" onChangeText={(number) => {setPhoneNumber(number)}} style={InnloggingStyles.input} placeholder={"Telefon Nummer"} />
            </View>


            {/* KNAPPER FOR INLOGGING SKJEMA */}
            <View style={InnloggingStyles.buttonContainer}>
                {/* LOGIN KNAPP */}
                <Pressable onPress={handleSubmit} style={[InnloggingStyles.button, InnloggingStyles.buttonOutline]}>
                    <Text style={InnloggingStyles.buttonOutlineText}>Send Kode</Text>
                </Pressable>
            </View>

    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default TwoFactor