import React from "react"
import {View, ActivityIndicator, StyleSheet} from "react-native"

type Props = {
    visible: boolean
}

export const Loading: React.FC<Props> = ({visible}: Props) => {
    return visible ?(
        <View style={styles.container}>
            <ActivityIndicator size={"large"} />
        </View>
    ) : null
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
});
