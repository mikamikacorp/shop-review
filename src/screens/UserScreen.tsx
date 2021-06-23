import React from "react"
import {View , StyleSheet, Text} from "react-native"
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../types/Navigation"

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'User'>;
type Props = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
};

export const UserScreen : React.FC<Props> = ({navigation,route} : Props) => {
    return (
        <View style={styles.container}>
            <Text>UserScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:"center",
        alignItems: "center"
    }
})
