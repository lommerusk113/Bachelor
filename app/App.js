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
import HistorikkUnderside from "./Screens/HistorikkUnderside";
import Mapscreen from './Screens/Mapscreen';
import Instillinger from './Screens/Instillinger';

export default function App({ navigation }) {
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options = {{title: "Innlogging", headerShown: false}} component={Loginscreen} />
          <Stack.Screen name="Home" options={{ title: 'Hjem', headerShown: false}} component={HomeScreen}/>
          <Stack.Screen name="Glemt Passord" option = {{title: "Glemt Passord"}} component={GlemtPassordScreen} />
          <Stack.Screen name="Registrering" option = {{title: "Registrering"}} component={SignupScreen} />
          <Stack.Screen name="Kjøring" options={{ title: 'Kjøring'}} component={Kjøring}/>
          <Stack.Screen name="Historikk" options={{ title: 'Dine Kjøreturer'}} component={Historikk}/>
          <Stack.Screen name="HistorikkUnderside" options={{ title: 'Din Kjøretur'}} component={HistorikkUnderside}/>
          <Stack.Screen name="Mapscreen"  options={({ route }) => ({ title: route.params.title })} component={Mapscreen}/>
          <Stack.Screen name="Instillinger" options={{ title: 'Instillinger'}} component={Instillinger}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

