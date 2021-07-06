import React, {useEffect, useState} from "react"
import {View, StyleSheet, FlatList} from "react-native"
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../types/Navigation"
import {ShopDetail} from "../components/ShopDetail";
import {FloatingActionButton} from "../components/FloatingActionButton"
import {getReviews} from "../lib/firebase"
import {ReviewItem} from "../components/ReviewItem"
import {Review} from "../types/Review";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Shop'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Shop'>;
type Props = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
};

export const ShopScreen: React.FC<Props> = ({navigation, route}: Props) => {
    const {shop} = route.params
    const [reviews, setReviews] = useState<Review[]>([])
    useEffect(() => {
        navigation.setOptions({title: shop.name})
        const fetchReviews = async () => {
            const reviews = await getReviews(shop.id!)
            setReviews(reviews)
        }
        fetchReviews()
    }, [shop])
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={<ShopDetail shop={shop} />}
                data={reviews}
                renderItem={({item}) => {
                    return <ReviewItem review={item} />
                }}
                keyExtractor={(item) => {
                    return item.id!
                }}
            />
            <FloatingActionButton onPress={() => navigation.navigate("CreateReview", {shop})} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start"
    }
})
