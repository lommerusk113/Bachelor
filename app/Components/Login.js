import React, {useState} from 'react'
import {  StyleSheet,Text, Button, View, Modal, Alert, TextInput, SafeAreaView, TouchableOpacity, Touchable, Image} from 'react-native';
import { auth } from '../config/firebase';

const Login = () => {
    //LOGIN INPUT
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    //SIGNUP INPUT
    const [bekreftSignupPassword, setBekreftSignupPassword] = useState();

    //MODAL OPEN / CLOSE
    const [glemtPassord, setGlemtPassord] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [signup, setSignup] = useState(false);

    //E-POST TIL INLOGGET BRUKER
    const [userEmail, setUserEmail] = useState();

    //E-POST FOR GLEMT BRUKER
    const [glemtEpost, setGlemtEpost] = useState();


    // Opens Login if the user is not logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUserEmail(user.email);

            //REMOVE EMAIL AND PASSWORD ON LOGIN
            setEmail("");
            setPassword("");
            setBekreftSignupPassword("");
        }else{
            setOpenLogin(true);
        }
    })

    // Checks if the user has typed in a valid username and password
    const onLogin = async () => {
        console.log("Attempting login!")
        try {
          if (email !== '' && password !== '') {
           await auth.signInWithEmailAndPassword(email, password);
           setOpenLogin(false);
           console.log("Logged in");

           //TØM FELTENE NÅR BRUKEREN LOGGER INN
           setEmail("");
           setPassword("");
          }else{
            Alert.alert('','Vennligst fyll inn feltene for E-post og Passord',)
          }
        } catch (error) {

            // FEIL PASSORD
            if (error.message == "The password is invalid or the user does not have a password."){
                Alert.alert('','Brukernavn eller Passord er feil!',)

            // FEIL E-POST
            }else if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
                Alert.alert('','Brukernavn eller Passord er feil!',)

            // BRUKEREN HAR IKKE FYLT INN EPOST
            }else if(error.message == 'First argument "email" must be a valid string.'){
                Alert.alert('','Vennligst fyll inn feltet for E-post',)

            // BRUKEREN HAR IKKE FYLT INN PASSORD
            }else if(error.message == 'Second argument "password" must be a valid string.'){
                Alert.alert('','Vennligst fyll inn feltet for Passord',)

            // DÅRLIG FORMATERT EPOST
            }else if (error.message == "The email address is badly formatted."){
                Alert.alert('','E-post adressen du har skrevet inn er ikke gyldig!',)

            // EN ANNEN FEIL HAR OPSTÅTT
            }else{
                Alert.alert('','En feil har oppstått!',)
                console.log(error.message);
            }
        }
     };

    //Lets the user sign-up
    const onHandleSignup = async () => {
        try{
            if (email !== '' && password !== '') {
                if (bekreftSignupPassword == password){
                    await auth
                    .createUserWithEmailAndPassword(email, password)
                    .then(userCredentials => {
                        const user = userCredentials.user;
                        console.log(user.email);

                        //LOGG INN VED REGISTRERING
                        onLogin();

                        setSignup(false)
                    })
                }else{
                    //BEKREFT PASSORD OG PASSORD ER ULIK
                    Alert.alert('','Passord og Bekreft Passord må være lik!',)
                    setPassword("");
                    setBekreftSignupPassword("");
                }
            }else{
                Alert.alert('','Vennligst fyll inn alle feltene!',)
            }
        } catch(error){

            // EN BRUKER MED DENNE EPOSTEN EKSISTERER ALLEREDE
            if (error.message == "The email address is already in use by another account."){
                Alert.alert('','En bruker med denne e-post adressen eksisterer allerede!',)
            }

            // EPOST ADRESSE HAR FEIL FORMAT
            else if(error.message == "The email address is badly formatted."){
                Alert.alert('','E-post adressen du har skrevet inn har feil format!',)
            }

            //BRUKER HAR SKREVET FOR KORT PASSORD
            else if(error.message == "Password should be at least 6 characters"){
                Alert.alert('','Passord må inneholde minimum 6 tegn!',)
            }else{
                Alert.alert('','Det har oppstått en feil!',)
                console.log(error)
            }
        }
    }

    // Log out user on click
    const handleLogout = () => {
        auth.signOut().then(function() {
            // Sign-out successful.
            console.log("Logged out!")
          }, function(error) {
            // An error happened.
          });
    }

    //Glemt Passord
    const handleGlemt = async () => {
        try{
            if (glemtEpost !== ""){
                await auth
                .sendPasswordResetEmail(glemtEpost)
                Alert.alert('','E-post for tilbakestilling av ditt passord er sendt', [{text: "Ok", onPress: () => {setGlemtPassord(false)}}])
            }else{
                Alert.alert('','Vennligst fyll in feltet!',)
            }

        }catch(error){
            Alert.alert('','Det finnes ingen bruker med denne E-posten!',)
        }
    }

    return (
        <SafeAreaView>
             <Modal  animationType="slide" visible={openLogin} >
                 <View style={styles.container}>

                     {/* LOGO */}
                    <Image style={styles.logo} source={require("../Images/logo.png")}/>


                    {/* SKJEMA FOR INLOGGING */}
                    <Text style={styles.header}>Innlogging</Text>
                    <View style={styles.inputContainer}>
                        <Text>E-post</Text>
                        <TextInput onChangeText={(username) => {setEmail(username)}} style={styles.input} placeholder={"E-post"}/>
                        <Text>Passord</Text>
                        <TextInput onChangeText={(password) => {setPassword(password)}} style={styles.input} secureTextEntry placeholder={"Passord"} />
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
                            {/* LOGO */}
                            <Image style={styles.logo} source={require("../Images/logo.png")}/>

                            {/* HEADER */}
                            <Text style={styles.header}>Glemt Passord</Text>

                            {/* INPUT FELT FOR GLEMT PASSORD */}
                            <View style={styles.inputContainer}>
                                <Text>E-post</Text>
                                <TextInput onChangeText={(glemt) => {setGlemtEpost(glemt)}} style={styles.input} placeholder={"E-post"}/>
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

                             {/* LOGO */}
                            <Image style={styles.logo} source={require("../Images/logo.png")}/>

                             {/* SKJEMA FOR REGISTRERING */}
                             <Text style={styles.header}>Registrer</Text>
                            <View style={styles.inputContainer}>
                                <Text>E-post</Text>
                                <TextInput onChangeText={(username) => {setEmail(username)}} style={styles.input} placeholder={"E-post"} value={email}/>
                                <Text>Passord</Text>
                                <TextInput onChangeText={(password) => {setPassword(password)}} style={styles.input} secureTextEntry value={password} placeholder={"Passord"}/>
                                <Text>Gjenta Passord</Text>
                                <TextInput onChangeText={(password) => {setBekreftSignupPassword(password)}}
                                style={styles.input} secureTextEntry value={bekreftSignupPassword} placeholder={"Gjenta Passord"}/>
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
            <View style={styles.container}>
                <Text>Velkommen</Text>
                <Text>{userEmail}</Text>

                {/* KNAPP FOR Å LOGGE UT */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={(handleLogout)} style={[styles.button, styles.buttonOutline]}>
                        <Text style={styles.buttonOutlineText}>Logg ut!</Text>
                    </TouchableOpacity>
                </View>
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

      //LOGO
      logo: {


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
        minWidth: 235,
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
