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
                    onPress: () => {
                        Alert.alert('','Kjøreturen ble ikke slettet!',)

                    },
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
            {logo?
            <View>
            {/* BARE VIS LOGO DERSOM ENDRE TITTEL FELTET IKKE ER ONFOCUS */}
            {/* LOGO */}
                <Image style={styles.logo} source={require("../Images/logo.png")}/>
                {/* HEADER */}
            <Text style={[styles.header]}>Din Kjøretur</Text>
           </View>
           : null
            }
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
               <Text style={HistorikkUnderStyles.underSideKategori}>Avstand: {params.distance} km</Text>
               <Text style={HistorikkUnderStyles.underSideKategori}>Tidsbruk: {params.duration}</Text>
               <Text style={HistorikkUnderStyles.underSideKategori}>Klokkeslett: {params.data.clock}</Text>
               <Text style={HistorikkUnderStyles.underSideKategori}>Dato: {params.data.date}</Text>
           </KeyboardAvoidingView>


           {/* BUNNKNAPPER */}
            <View style={[InnloggingStyles.buttonContainer, HistorikkUnderStyles.buttonContainer]}>
                <View style={[HistorikkStyles.flexContainer]}>

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
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>

  )
};

export default HistorikkUnderside;
