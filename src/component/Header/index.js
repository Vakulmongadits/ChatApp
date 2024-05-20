import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/Metrics';
let ic_back = 'https://cdn-icons-png.flaticon.com/512/3114/3114883.png';

const Header = ({ title, showLeftIcon, showRightIcon, tapOnLeft }) => {
    return (
        <View style={styles.container}>
            {showLeftIcon && <TouchableOpacity style={{ width: horizontalScale(50), height: '100%', justifyContent: 'center', paddingStart: horizontalScale(16) }}
                onPress={() => tapOnLeft()}>
                <Image style={{ height: 22, width: 22, tintColor: 'white' }} source={{ uri: ic_back }} />
            </TouchableOpacity>}

            <Text style={{ color: 'white', fontSize: moderateScale(22), flex: 1, textAlign: 'center' }}>{title}</Text>

            <View style={{ width: horizontalScale(50) }} />
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: horizontalScale(60),
        backgroundColor: '#6D597A',
        justifyContent: 'center',
        alignItems: 'center'
    }
})