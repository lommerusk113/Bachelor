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
        marginTop: 15,
        fontWeight: "bold",
        fontSize: 15,

    },

    //SPACING
    lokasjonSpacing: {
        marginTop: "10%",
    },

    // FRA -> TIL
    lokasjonKategori: {
        marginTop: 10,
        fontSize: 20,
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


    //SE I KART KNAPP
    greenButton: {
        marginTop: "10%",
        width:200,
        backgroundColor: "rgb(165, 255, 221)",
        borderRadius: 15,
    },

    //SLETT TUR KNAPP
    redButton: {
        marginTop: 10,
        width:200,
        backgroundColor: "rgb(255, 201,216)",
        borderRadius: 15,
    },

    //TEKST INNI KNAPPER
    buttonText: {
        color: "black",
    },

})

export default HistorikkUnderStyles

