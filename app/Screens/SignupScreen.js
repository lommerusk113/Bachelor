import React, {useState} from 'react'
import { TouchableWithoutFeedback, Keyboard, Text, View, TextInput, SafeAreaView, Image, Pressable, Dimensions} from 'react-native';
import { auth } from '../config/firebase';
import { handleSignup  } from "../Funksjoner/signupFunksjon"
import styles from "../Styles/Styles"
import InnloggingStyles from '../Styles/InnloggingStyles';

const SignupScreen = ({ navigation }) => {
    //USER INPUT
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [bekreftSignupPassword, setBekreftSignupPassword] = useState();

    // REGISTRER
    const onHandleSignup = async () => {
        await handleSignup(email, password, bekreftSignupPassword, navigation);
        setPassword("");
        setBekreftSignupPassword("");
    }

    return (
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
        <SafeAreaView style={styles.container} >
                {/* LOGO */}
                <Image style={styles.logo} source={require("../Images/logo.png")}/>

                {/* SKJEMA FOR REGISTRERING */}
                <Text style={styles.header}>Registrer</Text>
                <View style={InnloggingStyles.inputContainer}>
                    <Text>E-post</Text>
                    <TextInput onChangeText={(username) => {setEmail(username)}} style={InnloggingStyles.input} placeholder={"E-post"} value={email}/>
                    <Text>Passord</Text>
                    <TextInput onChangeText={(password) => {setPassword(password)}} style={InnloggingStyles.input} secureTextEntry value={password} placeholder={"Passord"}/>
                    <Text>Gjenta Passord</Text>
                    <TextInput onChangeText={(password) => {setBekreftSignupPassword(password)}}
                        style={InnloggingStyles.input} secureTextEntry value={bekreftSignupPassword} placeholder={"Gjenta Passord"}/>
                </View>

                {/* BEKREFT REGISTRERING */}
                <View style={InnloggingStyles.buttonContainer}>
                        <Pressable onPress= {onHandleSignup} style={[InnloggingStyles.button, InnloggingStyles.buttonOutline, {marginBottom: 65}]}>
                            <Text style={InnloggingStyles.buttonOutlineText}>Registrer!</Text>
                        </Pressable>
                </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}



export default SignupScreen



