import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../utils/theam';

const ServiceCard = ({ title, icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.iconContainer}>
                {/* <Image source={icon} style={styles.icon} /> */}
            </View>
            <Text style={styles.title}>{title}</Text>
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
        width: 101,
        height: 101,
        borderRadius: 50,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
});
