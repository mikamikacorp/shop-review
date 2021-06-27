import React,{useState} from 'react';
import {AppNavigator} from './src/navigations/AppNavigator';
import {NavigationContainer} from "@react-navigation/native"
import {UserContext} from "./src/contexts/UserContext"
import {User} from "./src/types/User"

export default function App() {
   const [user,setUser] = useState<User>();
    return (
        <NavigationContainer>
            <UserContext.Provider value={{user,setUser}}>
                <AppNavigator />
            </UserContext.Provider>
        </NavigationContainer>
    );
}
