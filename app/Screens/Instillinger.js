import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, Pressable, Alert} from 'react-native';
import styles from "../Styles/Styles"
import HomeStyles from '../Styles/HomeStyles';
import Instillingstyles from '../Styles/InstillingStyles';
import { auth } from '../config/firebase';

const Instillinger = ({ navigation }) => {
    handlePassordChange = async () => {
        const user = auth.currentUser.email
        try{
            await auth
                .sendPasswordResetEmail(user)
                Alert.alert('','E-post for endring av ditt passord er sendt', [{text: "Ok", onPress: () => {navigation.goBack()}}])

        }catch(error){
            //FEIL EPOST
            Alert.alert('',error,)
        }

    }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Instillinger</Text>
        <Pressable style={Instillingstyles.buttons} title="Endre Passord" onPress={handlePassordChange}>
            <Text style={HomeStyles.buttonText}>Endre Passord</Text>
        </Pressable>
    </SafeAreaView>
  )
}

export default Instillinger