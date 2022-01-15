import React from 'react'
import { Button, View, Text } from 'react-native';
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
        <View>
            <Text>{user? user.email: "Bruker"}</Text>
            <Button title="Logg Ut" onPress={handleLogout}/>
        </View>
    )
}

export default HomeScreen
