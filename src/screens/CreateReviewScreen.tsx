import React, {useEffect} from "react"
import {View, StyleSheet, Text} from "react-native"
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../types/Navigation"
import {CloseButton} from "../components/CloseButton"

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateReview'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'CreateReview'>;
type Props = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
};

export const CreateReviewScreen: React.FC<Props> = ({route, navigation}: Props) => {
    const {shop} = route.params
    useEffect(() => {
        navigation.setOptions({
            title: shop.name, 
            headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />
        })
    }, [shop])
    return (
        <View style={styles.container}>
            <Text>CreateReviewScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
