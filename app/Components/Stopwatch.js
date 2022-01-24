import React, {useState, useEffect} from 'react';
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, Pressable} from 'react-native';
import {starting} from "../Funksjoner/kjøringbutton"

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [calcedTime, setCalcedTime] = useState()

    const calcTime = (prevTime) => {
        let hour = Math.floor(prevTime  / 3600);
        let min = Math.floor((prevTime  - (hour * 3600)) / 60);
        let sec = prevTime - (hour * 3600) - (min * 60)

        if (hour < 10){hour = "0" + hour};
        if (min < 10){min = "0" + min};
        if (sec < 10){sec = "0" + sec};

        setCalcedTime(hour + " : " + min + " : " + sec)
    }

    useEffect (() => {
        let interval = null;
        let prevTime = 0
        if (starting) {
            interval = setInterval(() => {
                prevTime = prevTime + 1
                calcTime(prevTime)
            }, 1000)
        }else {
            clearInterval(interval)
            calcTime(0)
        }
        return () => clearInterval(interval)
    }, [starting])




  return(
       <View>
           <Text>
               {
                calcedTime
               }
            </Text>
        </View>
  )
};

export default Stopwatch;
