import React from "react"
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from "../screens/HomeScreen"
import {ShopScreen} from "../screens/ShopScreen"
import {CreateReviewScreen} from "../screens/CreateReviewScreen"
import {RootStackParamList} from "../types/Navigation";

const RootStack = createStackNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerTintColor: "#000"}} initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="Shop" component={ShopScreen} />
        </Stack.Navigator>
    )
}

export const RootStackNavigator = () => {
    return (
        <RootStack.Navigator mode="modal" initialRouteName="Main">
            <RootStack.Screen name="Main" component={MainStack} options={{headerShown:false}} />
            <RootStack.Screen name="CreateReview" component={CreateReviewScreen} />
        </RootStack.Navigator>
    )
}
