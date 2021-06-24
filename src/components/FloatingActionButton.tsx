import React from "react"
import {StyleSheet, GestureResponderEvent, TouchableOpacity} from "react-native"
import {FontAwesome} from "@expo/vector-icons"

const SIZE: number = 50

type Props = {
    onPress: (event: GestureResponderEvent) => void
}
export const FloatingActionButton: React.FC<Props> = ({onPress}: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <FontAwesome name="plus" color="#fff" size={30} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: "#900",
    position: "absolute",
    right: 16,
    bottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
