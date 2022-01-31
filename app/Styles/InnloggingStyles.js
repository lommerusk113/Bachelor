import {  StyleSheet} from 'react-native';



const InnloggingStyles = StyleSheet.create({
    // CONTAINER FOR INPUT FELT
    inputContainer: {
        width: '80%'
    },

    // INPUT FELT
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

    // CONTAINER TIL KNAPPER
    buttonContainer: {
        width: '60%',
        minWidth: 235,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },

    // KNAPP
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    // OUTLINE TIL KNAPP
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },

    //TEKSTEN INNI KNAPPEN
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },

    //OUTLINE TIL TEKST I KNAPP
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },

    //HAR DU IKKJE EN BRUKER
    clickableText: {
        color: "blue",
        marginTop: 5,
        borderBottomWidth: 2,
        borderBottomColor: "blue",
    },

})

export default InnloggingStyles