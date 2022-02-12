import {  StyleSheet} from 'react-native';



const InnloggingStyles = StyleSheet.create({
    // CONTAINER FOR INPUT FELT
    inputContainer: {
        width: '80%'
    },


    // INPUT FELT
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        color: "black",
        fontSize: 20,
        fontWeight: "800",

        marginBottom: 10,


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    // GLEMT PASSORD
    glemtPassord: {
        marginTop: 5,
        marginLeft: "50%",
    },

    //GLEMT PASSORD TEKST
    glemtPassordTekst: {
        color: "rgb(7, 130, 249)",
        fontSize: 15,
        fontWeight: "bold",
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
        width: '100%',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },

    // OUTLINE TIL KNAPP
    buttonOutline: {
        backgroundColor: 'rgb(7, 130, 249)',
        marginTop: 5,
        borderColor: 'black',
        borderWidth: 1,
    },

    //OUTLINE TIL TEKST I KNAPP
    buttonOutlineText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },

    //HAR DU IKKE EN BRUKER
    clickableText: {
        marginTop: "25%",
        color: "rgb(7, 130, 249)",
        fontSize: 15,
        fontWeight: "bold",
    },

    //FLEXCONTAINER FOR CHECKBOX
    flexCheckBox: {
        flexDirection: "row",
    },

    //CHECKBOX
    checkBox: {
        borderWidth: 1,
        width: 20,
        height: 20,
        marginTop: 5
    },

    //CHECKBOX TEXT
    checkBoxText: {
        marginLeft: 10,
        marginTop: 10,
    },
    // CLICKABLE CHECKBOX TEXT
    checkBoxTextClickable: {
        marginTop: 10,
        color: "rgb(7,130,249)"
    },

})

export default InnloggingStyles