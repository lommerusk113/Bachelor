import {  StyleSheet} from 'react-native';
const KjøringStyles = StyleSheet.create({

    // CONTAINER TIL STARTKNAPP
    startContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,

    },

    //TEKST INNI CONTAINER
    startContainerText: {
        fontSize: 20,
    },

    // STARTKNAPP
    startButton: {
        justifyContent: "center",
        alignItems: "center",
        width: 210,
        height: 210,
    },

    //BILDET INNI KNAPPEN
    playImage: {
        width: 200,
        height: 200,
        borderColor: '#0782F9',
        borderWidth: 5,
        borderRadius: 100,
    },
    stopwatch: {
        marginBottom: "30%",
    }
})

export default KjøringStyles