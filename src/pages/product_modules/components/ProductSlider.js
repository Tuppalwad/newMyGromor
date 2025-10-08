import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import product1 from '../../../assets/images/shop/product1.png'
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import { capitalizeAll } from '../../../utils/utils';


export default function ProductSlider({ data, onPressProductItem }) {

    const productCategoryData = useSelector(
        state => state.product.productCategory,
    );

    const newData = (data || [])?.map((item) => {
        return {
            id: item.id,
            productName: item.nameToShowOnSite,
            productType: productCategoryData?.filter((id) => id.id == 5)[0]?.code,
            cropType: "Good for All Crops",
            weightOptions: ['25 kg', '50 kg'],
            price: item.sellingPrice,
            originalPrice: item.mrp,
            badge: 'NEW',
            productImage: item.side1, // replace with your image
        }
    })

    const renderProduct = ({ item }) => <ProductCard {...item} />;

    return (
        <View style={{ marginVertical: 16 }}>
            <FlatList
                data={newData || []}
                keyExtractor={(item) => item.id}
                renderItem={renderProduct}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </View>
    );
}


