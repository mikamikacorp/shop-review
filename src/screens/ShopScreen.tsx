import React from "react"
import {View , StyleSheet, Text} from "react-native"

type Props = {

}
export const ShopScreen : React.FC<Props> = ({} : Props) => {
    return (
        <View style={styles.container}>
            <Text>ShopScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : "column",
        justifyContent: "center",
        alignItems: "center"
    }
})
