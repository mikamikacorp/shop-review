import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, FlatList} from 'react-native';
import {Shop} from "./src/types/Shop"

import {getShops} from "./src/lib/firebase"
import {ShopReviewItem} from './src/components/ShopReviewItem';

export default function App() {
    const [shops, setShops] = useState<Shop[]>([])
    useEffect(() => {
        getFirebaseItems()
    }, []);
    const getFirebaseItems = async () => {
        const shops = await getShops();
        setShops(shops)
    }
    const renderItem = ({item} : {item:Shop}) => (
        <ShopReviewItem shop={item} />
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
