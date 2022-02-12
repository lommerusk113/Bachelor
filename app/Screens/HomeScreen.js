import React, {useState, useEffect} from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, Modal, SliderComponent, Pressable, Alert} from 'react-native';
import { auth } from '../config/firebase';
import styles from "../Styles/Styles"
import InnloggingStyles from '../Styles/InnloggingStyles';
import HomeStyles from '../Styles/HomeStyles';
import {starting} from "../Funksjoner/Kjørefunksjon"

const HomeScreen = ({ navigation }) => {

    //LOGG UT
    const handleLogout = () => {
        if (starting){
            Alert.alert(
                'Avslutt kjøretur',
                'Du kan ikke logge ut når du kjører.',
                [
                    // DERSOM BRUKER VIL SLETTE
                    {text: 'Ok', onPress: () => {
                        navigation.navigate("Kjøring")

                    }},
                ]
            );
        }else{
            auth.signOut().then(function() {
                // Sign-out successful.
                console.log("Logged out!")
            }, function(error) {
                // An error happened.
            });
            navigation.replace('Login')
        }
    }
    const user = auth.currentUser


    return (
        <SafeAreaView style={styles.container}>
            {/* LOGO */}
            <Image style={styles.logo} source={require("../Images/logo.png")}/>

            <Text style={styles.header}>Velkommen</Text>
            <Text>{user? user.email : bruker}</Text>
            {/* Instillinger */}

            <View style={HomeStyles.kategoriContainer}>
                <Pressable style={HomeStyles.instillingerContainer} onPress={() => navigation.navigate('Instillinger')}>
                    <Text style={InnloggingStyles.buttonOutlineText}>Instillinger</Text>
                </Pressable>
                {/* KJØRING KNAPP */}
                <Pressable title="Kjøring" onPress={() => {navigation.navigate("Kjøring")}} style={HomeStyles.kategoriButton}>
                    <Text style={HomeStyles.buttonText}>Kjøring</Text>
                    <Image style={HomeStyles.kategoriImage} source={require("../Images/Kjøring.png")} />
                </Pressable>

                {/* HISTORIKK KNAPP */}
                <Pressable title="Historikk" onPress={() => {navigation.navigate("Historikk")}} style={HomeStyles.kategoriButton}>
                    <Text style={HomeStyles.buttonText}>Historikk</Text>
                    <Image style={HomeStyles.kategoriImage} source={require("../Images/Historikk.png")} />
                </Pressable>

                {/* LOGG UT KNAPP */}
                <Pressable title="Logg Ut" onPress={handleLogout} style={[InnloggingStyles.button, InnloggingStyles.buttonOutline]}>
                    <Text style={InnloggingStyles.buttonOutlineText}>Logg Ut</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen
