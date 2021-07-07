import React,{useState} from 'react';
import {AppNavigator} from './src/navigations/AppNavigator';
import {NavigationContainer} from "@react-navigation/native"
import {UserContext} from "./src/contexts/UserContext"
import {ReviewsContext} from "./src/contexts/ReviewsContext"
import {User} from "./src/types/User"
import {Review} from "./src/types/Review"

export default function App() {
   const [user,setUser] = useState<User>();
   const [reviews,setReviews] = useState<Review[]>([]);
    return (
        <NavigationContainer>
            <UserContext.Provider value={{user,setUser}}>
                <ReviewsContext.Provider value={{reviews,setReviews}}>
                    <AppNavigator />
                </ReviewsContext.Provider>
            </UserContext.Provider>
        </NavigationContainer>
    );
}
