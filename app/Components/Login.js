import React, {useState} from 'react'
import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput, SafeAreaView} from 'react-native';
import { auth } from '../config/firebase';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [openLogin, setOpenLogin] = useState(false);
    const [userEmail, setUserEmail] = useState();
    const [glemtPassord, setGlemtPassord] = useState(false);
    const [glemtEpost, setGlemtEpost] = useState();

    // Opens Login if the user is not logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUserEmail(user.email);
        }else{
            setOpenLogin(true)
        }
    })
    // Checks if the user has typed in a valid username and password
    const onLogin = async () => {
        try {
          if (email !== '' && password !== '') {
           await auth.signInWithEmailAndPassword(email, password);
           setOpenLogin(false)
          }
        } catch (error) {
          console.log(error)
       }
     };

    //Lets the user sign-up
    const onHandleSignup = () => {
        try{
            if (email !== '' && password !== '') {
                auth
                    .createUserWithEmailAndPassword(email, password)
                    .then(userCredentials => {
                        const user = userCredentials.user;
                        console.log(user.email)
                        onLogin()
                    })
            }
        }catch(error){
            console.log(error)
        }
    }

    // Log out user on click
    const handleLogout = () => {
        auth.signOut().then(function() {
            // Sign-out successful.
          }, function(error) {
            // An error happened.
          });
    }

    //Glemt Passord
    const handleGlemt = () => {
        try{
            auth
            .sendPasswordResetEmail(glemtEpost)
            .then(Alert.alert('','E-post for resetting av ditt passord er sendt', [{text: "Ok", onPress: () => {setGlemtPassord(false)}}]))
        }catch(error){
            console.log(error)
        }
    }




    return (
        <SafeAreaView>
             <Modal style={styles.modal} animationType="slide" visible={openLogin} >
                <Text>E-post</Text>
                <TextInput onChangeText={(username) => {setEmail(username)}} />
                <Text>Passord</Text>
                <TextInput onChangeText={(password) => {setPassword(password)}} />
                <Button onPress={onLogin} title="Logg inn!" color= "#00ffff"/>
                <Button onPress= {onHandleSignup} title="Signup!" />
                <Button title="Glemt Passord?" color= "#00ffff" onPress={() => setGlemtPassord(true)}/>
                {/* Om brukeren har glemt sitt passord */}
                <Modal style={styles.modal} animationType="slide" visible={glemtPassord} >
                    <SafeAreaView>
                        <Text>E-postadresse</Text>
                        <TextInput onChangeText={(glemt) => {setGlemtEpost(glemt)}}/>
                        <Button onPress={handleGlemt} title="Bekreft!" color= "#00ffff"/>
                    </SafeAreaView>
                </Modal>
            </Modal>
            <Text>Hei {userEmail}</Text>
            {/* <Button onPress={() => setOpenLogin(true)} title="Logg inn!" color="#841584" />  */}
            <Button onPress={handleLogout} title="Logg ut!" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
})

export default Login
