import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { moderateScale } from '../../utils/Metrics';
import ColorConstant from '../../utils/ColorConstant';

const SplashScreen = ({ navigation }) => {

    React.useEffect(() => {
        setTimeout(() => {
            navigation.navigate('HomeScreen')
        }, 2000)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: moderateScale(18), color: ColorConstant.BLACK }}>SplashScreen</Text>
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    }
})