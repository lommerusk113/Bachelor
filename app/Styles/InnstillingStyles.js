import {  StyleSheet} from 'react-native';

const Instillingstyles = StyleSheet.create({
    buttons:{
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 15,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
    scrollViewWrapper: {
        marginTop: 150,
        width: "50%",
      },
      buttonContainer: {
        width: '60%',
        minWidth: 235,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },

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

    buttonOutline: {
        backgroundColor: 'rgb(7, 130, 249)',
        marginTop: 5,
        borderColor: 'black',
        borderWidth: 1,
    },

    buttonOutlineText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default Instillingstyles
