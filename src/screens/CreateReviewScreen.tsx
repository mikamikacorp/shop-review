import React, {useEffect, useState, useContext} from "react"
import {View, StyleSheet, Image, Alert} from "react-native"
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../types/Navigation"
import {CloseButton} from "../components/CloseButton"
import {Textarea} from "../components/Textarea"
import {StarInput} from "../components/StarInput"
import {Button} from "../components/Button"
import {createReviewRef, uploadImage} from "../lib/firebase"
import {Review, UserRef, ShopRef} from "../types/Review"
import {UserContext} from "../contexts/UserContext"
import {CameraButton} from "../components/CameraButton"
import {pickImage} from "../lib/imagePicker"
import {getExtension} from "../utils/file"
import {Loading} from "../components/Loading"
import {ReviewsContext} from "../contexts/ReviewsContext"
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
    const [imageUri, setImageUri] = useState<string>("")
    const {user} = useContext(UserContext)
    const {reviews,setReviews} = useContext(ReviewsContext)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        navigation.setOptions({
            title: shop.name,
            headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />
        })
    }, [shop])
    const onSubmit = async () => {

        if (!text || !imageUri) {
            Alert.alert("レビューまたは画像がありません")
            return
        }

        setLoading(true)

        const reviewRef = await createReviewRef(shop.id!)

        const ext = getExtension(imageUri)
        const storagePath = `reviews/${reviewRef.id}.${ext}`

        const downloadUrl = await uploadImage(imageUri, storagePath)

        const user_ref: UserRef = {
            id: user?.id!,
            name: user?.name!
        }
        const shop_ref: ShopRef = {
            id: shop.id!,
            name: shop.name
        }
        const review: Review = {
            id : reviewRef.id,
            user: user_ref,
            shop: shop_ref,
            text,
            score,
            imageUrl: downloadUrl,
            updatedAt: firebase.firestore.Timestamp.now(),
            createdAt: firebase.firestore.Timestamp.now()
        } as Review
        await reviewRef.set(review)
        setReviews([review,...reviews])
        setLoading(false)
        navigation.goBack()
    }
    const onPickImage = async () => {
        const uri = await pickImage()
        if (uri) {
            setImageUri(uri)
        }
    }
    return (
        <View style={styles.container}>
            <StarInput score={score} onChangeScore={(value) => {setScore(value)}} starSize={30} />
            <Textarea value={text} onChangeText={(value) => {setText(value)}} label={"レビュー"} placeholder={"レビューを書いてください"} />
            <Button text={"レビューを投稿する"} onPress={onSubmit} />
            <CameraButton onPress={onPickImage} />
            {!!imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
            <Loading visible={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    camera: {
        marginLeft: 10
    },
    image: {
        height: 100,
        width: 100,
        margin: 8
    }
})
