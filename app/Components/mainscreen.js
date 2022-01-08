import React, {useState} from 'react'
import {  StyleSheet,Text, Button, View, Modal} from 'react-native';
import Login from './Login';

function Mainscreen() {
const [openLogin, setOpenLogin] = useState(false);
    return (
        <View>
            <Modal
                style={styles.modal}
                animationType="slide"
                visible={openLogin}
            >
                <Button
                onPress={() => setOpenLogin(false)}
                title="Lukk Modal!"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                />
                <Login />
            </Modal>
            <Text>
                Fredrik er Dårlig i dataspill
            </Text>
            <Button
                onPress={() => setOpenLogin(true)}
                title="Logg inn!"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    modal:{
        backgroundColor: `#a52a2a`,
        color: "#0000ff"
    }
})
export default Mainscreen
