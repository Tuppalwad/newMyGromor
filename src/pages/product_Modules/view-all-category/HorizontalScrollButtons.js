import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';


const HorizontalScrollButtons = ({ categorySelected, handleSubCategory, getProduct, setActiveSubTab, fetchDataonSubcategory }) => {
    const [selected, setSelected] = useState('All');
    const farmerAddress = useSelector((state) => state.farmer.farmerAddressArray);
    const productCategoryData = useSelector(state => state.product.productCategory);

    const categories = categorySelected?.subCategories

    return categories.length > 0 && <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
    >
        <TouchableOpacity
            style={[styles.button, { borderColor: selected === "All" ? '#2ecc71' : "#acdabdff" }, selected === 'All' && styles.selectedButton]}
            onPress={() => { setSelected('All'), fetchDataonSubcategory(categorySelected) }}
        >
            <Text style={[styles.buttonText, selected === 'All' && styles.selectedText]}>All</Text>
        </TouchableOpacity>

        {(categories || [])?.map((item) => (
            <TouchableOpacity
                key={item.id}
                style={[styles.button, { borderColor: selected === item.code ? '#2ecc71' : "#A3D2B5" }, selected === item.code && styles.selectedButton]}
                onPress={() => { setSelected(item.code), fetchDataonSubcategory(item) }}
            >
                <Text style={[styles.buttonText, selected === item.code && styles.selectedText]}>
                    {item.code}
                </Text>
            </TouchableOpacity>
        ))}

    </ScrollView>

};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    button: {
        borderWidth: 1,

        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
        backgroundColor: 'white',
    },
    selectedButton: {
        backgroundColor: '#d5f5e3',
    },
    buttonText: {
        color: '#000',
        fontWeight: '500',
    },
    selectedText: {
        fontWeight: 'bold',
        color: '#000',
    },
});

export default HorizontalScrollButtons;
