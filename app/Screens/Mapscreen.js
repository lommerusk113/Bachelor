import React from 'react';
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Pressable, Keyboard, Dimensions} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';

const Mapscreen = ({navigation,  route: {params}}) => {

    let latDelt = 0.0922
    const {width, height} = Dimensions.get("window");
    const aspect = width / height
    let longDelt = 0.00038
    console.log(longDelt)

    return (
        <View>
            <MapView
                style={{height: "100%"}}
                initialRegion={{
                    latitude: params.coords[0].coords.latitude,
                    longitude: params.coords[0].coords.longitude,
                    latitudeDelta: latDelt,
                    longitudeDelta: longDelt
                }}>
                 <Polyline
                        coordinates={params.coords.map((value, index) => {
                            return {latitude: value.coords.latitude, longitude: value.coords.longitude}
                        })}
                        strokeColor="#000"
                        strokeColors={[
                            '#7F0000',
                            '#00000000',
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                />
                {params.coords.map((value, index) => {
                            return (
                                <MapView.Marker key={index}
                                    coordinate={{latitude: value.coords.latitude, longitude: value.coords.longitude}}
                                    title={index.toString()}
                                />
                        )})}
            </MapView>
        </View>);
};

export default Mapscreen;
