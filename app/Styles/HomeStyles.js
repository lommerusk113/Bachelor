import {  StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get("window")

let buttonHeight = "30%"
let imageWidth = "65%"
let imageHeight = "65%"

if (height < 704){
    buttonHeight = "25%"
    imageWidth = "40%"
    imageHeight = "65%"
}


const HomeStyles = StyleSheet.create({
    //NAVIGASJONSKNAPP
    kategoriButton: {
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: buttonHeight,
        borderRadius: 12,
        marginBottom:20,
    },

    //BILDE I NAVIGASJONSKNAPP
    kategoriImage: {
        width: imageWidth,
        height: imageHeight,
    },
})

export default HomeStyles




// 360 /  592  Studio Liten

// 391 / 813  Studio stor

// 384 / 766  Min mob

// 360 / 703 Fredrik mob


// Home, Description