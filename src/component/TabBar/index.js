import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { horizontalScale, moderateScale, verticalScale } from '../../utils/Metrics';

function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
           key={index} accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1,height:horizontalScale(60),justifyContent:'center',alignItems:'center' }}
          >
            <Image style={{height:24,width:24,tintColor :isFocused ? '#673ab7' : '#222' }} source={{uri: getImage(index)}}/>
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;

const getImage =(index)=>{
  switch(index){
    case 0 : return "https://cdn-icons-png.flaticon.com/512/25/25694.png"
    case 1 : return "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
    default:     return  "https://cdn-icons-png.flaticon.com/512/1077/1077049.png"
 
  }
}