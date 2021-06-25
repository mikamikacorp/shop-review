import React from "react"
import {StyleSheet, GestureResponderEvent,TouchableOpacity} from "react-native"
import {Feather} from "@expo/vector-icons"

type Props = {
    onPress : (event : GestureResponderEvent) => void;
    color? : string;
}

export const CloseButton : React.FC<Props> = ({onPress,color = "#000"} : Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Feather name="x" color={color} size={32} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        margin: 8
    }
})
