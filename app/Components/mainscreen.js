import React, {useState} from 'react'
import {  StyleSheet,Text, Button, View, Modal, SafeAreaView} from 'react-native';
import Login from './Login';
import { auth } from '../config/firebase';


function Mainscreen() {
    return (
        <SafeAreaView>
           <Login />
        </SafeAreaView>
    )
}

export default Mainscreen
