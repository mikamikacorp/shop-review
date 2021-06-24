import React, {useEffect} from "react"
import {View, StyleSheet} from "react-native"
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../types/Navigation"
import {ShopDetail} from "../components/ShopDetail";
import {FloatingActionButton} from "../components/FloatingActionButton"

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Shop'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Shop'>;
type Props = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
};

export const ShopScreen: React.FC<Props> = ({navigation, route}: Props) => {
    const {shop} = route.params
    useEffect(() => {
        navigation.setOptions({title: shop.name})
    }, [shop])
    return (
        <View style={styles.container}>
            <ShopDetail shop={shop} />
            <FloatingActionButton onPress={() => navigation.navigate("CreateReview",{shop})} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex :1,
        backgroundColor: "#fff",
        justifyContent: "flex-start"
    }
})
