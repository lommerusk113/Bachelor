import React, {useState} from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, Modal, SliderComponent, Pressable} from 'react-native';
import { auth } from '../config/firebase';
import styles from "../Styles/Styles"

const HomeScreen = ({ navigation }) => {
    const [modalOpen, setModalOpen] = useState(false);

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
                <Pressable title="Kjøring" onPress={() => {navigation.navigate("Kjøring")}} style={styles.kategoriButton}>
                    <Image style={styles.kategoriImage} source={require("../Images/Kjøring.png")} />
                    <Text style={styles.buttonOutlineText}>Kjøring</Text>
                </Pressable>

                {/* HISTORIKK KNAPP */}
                <Pressable title="Historikk" onPress={() => {navigation.navigate("Historikk")}} style={styles.kategoriButton}>
                    <Image style={styles.kategoriImage} source={require("../Images/Historikk.png")} />
                    <Text style={styles.buttonOutlineText}>Historikk</Text>
                </Pressable>


                <Text>Innlogget som:</Text>
                <Text>{user? user.email: "Bruker"}</Text>
                {/* LOGG UT KNAPP */}
                <Pressable title="Logg Ut" onPress={handleLogout} style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Logg Ut</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen
