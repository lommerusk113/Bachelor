import * as React from 'react';
import {useState, useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './config/firebase';
import { Button, View, Text } from 'react-native';

import Loginscreen from "./Screens/Loginscreen";
import HomeScreen from "./Screens/HomeScreen";
import GlemtPassordScreen from "./Screens/GlemtPassordScreen";
import SignupScreen from "./Screens/SignupScreen";
import Kjøring from "./Screens/Kjøring";
import Historikk from "./Screens/Historikk";

export default function App({ navigation }) {
  const Stack = createNativeStackNavigator();

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();






    function handleAuthStateChanged(user) {
      console.log(`handleAuth: user is ${user}`);
      if (user){
        setUser(user);
      }

      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = auth.onAuthStateChanged(handleAuthStateChanged);
      return subscriber;
    }, []);

    if (initializing) return (<Text>loading...</Text>);
    let loggedin
    if (!user){
      console.log("not logged in");
    }else{
      console.log("logged in");
    }




  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options = {{title: "Innlogging", headerShown: false}} component={Loginscreen} />
          <Stack.Screen name="Home" options={{ title: 'Hjem', headerShown: false}} component={HomeScreen}/>
          <Stack.Screen name="Glemt Passord" option = {{title: "Glemt Passord"}} component={GlemtPassordScreen} />
          <Stack.Screen name="Registrering" option = {{title: "Registrering"}} component={SignupScreen} />
          <Stack.Screen name="Kjøring" options={{ title: 'Kjøring'}} component={Kjøring}/>
          <Stack.Screen name="Historikk" options={{ title: 'Historikk'}} component={Historikk}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

