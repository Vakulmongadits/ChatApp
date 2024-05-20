import {   StyleSheet, } from 'react-native';
import { horizontalScale, moderateScale } from '../../utils/Metrics';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: '#efefef',
        marginStart: horizontalScale(16),
        marginEnd: horizontalScale(16),
        height: horizontalScale(60),
        borderBottomWidth: .5,
    },
    swipedRow: {
        flexDirection: 'row',

        alignItems: 'center',
        backgroundColor: 'red',
        marginStart: horizontalScale(16),
        marginEnd: horizontalScale(16),
        height: horizontalScale(60),
        width: horizontalScale(60),
    },
    swipedConfirmationContainer: {
        flex: 1,
    },
    deleteConfirmationText: {
        color: '#fcfcfc',
        fontWeight: 'bold',
    },
    deleteButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '100%',
        width: moderateScale(60),
    },
    deleteButtonText: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        padding: 3,

    },
});

export default styles;