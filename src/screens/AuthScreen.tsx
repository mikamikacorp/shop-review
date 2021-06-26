import React, {useEffect} from "react"
import {SafeAreaView, StyleSheet, ActivityIndicator, Text} from "react-native"
import {signin} from "../lib/firebase"
import {User} from "../types/User"

type Props = {

}

export const AuthScreen: React.FC<Props> = ({}: Props) => {
    useEffect(() => {
        const fetchUser = async () => {
            const user: User = await signin()
            console.log(user)
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
