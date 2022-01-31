import {  StyleSheet} from 'react-native';
const HistorikkStyles = StyleSheet.create({
    //CONTAINER FOR SORTERINGSVELGER
    pickerContainer:{
        borderBottomWidth: 1,
        marginLeft: 190,
    },

    // SORTERINGSVELGER
    picker: {
        width: 183,
        color: "black",
    },

    //WRAPPER SOM KAN SCROLLES I
    turWrapper: {
      marginTop: 10,
      width: "100%",
    },

    //CONTAINER FOR TURER
    turContainer: {
        justifyContent: "center",
        alignItems: "center",
    },

    //KNAPPENE SOM VISES TURER
    historikkDisplay: {
        borderWidth: 1,
        borderRadius: 12,
        width: 300,
        padding: 15,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },

    //TITTEL FOR KJØRETUR
    historikkTitle: {
        marginBottom: 20,
    },

    //FLEXBOX CONTAINER
    flexContainer: {
        display: "flex",
        flexDirection: "row",
    },

    //AVSTAND MELLOM FLEXBOX ITEMS
    leftFlexItem: {
        marginRight: 80,
    },

})

export default HistorikkStyles