import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import product1 from '../../../assets/images/shop/product1.png';

const Cart = () => {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <Text style={styles.title}>My Cart</Text>

            {/* Category Toggle */}
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                    <Text style={styles.activeTabText}>Non-Fertilizers</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.inactiveTabText}>Fertilizers</Text>
                    <View style={styles.badgeInactive}><Text style={styles.badgeText}>1</Text></View>
                </TouchableOpacity>
            </View>

            {/* Warning Box */}
            <View style={styles.warningBox}>
                <Text style={styles.warningText}>
                    Please place separate orders for Fertilizers and Non-Fertilizers. Switch categories using the buttons above.
                </Text>
            </View>

            {/* Cart Items */}
            <Text style={styles.sectionTitle}>2 Items</Text>
            <View style={styles.itemCard}>
                <Image
                    source={product1}
                    style={styles.productImage}
                />
                <View style={styles.itemDetails}>
                    <Text style={styles.productName}>Gromor nutri drip 12-61-0</Text>
                    <Text style={styles.productWeight}>25 kg</Text>
                    <View style={styles.quantityRow}>
                        <TouchableOpacity style={styles.qtyButton}><Text style={styles.qtyText}>-</Text></TouchableOpacity>
                        <Text style={styles.qtyNumber}>2</Text>
                        <TouchableOpacity style={styles.qtyButton}><Text style={styles.qtyText}>+</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.priceSection}>
                    <TouchableOpacity><Text style={styles.deleteIcon}>🗑️</Text></TouchableOpacity>
                    <Text style={styles.price}>₹249</Text>
                </View>
            </View>

            <View style={styles.itemCard}>
                <Image
                    source={product1}
                    style={styles.productImage}
                />
                <View style={styles.itemDetails}>
                    <Text style={styles.productName}>Magwin magnesium sulphate</Text>
                    <Text style={styles.productWeight}>50 kg</Text>
                    <View style={styles.quantityRow}>
                        <TouchableOpacity style={styles.qtyButton}><Text style={styles.qtyText}>-</Text></TouchableOpacity>
                        <Text style={styles.qtyNumber}>1</Text>
                        <TouchableOpacity style={styles.qtyButton}><Text style={styles.qtyText}>+</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.priceSection}>
                    <TouchableOpacity><Text style={styles.deleteIcon}>🗑️</Text></TouchableOpacity>
                    <Text style={styles.price}>₹499</Text>
                </View>
            </View>

            {/* Billing Address */}
            <Text style={styles.sectionTitle}>Billing Address</Text>
            <View style={styles.addressBox}>
                <Text style={styles.addressText}>Siddharth Chhajer</Text>
            </View>

            {/* Footer Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.codButton}>
                    <Text style={styles.codText}>Cash on Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payText}>Pay ₹947</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Cart;
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginBottom: 12,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        flex: 1,
        justifyContent: 'center',
    },
    activeTab: {
        backgroundColor: '#E9F8F0',
        borderRadius: 10,
    },
    badge: {
        backgroundColor: '#0A8F43',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },
    badgeInactive: {
        backgroundColor: '#ccc',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    activeTabText: {
        color: '#0A8F43',
        fontWeight: 'bold',
    },
    inactiveTabText: {
        color: '#555',
    },
    warningBox: {
        backgroundColor: '#FFF4CC',
        borderRadius: 6,
        padding: 10,
        marginBottom: 16,
    },
    warningText: {
        fontSize: 12,
        color: '#000',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 8,
    },
    itemCard: {
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    productImage: {
        width: 50,
        height: 70,
        resizeMode: 'contain',
    },
    itemDetails: {
        flex: 1,
        marginHorizontal: 12,
    },
    productName: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000',
    },
    productWeight: {
        fontSize: 12,
        color: '#555',
        marginBottom: 6,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyButton: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0A8F43',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qtyText: {
        color: '#0A8F43',
        fontSize: 14,
    },
    qtyNumber: {
        marginHorizontal: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    priceSection: {
        alignItems: 'flex-end',
    },
    deleteIcon: {
        fontSize: 16,
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    addressBox: {
        backgroundColor: '#F5F5F5',
        padding: 12,
        borderRadius: 6,
        marginBottom: 16,
    },
    addressText: {
        fontSize: 13,
        color: '#000',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    codButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#FF6F00',
        padding: 12,
        borderRadius: 6,
        marginRight: 8,
        alignItems: 'center',
    },
    codText: {
        color: '#FF6F00',
        fontWeight: 'bold',
    },
    payButton: {
        flex: 1,
        backgroundColor: '#0A8F43',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    payText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
