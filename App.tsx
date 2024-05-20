import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from './src/component/TabBar';
import ProfileScreen from './src/screens/ProfileScreen';
import ChatScreen from './src/screens/ChatScreen';
import ConvoScreen from './src/screens/ConvoScreen';
import PLPScreen from './src/screens/PLPScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import 'react-native-devsettings';

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Chat" component={ConvoScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="HomeScreen" component={MyTabs} />
         
          <Tab.Screen name="ChatScreen" component={ChatScreen} />
          <Tab.Screen name="PLPScreen" component={PLPScreen} />
  
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;