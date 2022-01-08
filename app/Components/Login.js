import React, {useState} from 'react'
import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput} from 'react-native';
//import Firebase from '../config/firebase';
import Signup from './Signup';

const Login = () => {
    const [uname, setUname] = useState()
    const [pword, setPword] = useState()

    //const auth = Firebase.auth();

    //const onLogin = async () => {
    //    try {
    //      if (email !== '' && password !== '') {
    //        await auth.signInWithEmailAndPassword(email, password);
    //      }
    //    } catch (error) {
    //      setLoginError(error.message);
    //   }
    //  };


    return (
        <View>
            <Text>Brukernavn</Text>
            <TextInput
                onChangeText={(username) => {setUname(username)}}
            />
            <Text>Passord</Text>
            <TextInput
                onChangeText={(password) => {setPword(password)}}
            />
            <Button
                //onPress={onLogin}
                title="Logg inn!"
                color= "#00ffff"
                accessibilityLabel="Learn more about this purple button"
            />
            <Signup />

        </View>
    )
}

export default Login
