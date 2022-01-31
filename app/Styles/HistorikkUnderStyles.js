import {  StyleSheet} from 'react-native';
const HistorikkUnderStyles = StyleSheet.create({

    // CONTAINER
    underSideKatContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
    },

    //KATEGORIER
    underSideKategori: {
        marginTop: 10,
    },

    //TITTEL INPUT
    input: {
        backgroundColor: 'rgb(220, 220,220)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        color: "black",
        fontSize: 20,
        fontWeight: "800",
        maxWidth: 200,
        height: "auto",
    },

    //LAGRE TITTEL
    lagreButton: {
        marginTop: 5,
        borderColor: "blue",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 2,
        width: 75,
        height: 30,
        borderRadius: 9,
    },

    //BUTTON CONTAINER
    buttonContainer: {
        marginBottom: 0,
    },

    //SE I KART KNAPP
    greenButton: {
        width:200,
        backgroundColor: "rgb(85, 175, 130)",
        borderRadius: 0,
    },

    //SLETT TUR KNAPP
    redButton: {
        width:200,
        backgroundColor: "rgb(225, 100,100)",
        borderRadius: 0,
    },

    //TEKST INNI KNAPPER
    buttonText: {
        color: "black",
    },

})

export default HistorikkUnderStyles

