import {  StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get("window")

let buttonHeight = "27%"
let imageWidth = "35%"
let imageHeight = "50%"

if (height < 704){
    buttonHeight = "25%"
    imageWidth = "25%"
    imageHeight = "45%"
}


const HomeStyles = StyleSheet.create({

    //BUTTON CONTAINEr
    kategoriContainer: {
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
    },
    //NAVIGASJONSKNAPP
    kategoriButton: {
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: buttonHeight,
        borderRadius: 15,
        marginBottom:20,



    },

    //BILDE I NAVIGASJONSKNAPP
    kategoriImage: {
        width: imageWidth,
        height: imageHeight,
    },
    buttonText: {
       color: "black",
       fontSize: 25,
    },

    instillingerContainer: {
        borderRadius: 15,
        borderWidth: 1,
        height: 50,
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        backgroundColor: 'rgb(7, 130, 249)',
    }
})

export default HomeStyles




// 360 /  592  Studio Liten

// 391 / 813  Studio stor

// 384 / 766  Min mob

// 360 / 703 Fredrik mob


// Home, Description