import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import product1 from '../../assets/images/shop/product1.png'
import CustomButton from '../common/CustomButton';
import DownArrow from '../../assets/images/common/downArrow.png'

const newLaunchData = [
    {
        id: '1',
        productImage: product1, // replace with your image
        productName: 'Gromor nutri drip 12-61-0',
        productType: 'FERTILIZER',
        cropType: 'Good for All Crops',
        weightOptions: ['25 kg', '50 kg'],
        price: 3618,
        originalPrice: 3999,
    },
    {
        id: '2',
        productImage: product1, // replace with your image
        productName: 'Gromor nutri drip 12-61-0',
        productType: 'FERTILIZER',
        cropType: 'Good for All Crops',
        weightOptions: ['25 kg', '50 kg'],
        price: 3618,
        originalPrice: 3999,
    },
    {
        id: '3',
        productImage: product1, // replace with your image
        productName: 'Gromor nutri drip 12-61-0',
        productType: 'FERTILIZER',
        cropType: 'Good for All Crops',
        weightOptions: ['25 kg', '50 kg'],
        price: 3618,
        originalPrice: 3999,
    },
    {
        id: '4',
        productImage: product1, // replace with your image
        productName: 'Gromor nutri drip 12-61-0',
        productType: 'FERTILIZER',
        cropType: 'Good for All Crops',
        weightOptions: ['25 kg', '50 kg'],
        price: 3618,
        originalPrice: 3999,
    },
    // Add more items if needed
];

const NewLaunchCard = ({
    productImage,
    productName,
    productType,
    cropType,
    weightOptions,
    price,
    originalPrice,
}) => {
    const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <View style={styles.card}>
            <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>NEW</Text>
                <TouchableOpacity>
                    <Text style={styles.heart}>♡</Text>
                </TouchableOpacity>
            </View>

            <Image source={productImage} style={styles.productImage} />

            <Text style={styles.type}>{productType}</Text>
            <Text style={styles.cropType}>{cropType}</Text>
            <Text style={styles.productName}>{productName}</Text>

            <View style={styles.dropdownContainer}>
                <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.dropdownButton}>
                    <Text style={styles.dropdownText}>{selectedWeight}</Text>
                    <Image source={DownArrow} style={{ width: 10, height: 10 }} resizeMode='contain' />
                </TouchableOpacity>

                {showDropdown && (
                    <View style={styles.dropdown}>
                        {weightOptions.map((option, index) => (
                            <TouchableOpacity key={index} onPress={() => { setSelectedWeight(option); setShowDropdown(false); }}>
                                <Text style={styles.dropdownItem}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{price}</Text>
                <Text style={styles.originalPrice}>₹{originalPrice}</Text>
            </View>

            <TouchableOpacity style={styles.addButton}>
                <CustomButton title={"Add to Cart"} />
            </TouchableOpacity>
        </View>
    );
};

export default function ProductSlider() {
    return (
        <View style={{ marginVertical: 16 }}>
            <FlatList
                data={newLaunchData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NewLaunchCard {...item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 160,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eee',
        padding: 9,
        marginRight: 12,
        backgroundColor: '#fff',
    },
    badgeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    badgeText: {
        backgroundColor: '#FFD700',
        color: '#000',
        fontSize: 10,
        paddingHorizontal: 5,
        paddingVertical: 4,
        borderRadius: 4,
    },
    heart: {
        fontSize: 14,
        color: '#888',
        lineHeight: 10
    },
    productImage: {
        width: '100%',
        height: 80,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    type: {
        fontSize: 10,
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    cropType: {
        fontSize: 10,
        color: '#1E8153',
        marginBottom: 4,
    },
    productName: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 4,
        lineHeight: 10
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginBottom: 6,
        overflow: 'hidden',
        marginTop: 4,

    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    dropdownText: {
        fontSize: 12,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dropdownItem: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 8,
        lineHeight: 10
    },
    originalPrice: {
        fontSize: 12,
        color: '#888',
        textDecorationLine: 'line-through',
        lineHeight: 10

    },
    addButton: {
        // backgroundColor: '#1E8153',
        // paddingVertical: 4,
        borderRadius: 6,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
});
