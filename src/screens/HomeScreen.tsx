import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, FlatList} from 'react-native';
import {Shop} from "../types/Shop"
import { StackNavigationProp } from '@react-navigation/stack';

import {getShops} from "../lib/firebase"
import {ShopReviewItem} from '../components/ShopReviewItem';
import {RootStackParamList} from "../types/Navigation"

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'Home'>;
type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const HomeScreen : React.FC<Props> = ({navigation} : Props) => {
    const [shops, setShops] = useState<Shop[]>([])
    useEffect(() => {
        getFirebaseItems()
    }, []);
    const getFirebaseItems = async () => {
        const shops = await getShops();
        setShops(shops)
    }
    const onPressShop = (shop : Shop) => {
        navigation.navigate("Shop",{shop})
    }
    const renderItem = ({item}: {item: Shop}) => (
        <ShopReviewItem shop={item} onPress={() => onPressShop(item)}/>
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
