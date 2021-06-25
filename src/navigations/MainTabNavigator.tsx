import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackNavigator} from "../navigations/RootStackNavigator";
import {UserScreen} from "../screens/UserScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
    return (
        <Tab.Navigator tabBarOptions={{activeTintColor: "#900", inactiveTintColor: "#999"}}>
            <Tab.Screen name="Root" component={RootStackNavigator} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="User" component={UserScreen} options={{
                tabBarLabel: 'User',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
            }} />
        </Tab.Navigator>
    )
}
