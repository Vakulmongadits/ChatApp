import { StyleSheet, } from 'react-native';
import ColorConstant from '../../utils/ColorConstant';
import { horizontalScale, moderateScale } from '../../utils/Metrics';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageUser: {
        height: horizontalScale(120),
        width: horizontalScale(120),
        borderRadius: horizontalScale(120),
        alignSelf: 'center',
        marginTop: horizontalScale(40),
        borderWidth: 1, borderColor: 'grey'
    },
    textName: {
        fontSize: moderateScale(18),
        color: ColorConstant.BLACK,
        alignSelf: 'center',
        marginTop: 5
    },
    textEmail: {
        fontSize: moderateScale(18),
        color: ColorConstant.BLACK,
        alignSelf: 'center',
        marginTop: 10
    },
})

export default styles;