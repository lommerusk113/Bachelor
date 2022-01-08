import React, {useState} from 'react'
import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput} from 'react-native';
import { auth } from "../config/firebase"

const Signup = () => {
    const [openSignup, setOpenSignup] = useState(false);
    const [uname, setUname] = useState()
    const [pword, setPword] = useState()


    const onHandleSignup = () => {
        auth
            .createUserWithEmailAndPassword(uname, pword)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email)
            })
            .catch(error => {
                alert(error.message)
            })
        setOpenSignup(false)
    }


    return (
        <View>
            <Button
                onPress= {() => setOpenSignup(true)}
                title="Signup!"
            />
            <Text>{openSignup}</Text>
            <Modal
                animationType="slide"
                visible={openSignup}
            >
                <Text>Brukernavn</Text>
                <TextInput
                    onChangeText={(username) => {setUname(username)}}
                />
                <Text>Passord</Text>
                <TextInput
                    onChangeText={(password) => {setPword(password)}}
                />
                <Button
                   onPress= {onHandleSignup}
                   //onPress={() => {setOpenSignup(false)}}
                   title="Submit"
                />
                <Text>{uname}</Text>
                <Text>{pword}</Text>
            </Modal>
        </View>
    )
}

export default Signup
