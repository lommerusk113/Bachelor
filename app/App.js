import * as React from 'react';
import {useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './config/firebase';

import Loginscreen from "./Screens/Loginscreen"
import HomeScreen from "./Screens/HomeScreen"
import GlemtPassordScreen from "./Screens/GlemtPassordScreen"
import SignupScreen from "./Screens/SignupScreen"

export default function App({ navigation }) {
  const Stack = createNativeStackNavigator();

    // SJEKK OM BRUKER ER LOGGET INN
    const user = auth.currentUser
    let loggedin

    if (user) {
      loggedin = "Home"
        console.log("user is signed in")
    }else{
        console.log("user is not logged in")
      loggedin = "Login"
    }



  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={loggedin}>
          <Stack.Screen name="Home" options={{ title: 'Hjem', headerTitleStyle:{fontSize: 25 }}} component={HomeScreen}/>
          <Stack.Screen name="Login" option = {{title: "Innlogging"}} component={Loginscreen} />
          <Stack.Screen name="Glemt Passord" option = {{title: "Glemt Passord"}} component={GlemtPassordScreen} />
          <Stack.Screen name="Registrering" option = {{title: "Registrering"}} component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

