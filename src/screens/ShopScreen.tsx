import React from "react"
import {View, StyleSheet, Text} from "react-native"
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../types/Navigation"
import {ShopDetail} from "../components/ShopDetail";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Shop'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Shop'>;
type Props = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
};

export const ShopScreen: React.FC<Props> = ({navigation, route}: Props) => {
    const {shop} = route.params
    return (
        <View style={styles.container}>
            <ShopDetail shop={shop} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
})
