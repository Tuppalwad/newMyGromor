import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../utils/theam';
import allProduct from '../../assets/images/shop/all.png'
const ServiceCard = ({ title, icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Image source={allProduct} style={styles.icon} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ServiceCard;

const styles = StyleSheet.create({
    card: {
        width: 120,
        alignItems: 'center',
        marginVertical: 12,
        marginHorizontal: 8,
    },
    iconContainer: {
        width: 109,
        height: 108,
        borderRadius: 4,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 8,
        paddingTop: 4,
        paddingBottom: 10,
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 13,
        color: '#333',
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 4,
    },
});
