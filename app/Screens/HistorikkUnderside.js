import React, {useState} from 'react';
import { Button, View, Text, SafeAreaView, TouchableWithoutFeedback, Image, TextInput, Pressable, Keyboard, KeyboardAvoidingView, Alert} from 'react-native';
import styles from "../Styles/Styles"
import HistorikkUnderStyles from '../Styles/HistorikkUnderStyles';
import HistorikkStyles from '../Styles/HistorikkStyles';
import InnloggingStyles from "../Styles/InnloggingStyles"
import {deleteDB, updateTitle} from "../config/firebasedb"


const HistorikkUnderside = ({navigation,  route: {params}}) => {
    const [tittel, setTittel] = useState();
    const [description, setDescription] = useState();

    const [logo, setLogo] = useState(true);


    // OPPDATER TITTELEN
    const handleUpdateTitle = () => {
        params.data.title = tittel
        updateTitle(params.data, params.id)
        setTittel("")
        Keyboard.dismiss()

    };

    const handleDelete = () => {
        // SLETT KJØRETUR
        Alert.alert(
            'Slett Kjøretur',
            'Er du sikker på at du vil slette denne kjøreturen?',
            [
                {
                    // DERSOM BRUKEREN IKKE VIL SLETTE
                    text: 'Nei',
                    style: 'cancel',
                },
                // DERSOM BRUKER VIL SLETTE
                {text: 'Ja', onPress: () => {
                    deleteDB(params.id)
                    navigation.navigate("Historikk")

                }},
            ]
        );


    };



  return(
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
        <View style={styles.container}>
        <Text style={[HistorikkUnderStyles.underSideKategori, HistorikkUnderStyles.lokasjonSpacing]}>{params.data.date}</Text>
            {/* ENDRE TITTEL */}
           <KeyboardAvoidingView style={HistorikkUnderStyles.underSideKatContainer}>
               <Text style={HistorikkUnderStyles.underSideKategori}>Tittel</Text>
               <TextInput maxHeight={110} onBlur={() => {setLogo(true)}} onFocus={() => {setLogo(false)}} maxLength={80} multiline = {true} onChangeText={(text) => {setTittel(text)}} style={HistorikkUnderStyles.input} placeholder={params.data.title} value={tittel}/>
                {
                tittel?
                <Pressable onPress={handleUpdateTitle} style={HistorikkUnderStyles.lagreButton}>
                    <Text>Lagre</Text>
                </Pressable>
                :null}


                  {/* KATEGORIER  */}
                <View style={HistorikkStyles.flexContainer}>
                    <Text style={[HistorikkUnderStyles.underSideKategori, HistorikkStyles.leftFlexItem]}>{params.distance} km</Text>
                    <Text style={[HistorikkUnderStyles.underSideKategori, HistorikkStyles.leftFlexItem]}>{params.duration}</Text>
                    <Text style={[HistorikkUnderStyles.underSideKategori]}>{params.data.clock}</Text>
                </View>

               <Text style={[HistorikkUnderStyles.lokasjonKategori, HistorikkUnderStyles.lokasjonSpacing]}>Fra: {params.data.startsted}</Text>
               <Text style={HistorikkUnderStyles.lokasjonKategori}>Til: {params.data.sluttsted}</Text>

                {/* BUNNKNAPPER */}


                    {/* SE I KART */}
                    <Pressable
                        onPress={() =>
                            {navigation.navigate("Mapscreen",{title: params.data.title, coords: params.data.coords})}}
                        style={[InnloggingStyles.button, InnloggingStyles.buttonOutline, HistorikkUnderStyles.greenButton]}>
                        <Text style={[InnloggingStyles.buttonOutlineText, HistorikkUnderStyles.buttonText]}>Se i kart</Text>
                    </Pressable>

                    {/* SLETT KNAPP */}
                    <Pressable onPress={handleDelete} style={[InnloggingStyles.button, InnloggingStyles.buttonOutline, HistorikkUnderStyles.redButton]}>
                        <Text style={[InnloggingStyles.buttonOutlineText, HistorikkUnderStyles.buttonText]}>Slett Tur</Text>
                    </Pressable>
           </KeyboardAvoidingView>
        </View>
        </TouchableWithoutFeedback>

  )
};

export default HistorikkUnderside;
