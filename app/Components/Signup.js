import React, {useState} from 'react'
import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput, SafeAreaView} from 'react-native';
import { auth } from "../config/firebase"

const Signup = () => {
    const [openSignup, setOpenSignup] = useState(false);
    const [uname, setUname] = useState()
    const [pword, setPword] = useState()


    const onHandleSignup = () => {
        try{
            if (uname !== '' && pword !== '') {
                auth
                    .createUserWithEmailAndPassword(uname, pword)
                    .then(userCredentials => {
                        const user = userCredentials.user;
                        console.log(user.email)
                    })
                setOpenSignup(false)
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <SafeAreaView>
            <Button onPress= {() => setOpenSignup(true)} title="Signup!" />
            <Modal animationType="slide" visible={openSignup} >
                <Text>E-post</Text>
                <TextInput onChangeText={(username) => {setUname(username)}} />
                <Text>Passord</Text>
                <TextInput onChangeText={(password) => {setPword(password)}}/>
                <Button onPress= {onHandleSignup} title="Submit" />
                <Button onPress= {() => setOpenSignup(false)} title="Already have an account?!" color="#841584" />
            </Modal>
        </SafeAreaView>
    )
}

export default Signup
