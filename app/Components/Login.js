import React, {useState} from 'react'
import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput} from 'react-native';
const Login = () => {
    const [uname, setUname] = useState()
    const [pword, setPword] = useState()
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
            title="Logg inn!"
            color= "#00ffff"
            accessibilityLabel="Learn more about this purple button"
            />

        </View>
    )
}

export default Login
