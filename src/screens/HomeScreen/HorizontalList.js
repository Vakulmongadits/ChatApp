import React from 'react';
import { View, FlatList, Text, Image, } from 'react-native';
import { horizontalScale, moderateScale } from '../../utils/Metrics';
import ColorConstant from '../../utils/ColorConstant';

export default HorizontalList = ({ title, data,onPressViewAll }) => {
 return (
        <>
            <View style={{ flexDirection: 'row', marginTop: moderateScale(10) }}>
                <Text style={{ flex: 1, marginStart: moderateScale(16), fontSize: moderateScale(22) }}>{title}</Text>
                <Text style={{ marginEnd: 16, fontSize: moderateScale(22) }}
                onPress={()=> onPressViewAll ()}>View All</Text>
            </View>

           {data?.length > 0 && <FlatList horizontal
                data={data}
                extraData={data}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item, index }) => <ItemHome item={item} index={index} />}
                showsHorizontalScrollIndicator={false} />}
        </>
    )  

}

const ItemHome = ({ item, index }) => {
    return (
        <View key={index}>
            <Image style={{
                height: horizontalScale(120),
                width: horizontalScale(120),
                borderRadius: moderateScale(20), margin: moderateScale(10)
            }}
                resizeMode='stretch'
                source={{ uri: item.thumbnail }} />

            <Text style={{ position: 'absolute', bottom: moderateScale(20), alignSelf: 'center',color:ColorConstant.WHITE,fontSize:moderateScale(18) }}>{item.title}</Text>
        </View>
    )
}