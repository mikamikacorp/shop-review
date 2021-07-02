import React, {useEffect, useState, useContext} from "react"
import {View, StyleSheet} from "react-native"
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../types/Navigation"
import {CloseButton} from "../components/CloseButton"
import {Textarea} from "../components/Textarea"
import {StarInput} from "../components/StarInput"
import {Button} from "../components/Button"
import {addReview} from "../lib/firebase"
import {Review, UserRef, ShopRef} from "../types/Review"
import {UserContext} from "../contexts/UserContext"
import firebase from "firebase"

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateReview'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'CreateReview'>;
type Props = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
};

export const CreateReviewScreen: React.FC<Props> = ({route, navigation}: Props) => {
    const {shop} = route.params
    const [text, setText] = useState<string>("")
    const [score, setScore] = useState<number>(3)
    const {user} = useContext(UserContext)
    useEffect(() => {
        navigation.setOptions({
            title: shop.name,
            headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />
        })
    }, [shop])
    const onSubmit = async () => {
        const user_ref: UserRef = {
            id: user?.id!,
            name: user?.name!
        }
        const shop_ref: ShopRef = {
            id: shop.id!,
            name: shop.name
        }
        const review: Review = {
            user: user_ref,
            shop: shop_ref,
            text,
            score,
            updatedAt: firebase.firestore.Timestamp.now(),
            createdAt: firebase.firestore.Timestamp.now()
        } as Review
        await addReview(shop.id!, review)
    }
    return (
        <View style={styles.container}>
            <StarInput score={score} onChangeScore={(value) => {setScore(value)}} starSize={30} />
            <Textarea value={text} onChangeText={(value) => {setText(value)}} label={"レビュー"} placeholder={"レビューを書いてください"} />
            <Button text={"レビューを投稿する"} onPress={onSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    }
})
