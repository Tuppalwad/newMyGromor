import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import parcelIcon from '../../../../assets/images/common/parcel.png'; // Assuming you have a parcel icon
import product1 from '../../../../assets/images/shop/product1.png'; // Assuming you have a product image
export default function PurchaseDetail() {
    return (
        <ScrollView style={styles.container}>
            {/* Order Summary Header */}
            <View style={styles.cardCentered}>
                <Image source={parcelIcon} style={styles.parcelIcon} />
                <Text style={styles.orderLabel}>Order No.</Text>
                <Text style={styles.orderId}>PP250506844158</Text>
                <View style={styles.statusChip}>
                    <Text style={styles.statusText}>In-progress</Text>
                </View>
            </View>

            {/* Order Details */}
            <Text style={styles.sectionTitle}>Order Details</Text>
            <View style={styles.detailCard}>
                <DetailRow label="Order Date" value="06-05-2025" />
                <DetailRow label="Store Code" value="S0393" hasBorder />
                <DetailRow label="Order Type" value="Paid Online" />
                <DetailRow label="Sub Total" value="₹2,990" />
                <DetailRow label="Delivery Charges" value="₹50" />
                <DetailRow label="Total Amount" value="₹3,049" isBold />
            </View>

            {/* Item Details */}
            <Text style={styles.sectionTitle}>Item Details</Text>
            <Text style={styles.itemCount}>Total Quantity <Text style={styles.boldText}>2 Items</Text></Text>
            <View style={styles.itemCard}>
                <Image
                    source={product1}
                    style={styles.productImage}
                />
                <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>Gromor nutri drip 12-61-0</Text>
                    <Text style={styles.itemWeight}>25 kg</Text>
                    <Text style={styles.itemQty}>Qty. x1</Text>
                </View>
                <Text style={styles.itemPrice}>₹249</Text>
            </View>
        </ScrollView>
    );
}

// Reusable Row Component
const DetailRow = ({ label, value, isBold, hasBorder }) => (
    <View style={[styles.row, hasBorder && styles.borderBottom]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, isBold && styles.boldText]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6F8',
        paddingHorizontal: 16,
    },
    cardCentered: {
        backgroundColor: '#fff',
        marginTop: 10,
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
    },
    parcelIcon: {
        width: 36,
        height: 36,
        marginBottom: 8,
    },
    orderLabel: {
        fontSize: 14,
        color: '#777',
    },
    orderId: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    statusChip: {
        backgroundColor: '#FFF5C4',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        color: '#5E5B00',
        fontSize: 13,
        fontWeight: '500',
    },
    sectionTitle: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    detailCard: {
        backgroundColor: '#fff',
        marginTop: 8,
        padding: 12,
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    label: {
        fontSize: 14,
        color: '#444',
    },
    value: {
        fontSize: 14,
        color: '#000',
    },
    borderBottom: {
        borderBottomColor: '#C9E6C9',
        borderBottomWidth: 1,
    },
    boldText: {
        fontWeight: '600',
    },
    itemCount: {
        fontSize: 14,
        marginTop: 12,
        color: '#333',
    },
    itemCard: {
        backgroundColor: '#fff',
        marginTop: 8,
        padding: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 10,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#222',
    },
    itemWeight: {
        fontSize: 13,
        color: '#555',
        marginTop: 2,
    },
    itemQty: {
        fontSize: 13,
        color: '#555',
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
});
