import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, FlatList} from 'react-native';
import {Shop} from "../types/Shop"

import {getShops} from "../lib/firebase"
import {ShopReviewItem} from '../components/ShopReviewItem';

export const HomeScreen = ({navigation}) => {
    const [shops, setShops] = useState<Shop[]>([])
    useEffect(() => {
        getFirebaseItems()
    }, []);
    const getFirebaseItems = async () => {
        const shops = await getShops();
        setShops(shops)
    }
    const onPressShop = () => {
        navigation.navigate("Shop")
    }
    const renderItem = ({item}: {item: Shop}) => (
        <ShopReviewItem shop={item} onPress={onPressShop}/>
    );
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={shops}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
