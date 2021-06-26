import React from "react"
import {MainTabNavigator} from "../navigations/MainTabNavigator"
import {AuthScreen} from "../screens/AuthScreen"

export const AppNavigator = () => {
    const user = null;
    if (user) {
        return <MainTabNavigator />
    } else {
        return <AuthScreen />
    }
}

