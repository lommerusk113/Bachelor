import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, Pressable, Alert, ScrollView} from 'react-native';
import styles from "../Styles/Styles"
import HomeStyles from '../Styles/HomeStyles';
import Innstillingstyles from '../Styles/InnstillingStyles';
import { auth } from '../config/firebase';

const Innstillinger = ({ navigation }) => {
    const [update, setUpdate] = useState(false);

    handlePassordChange = async () => {
        const user = auth.currentUser.email
        try{
            await auth
                .sendPasswordResetEmail(user)
                Alert.alert('','E-post for endring av ditt passord er sent', [{text: "Ok", onPress: () => {navigation.goBack()}}])

        }catch(error){
            //FEIL EPOST
            Alert.alert('',error,)
        }

    }

    const handleDisable2Factor = () => {
        Alert.alert('','Er du sikker på at du vil fjerne 2 faktor autentisering?', [{text: "Nei", onPress: () => {}}, {text: "Ja", onPress: () => {
            auth.currentUser.unlink("phone")
            setUpdate(true)
        }}])


    }

    useEffect(() => {

    },[update])


  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={Innstillingstyles.scrollViewWrapper}>
            <Pressable style={[Innstillingstyles.button, Innstillingstyles.buttonOutline]} title="Endre Passord" onPress={handlePassordChange}>
                <Text style={Innstillingstyles.buttonOutlineText}>Endre Passord</Text>
            </Pressable>
            {auth.currentUser.phoneNumber && !update?
                <Pressable style={[Innstillingstyles.button, Innstillingstyles.buttonOutline]} title="Aktiver2Faktor" onPress={() => {handleDisable2Factor()}}>
                <Text style={Innstillingstyles.buttonOutlineText}>Deaktiver 2 Faktor</Text>
                </Pressable>
            :
                <Pressable style={[Innstillingstyles.button, Innstillingstyles.buttonOutline]} title="Aktiver2Faktor" onPress={() => {navigation.navigate("TwoFactor")}}>
                    <Text style={Innstillingstyles.buttonOutlineText}>Aktiver 2 Faktor</Text>
                </Pressable>
            }
        </ScrollView>
    </SafeAreaView>
  )
}

export default Innstillinger