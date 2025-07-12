import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProductSlider from './ProductSlider'; // Update the path as needed

const FarmersAlsoBought = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Farmers Also Bought</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>

            {/* Slider to render products */}
            <ProductSlider />
        </View>
    );
};

export default FarmersAlsoBought;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        paddingVertical: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    viewAll: {
        fontSize: 12,
        color: '#1E8153',
        fontWeight: '500',
    },
});
