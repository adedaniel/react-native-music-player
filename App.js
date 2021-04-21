import React from "react";
import PlayingScreen from "./app/screens/PlayingScreen";
import HomeScreen from "./app/screens/HomeScreen";
import AllMusicScreen from "./app/screens/AllMusicScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen
      name="Home"
      component={HomeScreen}
      // options={{
      //   animationEnabled: false,
      // }}
    />
    <RootStack.Screen
      name="All Music"
      component={AllMusicScreen}
      // options={{
      //   animationEnabled: false,
      // }}
    />
    <RootStack.Screen
      name="Playing Screen"
      component={PlayingScreen}
      // options={{
      //   animationEnabled: false,
      // }}
    />
  </RootStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}
