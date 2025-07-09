import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import CustomHeader from '../../component/common/CustomHeader';
import CustomButton from '../../component/common/CustomButton';
import product1 from '../../assets/images/shop/product1.png';
import specification from '../../assets/images/shop/specification.png';
import downArrow from '../../assets/images/shop/downArrow.png'

export default function ProductDetail() {
    const [quantity, setQuantity] = useState(300);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);


    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <CustomHeader
                title="Magwin magnesium s..."
                subtitle="Store Code: S0584 | Mana Gromor Centre Akola"
                type="shop"
                onBackPress={() => console.log('Back pressed')}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>NEW</Text>
                    </View>
                    <Image source={product1} style={styles.productImage} />
                    <View style={styles.carouselDots}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>

                {/* Product Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.type}>FERTILIZER</Text>
                    <Text style={styles.productName}>Magwin magnesium sulphate</Text>
                    <Text style={styles.cropTypeBadge}>Good for All Crops</Text>


                    {/* Price & Quantity */}
                    <View style={styles.rowBetween}>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>₹3618</Text>
                            <Text style={styles.originalPrice}>₹3999</Text>
                        </View>

                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={handleDecrement} style={styles.qtyCircleButton}>
                                <Text style={styles.qtyText}>−</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.qtyInput}
                                value={quantity.toString()}
                                keyboardType="numeric"
                                onChangeText={(val) => setQuantity(parseInt(val) || 1)}
                            />
                            <TouchableOpacity onPress={handleIncrement} style={styles.qtyCircleButton}>
                                <Text style={styles.qtyText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                {/* Sizes */}
                <View style={styles.sizesContainer}>
                    <Text style={styles.sizesTitle}>Sizes</Text>
                    <View style={styles.divider} />
                </View>

                {/* Specifications */}
                <View style={styles.specificationsContainer}>
                    <View >
                        <Image source={specification} style={styles.specificationImg} />
                    </View>
                    <View style={{ flexDirection: "column", marginLeft: 20 }}>
                        <View style={styles.specificationHeader}>
                            <Text style={styles.specificationHeaderText}>Specifications</Text>
                        </View>
                        <View>
                            <Text style={styles.specificationContent}>
                                High quality magnesium sulphate, Ready-to-use product to correct magnesium deficiency.
                            </Text>
                        </View>
                    </View>

                </View>

                {/* Description - Collapsible */}
                <View>
                    <TouchableOpacity
                        style={styles.descriptionContainer}
                        onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    >
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <Image source={downArrow} />
                    </TouchableOpacity>
                    {isDescriptionExpanded && (
                        <View style={styles.expandedDescriptionContent}>
                            <Text style={styles.descriptionText}>
                                Detailed description of the magnesium sulphate product goes here...
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                {/* <CustomButton
                    title="Buy Now"
                    buttonStyle={[styles.footerButton, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#0A8F43' }]}
                    textStyle={[styles.footerButtonText, { color: '#000' }]}
                /> */}
                <TouchableOpacity
                    style={[styles.footerButton, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#0A8F43' }]}
                    onPress={() => console.log('Buy Now pressed')}
                >
                    <Text style={[styles.footerButtonText, { color: '#0A8F43' }]}>Buy Now</Text>
                </TouchableOpacity>

                <CustomButton
                    title="Add to Cart"
                    buttonStyle={[styles.footerButton, { backgroundColor: '#0A8F43' }]}
                    textStyle={[styles.footerButtonText, { color: '#fff' }]}
                />
                {/* <TouchableOpacity
                    style={[styles.footerButton, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#0A8F43' }]}
                    onPress={() => console.log('Buy Now pressed')}
                >
                    <Text style={[styles.footerButtonText, { color: '#0A8F43' }]}>Add to Cart</Text>
                </TouchableOpacity> */}

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 12,
    },
    badgeContainer: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#FFD700',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        zIndex: 1,
    },
    badgeText: {
        fontSize: 10,
        color: '#000',
    },
    productImage: {
        width: 160,
        height: 200,
        resizeMode: 'contain',
    },
    carouselDots: {
        flexDirection: 'row',
        marginTop: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#0A8F43',
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 8,
    },
    type: {
        fontSize: 12,
        color: '#888',
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#000',
    },
    cropTypeBadge: {
        fontSize: 12,
        color: '#1E8153',
        backgroundColor: '#E6F4EC',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 12,
        lineHeight: 15
    },
    originalPrice: {
        fontSize: 14,
        color: '#E53935',
        textDecorationLine: 'line-through',
        lineHeight: 10
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyCircleButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#0A8F43',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    qtyText: {
        fontSize: 18,
        color: '#0A8F43',
        fontWeight: '600',
        lineHeight: 10

    },
    qtyInput: {
        width: 60,
        height: 32,
        borderWidth: 1,
        borderColor: '#0A8F43',
        borderRadius: 6,
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        marginHorizontal: 4,
        lineHeight: 10

    },

    sizesContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 8,
        flexDirection: 'row'
    },
    sizesTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginTop: 4,
    },
    specificationsContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FFF9E6',
        padding: 16,
        marginTop: 8,
        borderRadius: 4,
    },
    specificationImg: {
        width: 50,
        height: 50,
    },
    specificationHeader: {
        backgroundColor: '#F57C00',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 8,

    },
    specificationHeaderText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    specificationContent: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    descriptionContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    descriptionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    chevronIcon: {
        fontSize: 14,
        color: '#666',
    },
    expandedDescriptionContent: {
        backgroundColor: '#fff',
        padding: 16,
        paddingTop: 0,
    },
    descriptionText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    footerButton: {
        flex: 1,
        marginHorizontal: 6,
        paddingVertical: 12,
        borderRadius: 6,
        maxWidth: '50%'
    },
    footerButtonText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});
