import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { defConfigImageURL } from '../../dashboard_modules/tabs/home/index.service';
import { useSelector } from 'react-redux';
import { capitalizeAll } from '../../../utils/utils';

export default function CategoryCard({ item, onPressCategory }) {

    const BannerData = useSelector((state) => state.product.bannerData);

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPressCategory(item)}>
            {/* <Image source={icon} style={styles.icon} /> */}
            <Image source={{ uri: defConfigImageURL(BannerData.imageBaseURL, item.imageKey) }} style={styles.icon} resizeMode={'contain'} />
            <Text style={styles.title}>{capitalizeAll(item.code)}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        width: '30%',
        aspectRatio: .9,
    },
    icon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    title: {
        fontSize: 14,
        color: '#333',
        fontWeight: 400,
        textAlign: 'center',
    },
});
