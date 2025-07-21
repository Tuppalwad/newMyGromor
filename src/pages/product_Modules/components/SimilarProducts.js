import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import ProductSlider from './ProductSlider';
import ProductCard from './ProductCard';

const SimilarProducts = ({ productdata, onPressProductItem, onPressFavourite, onPressDeleteFav }) => {

    const renderProduct = ({ item, index, isSimilar }) => <ProductCard item={item} index={index} onPressProductItem={onPressProductItem} onPressFavourite={onPressFavourite} onPressDeleteFav={onPressDeleteFav} type={isSimilar} />;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Similar Products</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 16 }} >
                <View style={{ marginVertical: 16 }}>
                    <FlatList
                        data={productdata || []}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => renderProduct({ item, index, isSimilar: true })}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                    />
                </View>
            </View>
        </View>
    );
};

export default SimilarProducts;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        paddingVertical: 16,
        // marginTop: 0,
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
