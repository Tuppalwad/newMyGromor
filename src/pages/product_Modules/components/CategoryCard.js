import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function CategoryCard({ title, icon }) {
    return (
        <TouchableOpacity style={styles.card}>
            <Image source={icon} style={styles.icon} />
            <Text style={styles.title}>{title}</Text>
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
