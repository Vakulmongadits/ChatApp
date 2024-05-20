import React from 'react';
import { Text, } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ListItem = React.memo(
  ({ item, viewableItems, index }) => {
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter((item) => item.isViewable)
          .find((viewableItem, _index) => viewableItem.item.id === item.id)
      );

      return {
        transform: [{ translateY: 50 }, {
          scale: withTiming(isVisible ? 1 : 0.8),
        },
        ],
      };
    }, []);

    return (
      <Animated.View
        style={[
          {
            height: 80,
            width: '90%',
            backgroundColor: '#78CAD2',
            alignSelf: 'center',
            borderRadius: 15,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center'
          },
          rStyle,
        ]}>
        <Text>{index}</Text>
      </Animated.View>
    );
  }
);

export { ListItem };