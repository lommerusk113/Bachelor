import React from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, Modal} from 'react-native';
import { auth } from '../config/firebase';
import styles from "../Styles/Styles"

const HomeScreen = ({ navigation }) => {

    //LOGG UT
    const handleLogout = () => {
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
            <View style={styles.buttonContainer}>

                {/* KJØRING KNAPP */}
                <TouchableOpacity title="Kjøring" onPress={() => {navigation.navigate("Kjøring")}} style={styles.kategoriButton}>
                    <Image style={styles.kategoriImage} source={require("../Images/Kjøring.png")} />
                    <Text style={styles.buttonOutlineText}>Kjøring</Text>
                </TouchableOpacity>

                {/* HISTORIKK KNAPP */}
                <TouchableOpacity title="Historikk" onPress={() => {navigation.navigate("Historikk")}} style={styles.kategoriButton}>
                    <Image style={styles.kategoriImage} source={require("../Images/Historikk.png")} />
                    <Text style={styles.buttonOutlineText}>Historikk</Text>
                </TouchableOpacity>


                <Text>Innlogget som:</Text>
                <Text>{user? user.email: "Bruker"}</Text>
                {/* LOGG UT KNAPP */}
                <TouchableOpacity title="Logg Ut" onPress={handleLogout} style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Logg Ut</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen
