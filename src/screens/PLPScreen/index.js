import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import Header from '../../component/Header';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { moderateScale } from '../../utils/Metrics';

const PLPScreen = ({navigation}) => {
    const [data,setData] = React.useState([
        {
            key:1,
            name: 'Product 1'
        },
        {
            key:2, 
            name: 'Product 2'
        }, {
            key:3,  
            name: 'Product 3'
        }, {
            key:4,   
            name: 'Product 4'
        }, {
            key:5,    
            name: 'Product 5'
        }, {
            key:6,    
            name: 'Product 6'
        }, {
            key:7,    
            name: 'Product 6'
        },
    ])
    return (
        <View style={{ flex: 1, }}>

            <Header title={'PLP Screen'} showLeftIcon tapOnLeft={()=> navigation.goBack()}/>
            <GestureHandlerRootView style={{ flex: 1, }}>
                <DraggableFlatList data={data}
                    onDragBegin={() => console.log(' dragging...')}
                    onDragEnd={({ data }) => setData(data)}
                    keyExtractor={(item) => item.key}
                    renderItem={renderItem} />
            </GestureHandlerRootView>
        </View>
    )
}

export default PLPScreen;

const renderItem = ({ item, index, drag}) => {
    return (
        <TouchableOpacity style={{height:moderateScale(60),justifyContent:'center',alignItems:'center',backgroundColor:'red'}}  onLongPress={drag}>
            <Text style={{color:'white'}} >{item.name}</Text>
        </TouchableOpacity>
    )
}