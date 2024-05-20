import React, { StyleSheet } from 'react-native';
import { horizontalScale } from '../../utils/Metrics';
import ColorConstant from '../../utils/ColorConstant';

const styles = StyleSheet.create({
    viewTextInput: {
        height: horizontalScale(60),
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        flexDirection: 'row',
        padding: horizontalScale(16)
    },
    textInputMessage: {
        flex: 1,
    },
    touchSend: {
        backgroundColor: ColorConstant.WHITE,
        borderRadius: horizontalScale(50),
        height: horizontalScale(50),
        justifyContent: 'center',
        alignItems: 'center',
        width: horizontalScale(50)
    },
    imageSend: { height: 24, width: 24, },
})

export default styles;