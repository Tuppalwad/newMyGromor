import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ServiceCard = ({ title, icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Image source={icon} style={styles.icon} resizeMode='contain' />
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ServiceCard;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 5, // 10px gap overall (5 on each side)
    },
    iconContainer: {
        width: '100%',
        height: 'auto',
        aspectRatio: 0.9, // Keeps card shape consistent
        borderRadius: 4,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 10,
    },
    icon: {
        width: 60,
        height: 90,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 13,
        color: '#333',
        textAlign: 'center',
        fontWeight: '500',
        // marginTop: 4,
    },
});
