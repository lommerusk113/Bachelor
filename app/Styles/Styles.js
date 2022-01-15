import {  StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

      //LOGO
      logo: {


      },

      //TEXT
      header: {
        fontSize: 30,
        fontWeight: "100",
        marginBottom: 10,
      },

      clickableText: {
        color: "blue",
        marginTop: 5,
        borderBottomWidth: 2,
        borderBottomColor: "blue",

      },

      // INPUT
      inputContainer: {
        width: '80%'
      },
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

      //BUTTON
      buttonContainer: {
        width: '60%',
        minWidth: 235,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
      },
      backButton: {
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#0782F9',
        borderRadius: 10,
        width: 90,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5,

      },
});

export default styles