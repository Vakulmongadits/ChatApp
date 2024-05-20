import React from 'react';
import { Text, Touchable, TouchableOpacity, View, } from 'react-native';
import ColorConstant from '../../utils/ColorConstant';
import { moderateScale } from '../../utils/Metrics';

const ItemChat = ({ item, index,onLongPress}) => {
    console.log('item ItemChat --> ',JSON.stringify(item))
    return (
        <TouchableOpacity key={index} style={{ backgroundColor: 'grey', padding: 10,marginTop:10, borderRadius: 10, alignSelf: item.botId ? 'flex-start' : 'flex-end' }}
        onLongPress={onLongPress}>
            <Text style={{ color: ColorConstant.WHITE, fontSize: moderateScale(22), }}>{item?.message}</Text>
        </TouchableOpacity>
    )
}

export default ItemChat;