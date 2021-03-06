import React from "react"
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from "react-native"
import {Shop} from "../types/Shop"
import {Stars} from "./Stars"

const {width} = Dimensions.get("window")
const CONTAINER_WIDTH = width / 2
const PADDING = 8
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2

type Props = {
    shop: Shop;
    onPress: () => void;
}
export const ShopReviewItem: React.FC<Props> = ({shop, onPress}: Props) => {
    const {name, place, imageUrl, score} = shop
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.image} source={{uri: imageUrl}} />
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.placeText}>{place}</Text>
            <Stars score={score} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: CONTAINER_WIDTH,
        padding: PADDING
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_WIDTH * 0.7
    },
    nameText: {
        fontSize: 16,
        color: "#000",
        marginTop: 8,
        fontWeight: "bold"
    },
    placeText: {
        fontSize: 12,
        color: "#888",
        marginTop: 8,
        marginBottom: 8
    },
})
