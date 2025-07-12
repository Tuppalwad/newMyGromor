import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../components/common/CustomButton";

const ProductCard = ({
    productImage,
    productName,
    productType,
    cropType,
    weightOptions,
    price,
    originalPrice,
    badge,
}) => {
    const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigation = useNavigation();
    return (
        <View style={styles.card}>
            <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{badge}</Text>
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

            <View style={styles.addButton}>
                <CustomButton title={"Add to Cart"} onPress={() => navigation.navigate('ProductDetail')} />
            </View>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        width: 180,
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
        lineHeight: 10,
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
        lineHeight: 10,
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginBottom: 6,
        overflow: 'hidden',
    },
    dropdownButton: {
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
        lineHeight: 10,
    },
    originalPrice: {
        fontSize: 12,
        color: '#888',
        textDecorationLine: 'line-through',
        lineHeight: 10,
    },
    addButton: {
        borderRadius: 6,
        alignItems: 'center',
    },
});
