import React, {useEffect,useContext} from "react"
import {SafeAreaView, StyleSheet, ActivityIndicator, Text} from "react-native"
import {signin} from "../lib/firebase"
import {User} from "../types/User"
import {UserContext} from "../contexts/UserContext"

type Props = {

}

export const AuthScreen: React.FC<Props> = ({}: Props) => {
    const {setUser} = useContext(UserContext)
    useEffect(() => {
        const fetchUser = async () => {
            const user: User = await signin()
            setUser(user)
        }
        fetchUser()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator />
            <Text style={styles.text}>Loading</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        marginTop: 10
    }
})
