import React, {useEffect,useState} from "react"
import {View, StyleSheet,Text} from "react-native"
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../types/Navigation"
import {CloseButton} from "../components/CloseButton"
import {Textarea} from "../components/Textarea"
import {StarInput} from "../components/StarInput"

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateReview'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'CreateReview'>;
type Props = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
};

export const CreateReviewScreen: React.FC<Props> = ({route, navigation}: Props) => {
    const {shop} = route.params
    const [text,setText] = useState<string>("")
    const [score,setScore] = useState<number>(3)
    useEffect(() => {
        navigation.setOptions({
            title: shop.name,
            headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />
        })
    }, [shop])
    return (
        <View style={styles.container}>
            <StarInput score={score} onChangeScore={(value) => {setScore(value)}} starSize={30} />
            <Textarea value={text} onChangeText={(value) => {setText(value)} } label={"レビュー"} placeholder={"レビューを書いてください"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    }
})
