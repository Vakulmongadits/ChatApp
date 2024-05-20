import React from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { ListItem } from './ListItem';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

const AnimatedFlatList = ({ data }) => {
    const viewableItems = useSharedValue([]);
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <FlatList data={data}
                extraData={data}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={({ viewableItems: vItems }) => {
                    let value = []
                    for (let index in vItems) {
                  value.push(vItems[index])
                    }
                    viewableItems.value = value;

                    console.log('vItems --> ', value)
                }}
                renderItem={({ item, index }) => {
                    return (
                        <ListItem item={item} index={index}
                            viewableItems={viewableItems} />
                    )
                }} />

        </GestureHandlerRootView>
    )
}

export default AnimatedFlatList;