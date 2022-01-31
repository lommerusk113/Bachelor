import React, {useState, useEffect} from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, Modal, SliderComponent, Pressable} from 'react-native';
import { auth } from '../config/firebase';
import styles from "../Styles/Styles"
import InnloggingStyles from '../Styles/InnloggingStyles';
import HomeStyles from '../Styles/HomeStyles';
import {starting, handleStateChange, updateCounter} from "../Funksjoner/kjøringbutton"

const HomeScreen = ({ navigation }) => {
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        navigation.navigate("Home")
    })



    //LOGG UT
    const handleLogout = () => {
        handleStateChange(false)
        auth.signOut().then(function() {
            // Sign-out successful.
            console.log("Logged out!")
          }, function(error) {
            // An error happened.
          });
        navigation.replace('Login')
    }
    const user = auth.currentUser



    return (
        <SafeAreaView style={styles.container}>
            {/* LOGO */}
            <Image style={styles.logo} source={require("../Images/logo.png")}/>

            <Text style={styles.header}>Hjem</Text>
            <View style={[InnloggingStyles.buttonContainer, {marginTop: 0}]}>
                {/* KJØRING KNAPP */}
                <Pressable title="Kjøring" onPress={() => {navigation.navigate("Kjøring")}} style={HomeStyles.kategoriButton}>
                    <Image style={HomeStyles.kategoriImage} source={require("../Images/Kjøring.png")} />
                    <Text style={InnloggingStyles.buttonOutlineText}>Kjøring</Text>
                </Pressable>

                {/* HISTORIKK KNAPP */}
                <Pressable title="Historikk" onPress={() => {navigation.navigate("Historikk")}} style={HomeStyles.kategoriButton}>
                    <Image style={HomeStyles.kategoriImage} source={require("../Images/Historikk.png")} />
                    <Text style={InnloggingStyles.buttonOutlineText}>Historikk</Text>
                </Pressable>


                <Text>Innlogget som:</Text>
                <Text>{user? user.email: "Bruker"}</Text>
                {/* LOGG UT KNAPP */}
                <Pressable title="Logg Ut" onPress={handleLogout} style={[InnloggingStyles.button, InnloggingStyles.buttonOutline]}>
                    <Text style={InnloggingStyles.buttonOutlineText}>Logg Ut</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen
