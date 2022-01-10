import React, {useState} from 'react'
import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable} from 'react-native';
import { auth } from '../config/firebase';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [openLogin, setOpenLogin] = useState(false);
    const [userEmail, setUserEmail] = useState();
    const [glemtPassord, setGlemtPassord] = useState(false);
    const [glemtEpost, setGlemtEpost] = useState();
    const [signup, setSignup] = useState(false);

    // Opens Login if the user is not logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUserEmail(user.email);
        }else{
            setOpenLogin(true);
        }
    })
    // Checks if the user has typed in a valid username and password
    const onLogin = async () => {
        try {
          if (email !== '' && password !== '') {
           await auth.signInWithEmailAndPassword(email, password);
           setOpenLogin(false);
           console.log("Logged in");
          }
        } catch (error) {
          console.log(error);
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
                        console.log(user.email);
                        onLogin();
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
            console.log("Logged out!")
            setEmail("")
            setPassword("")
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
             <Modal  animationType="slide" visible={openLogin} >
                 <View style={styles.container}>

                     {/* SKJEMA FOR INLOGGING */}
                     <Text style={styles.header}>Innlogging</Text>
                    <View style={styles.inputContainer}>
                        <Text>E-post</Text>
                        <TextInput onChangeText={(username) => {setEmail(username)}} style={styles.input}/>
                        <Text>Passord</Text>
                        <TextInput onChangeText={(password) => {setPassword(password)}} style={styles.input} secureTextEntry />
                    </View>

                    {/* REGISTRERING KNAPP*/}
                    <Text style={styles.clickableText} onPress= {() => {setSignup(true)}}>Har du ikke en bruker enda?</Text>

                    {/* KNAPPER FOR INLOGGING SKJEMA */}
                    <View style={styles.buttonContainer}>

                        {/* LOGIN KNAPP */}
                        <TouchableOpacity onPress={onLogin} style={[styles.button, styles.buttonOutline]}>
                            <Text style={styles.buttonOutlineText}>Logg Inn!</Text>
                        </TouchableOpacity>

                        {/* GLEMT PASSORD */}
                        <TouchableOpacity onPress={() => setGlemtPassord(true)} style={[styles.button, styles.buttonOutline]}>
                            <Text style={styles.buttonOutlineText}>Glemt Passord?</Text>
                        </TouchableOpacity>

                    </View>


                    {/* MODULE FOR GLEMT PASSORD */}
                    <Modal animationType="slide" visible={glemtPassord} >

                        {/* TILBAKE KNAPP */}
                        <TouchableOpacity style= {styles.backButton} onPress={() => setGlemtPassord(false)}>
                            <Text style={styles.buttonOutlineText}>Tilbake</Text>
                        </TouchableOpacity>


                        <SafeAreaView style={styles.container}>

                            {/* INPUT FELT FOR GLEMT PASSORD */}
                            <Text>E-postadresse</Text>
                            <View style={styles.inputContainer}>
                                <TextInput onChangeText={(glemt) => {setGlemtEpost(glemt)}} style={styles.input}/>
                            </View>

                            {/* BEKREFT GLEMT PASSORD */}
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={handleGlemt} style={[styles.button, styles.buttonOutline]}>
                                    <Text style={styles.buttonOutlineText}>Bekreft!</Text>
                                </TouchableOpacity>
                            </View>

                        </SafeAreaView>

                    </Modal>

                    {/* MODAL FOR REGISTRERING*/}
                    <Modal animationType="slide" visible={signup}>

                        {/* TILBAKEKNAPP */}
                        <TouchableOpacity style= {styles.backButton} onPress={() => setSignup(false)}>
                            <Text style={styles.buttonOutlineText}>Tilbake</Text>
                        </TouchableOpacity>

                         <SafeAreaView style={styles.container}>

                             {/* SKJEMA FOR REGISTRERING */}
                             <Text style={styles.header}>Registrer</Text>
                            <View style={styles.inputContainer}>
                                <Text>E-post</Text>
                                <TextInput onChangeText={(username) => {setEmail(username)}} style={styles.input}/>
                                <Text>Passord</Text>
                                <TextInput onChangeText={(password) => {setPassword(password)}} style={styles.input} secureTextEntry />
                            </View>

                            {/* BEKREFT REGISTRERING */}
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress= {onHandleSignup} style={[styles.button, styles.buttonOutline]}>
                                    <Text style={styles.buttonOutlineText}>Registrer!</Text>
                                </TouchableOpacity>
                            </View>

                         </SafeAreaView>

                    </Modal>
                </View>
            </Modal>

            {/* TEKST FOR MAINPAGE */}
            <Text>Velkommen</Text>
            <Text>{userEmail}</Text>

            {/* KNAPP FOR Å LOGGE UT */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={(handleLogout)} style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Logg ut!</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

      //TEXT
      header: {
        fontSize: 30,
        marginBottom: 10,
      },

      clickableText: {
        color: "blue",
        marginTop: 5,
        borderBottomWidth: 2,
        borderBottomColor: "blue",

      },

      // INPUT
      inputContainer: {
        width: '80%'
      },
      input: {
        backgroundColor: 'rgb(220, 220,220)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        color: "black",
        fontSize: 20,
        fontWeight: "800",
      },

      //BUTTON
      buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
      },
      backButton: {
        marginTop: 15,
        borderWidth: 2,
        borderColor: "grey",
        borderRadius: 30,
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5,

      },
})

export default Login
