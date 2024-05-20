import React from 'react';
import { Dimensions, FlatList, Image, LayoutAnimation, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
const { width } = Dimensions.get('window');

const CarouselComponent = ({ data }) => {

    const [focusedIndex, setFocusedIndex] = React.useState(0);

    const onViewableItemsChanged = ({ viewableItem, changed }) => {
        console.log("viewableItem item onViewableItemsChanged -> ", viewableItem);
        console.log("changed onViewableItemsChanged -> ", changed[0].index);
        setFocusedIndex(changed[0].index)
        LayoutAnimation.linear()
    }

    return (
        <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={data}
            style={{ marginTop: 10 }}
            scrollAnimationDuration={2000}
            onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ index }) => (
                <Image style={{ flex: 1 }} resizeMode='cover' source={{ uri: data[index].thumbnail }} />
            )}
        />
    )
}

export default CarouselComponent;