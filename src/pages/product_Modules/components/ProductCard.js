import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../components/common/CustomButton";
import { defConfigImageURL } from "../../dashboard_Modules/tabs/home/index.service";
import { useSelector } from "react-redux";
import HartIcon from '../../../assets/drawer/favourite.png'
import LikeIcon from '../../../assets/images/common/LikeIcon.png'

const ProductCard = ({ item, onPressProductItem, index, onPressFavourite, type, onPressDeleteFav }) => {
    const weightOptions = ['30 Kg', '50 Kg', '100 Kg']
    const [selectedWeight, setSelectedWeight] = useState(item?.size);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigation = useNavigation();
    const BannerData = useSelector(state => state.product.bannerData);
    const productCategoryData = useSelector(
        state => state.product.productCategory,
    );

    const productType = productCategoryData?.filter((id) => id.id == item?.categoryId)[0]?.code;

    return (
        <View style={styles.card}>
            <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{item?.brand}</Text>
                <TouchableOpacity
                    onPress={() => { item?.isFavouriteProduct ? onPressDeleteFav(item, index, type) : onPressFavourite(item, index, type) }}
                >
                    {item?.isFavouriteProduct ? <Image
                        source={HartIcon}
                        style={{
                            width: 15, height: 15,
                            tintColor: 'green'
                        }}
                        resizeMode="contain"
                    /> :
                        <Image
                            source={LikeIcon}
                            style={{
                                width: 15, height: 15,
                                tintColor: 'green'
                            }}
                            resizeMode="contain"
                        />}

                </TouchableOpacity>
            </View>

            <Image source={{ uri: defConfigImageURL(BannerData.imageBaseURL, item?.side1) }} style={styles.productImage} resizeMode={'contain'} />

            <Text style={styles.type}>{productType}</Text>
            <Text style={styles.cropType}>{item?.cropType}</Text>
            <Text style={styles.productName}>{item?.productName}</Text>

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
                <Text style={styles.price}>₹{item?.sellingPrice}</Text>
                <Text style={styles.originalPrice}>₹{item?.mrp}</Text>
            </View>

            <View style={styles.addButton}>
                <CustomButton title={"Add to Cart"} onPress={() => onPressProductItem(item)} />
            </View>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        width: 200,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eee',
        padding: 9,
        marginRight: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 10
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
        borderTopRightRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    heart: {
        fontSize: 14,
        color: '#888',
        lineHeight: 10,
    },
    productImage: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    type: {
        fontSize: 10,
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    cropType: {
        fontSize: 10,
        color: '#1E8153',
        marginBottom: 8,
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
        marginTop: 6
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
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        lineHeight: 20,
    },
    originalPrice: {
        fontSize: 12,
        color: '#f52f2f',
        textDecorationLine: 'line-through',
        lineHeight: 10,
    },
    addButton: {
        borderRadius: 6,
        alignItems: 'center',
    },
});
