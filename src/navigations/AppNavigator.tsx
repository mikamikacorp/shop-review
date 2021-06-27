import React,{useContext} from "react"
import {MainTabNavigator} from "../navigations/MainTabNavigator"
import {AuthScreen} from "../screens/AuthScreen"
import {UserContext} from "../contexts/UserContext"

export const AppNavigator = () => {
    const {user} = useContext(UserContext)
    if (user) {
        return <MainTabNavigator />
    } else {
        return <AuthScreen />
    }
}

