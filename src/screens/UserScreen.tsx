import React, {useState, useContext} from "react"
import {SafeAreaView, StyleSheet} from "react-native"
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../types/Navigation"
import {Form} from "../components/Form"
import {Button} from "../components/Button"
import {UserContext} from "../contexts/UserContext"
import {updateUser} from "../lib/firebase"
import firebase from "firebase"
import {User} from "../types/User"
import {Loading} from "../components/Loading"

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'User'>;
type Props = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
};

export const UserScreen: React.FC<Props> = ({}: Props) => {
    const {user, setUser} = useContext(UserContext)
    const [name, setName] = useState<string>(user?.name)
    const [loading, setLoading] = useState<boolean>(false)
    const onSubmit = async (name: string) => {
        setLoading(true)
        const updatedAt = firebase.firestore.Timestamp.now()
        await updateUser(user?.id!, {name, updatedAt})
        setUser({...user, name, updatedAt} as User)
        setLoading(false)
    }
    return (
        <SafeAreaView style={styles.container}>
            <Form label={"名前"} value={name} onChangeText={(text) => {setName(text)}} />
            <Button onPress={() => {onSubmit(name)}} text={"保存"} />
            <Loading visible={loading} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
