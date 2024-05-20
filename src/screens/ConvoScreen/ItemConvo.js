import React, { useState } from 'react';
import { Animated, Text, TouchableOpacity, View, } from 'react-native';
import { moderateScale } from '../../utils/Metrics';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Menu, MenuItem, } from 'react-native-material-menu';
import styles from './styles';

let row = [];
let prevOpenedRow;

const ItemConvo = ({ item, index, onPress, tapOnRemove }) => {
    let isBOT = item.type == "BOT";
    const [visible, setVisible] = useState(false);

    function closeRow( ) {
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
            prevOpenedRow.close();
        }
        prevOpenedRow = row[index];
    }

    return <Swipeable ref={ref => row[index] = ref}
        renderRightActions={() => <RenderRightActions tapOnRemove={() => tapOnRemove()} />} enabled={!isBOT}
        onSwipeableWillOpen={() => closeRow( )}>
        <TouchableOpacity style={styles.row} onPress={() => onPress()} activeOpacity={1}>
            <Text style={{ fontSize: moderateScale(20), flex: 1, }}>{item.message}</Text>

            {!isBOT && <Menu visible={visible}
                anchor={<Text onPress={() => setVisible(true)}>...</Text>}
                onRequestClose={() => setVisible(false)}   >
                <MenuItem onPress={() => setVisible(false)}>Menu item 1</MenuItem>
                <MenuItem onPress={() => setVisible(false)}>Menu item 2</MenuItem>
            </Menu>}

        </TouchableOpacity>
    </Swipeable>
}
export default ItemConvo;

const RenderRightActions = ({ tapOnRemove }) => {
    return (
        <View style={styles.swipedRow}>
            <Animated.View style={styles.deleteButton}>
                <TouchableOpacity onPress={() => tapOnRemove()}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};
