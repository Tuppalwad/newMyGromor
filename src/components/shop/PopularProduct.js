import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProductSlider from './ProductSlider';  // adjust path if needed
import LinearGradient from 'react-native-linear-gradient';


const PopularProduct = () => {
    return (

        <LinearGradient
            colors={['#E3F3FF', '#FFFFFF']}  // light blue to white gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Popular Product</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                </View>

                {/* Render the ProductSlider here */}
                <ProductSlider />
            </View>
        </LinearGradient>
    );
};

export default PopularProduct;

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
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
