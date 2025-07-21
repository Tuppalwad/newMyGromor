import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import parcelIcon from '../../../../assets/images/common/parcel.png'; // Assuming you have a parcel icon
import product1 from '../../../../assets/images/shop/product1.png'; // Assuming you have a product image
import shop from '../../../../assets/images/common/shop.png';
import location from '../../../../assets/images/common/location.png';
import phone from '../../../../assets/images/common/phone.png'
import progress from '../../../../assets/images/splash/timer.png'
import CustomHeader from '../../../../components/common/CustomHeader';

export default function PurchaseDetail() {

    const steps = [
        {
            title: 'Order Placed',
            time: '3:46 PM, Wednesday, 06-05-2025',
            completed: true,
        },
        {
            title: 'Approved',
            time: '4:00 PM, Thursday, 07-05-2025',
            completed: true,
        },
        {
            title: 'Agent Assigned',
            time: '10:30 AM, Saturday, 09-05-2025',
            completed: true,
        },
        {
            title: 'Agent Pickup',
            completed: false,
        },
        {
            title: 'In Transit',
            completed: false,
        },
        {
            title: 'Delivered',
            completed: false,
        },
    ];

    return (
        <View style={{ flex: 1 }}>
            <View>

                <CustomHeader
                    type="Purchase Details"
                    topTitle="Purchase Details"
                    subtitle=""
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Order pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                />
            </View>
            <ScrollView style={styles.container}>
                {/* Order Summary Header */}
                <View style={styles.cardCentered}>
                    <Image source={parcelIcon} style={styles.parcelIcon} />
                    <Text style={styles.orderLabel}>Order No.</Text>
                    <Text style={styles.orderId}>PP250506844158</Text>
                    <View style={styles.statusChip}>
                        <Image source={progress} style={{ height: 12, width: 12, marginTop: 4, tintColor: '#5E5B00' }} />
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
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>

                    <Text style={styles.itemCount}>Total Quantity </Text>
                    <Text style={styles.boldText}>2 Items</Text>
                </View>
                <View style={styles.itemCard}>
                    <Image
                        source={product1}
                        style={styles.productImage}
                    />
                    <View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Gromor nutri drip 12-61-0</Text>
                            <Text style={styles.itemWeight}>25 kg</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, gap: 10 }}>
                            <Text style={styles.itemQty}>Qty. x1</Text>
                            <Text style={styles.itemPrice}>₹249</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.itemCard}>
                    <Image
                        source={product1}
                        style={styles.productImage}
                    />
                    <View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Gromor nutri drip 12-61-0</Text>
                            <Text style={styles.itemWeight}>25 kg</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, gap: 10 }}>
                            <Text style={styles.itemQty}>Qty. x1</Text>
                            <Text style={styles.itemPrice}>₹249</Text>
                        </View>
                    </View>
                </View>

                {/* order delivary status */}

                <Text style={styles.orderHeading}>Order Tracking</Text>
                <View style={styles.timelineContainer}>
                    {steps.map((step, index) => (
                        <View key={index} style={styles.stepRow}>
                            {/* Icon + Line */}
                            <View style={styles.iconColumn}>
                                <View style={[styles.iconCircle, step.completed ? styles.completed : styles.pending]}>
                                    {step.completed && <Text style={styles.check}>✔</Text>}
                                </View>
                                {index < steps.length - 1 && <View style={styles.verticalLine} />}
                            </View>

                            {/* Content */}
                            <View style={styles.textColumn}>
                                <Text style={[styles.stepTitle, step.completed && styles.completedText]}>
                                    {step.title}
                                </Text>
                                {step.time && (
                                    <Text style={styles.timeText}>{step.time}</Text>
                                )}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Billing Address */}
                <Text style={styles.sectionTitle}>Billing Address</Text>
                <View style={styles.card}>
                    <Text style={styles.name}>Siddharth Chhajer</Text>
                    <Text style={styles.address}>
                        Plot no. 2-4-197/A, Cinema Road, Below Margadarsi Office, Adilabad, Begumpet{'\n'}
                        Telangana, 504001
                    </Text>
                    <Text style={styles.phone}>+91 9999912345</Text>
                </View>

                {/* store address */}
                <Text style={styles.storeHeading}>Store Address</Text>

                <View style={styles.card}>
                    <View style={styles.storeCodeBox}>
                        <Text style={styles.storeCodeLabel}><Image source={shop} style={{ height: 15, width: 15, tintColor: '#2E7D32' }} /> Store Code:</Text>
                        <Text style={styles.storeCodeValue}> S0393</Text>
                    </View>

                    <View style={styles.addressBlock}>
                        <Image source={location} style={{ height: 15, width: 15, tintColor: '#000', marginTop: 4 }} />
                        <View>
                            <Text style={styles.locationTitle}> Mana Gromor Centre A.kondapuram</Text>
                            <Text style={styles.addressText}>
                                Coromandel International Ltd,{'\n'}
                                c/o Mana Gromor Center, Building No. 110/1,{'\n'}
                                A.kondapuram, Putlur Mandal, Anantapur
                            </Text>
                        </View>
                    </View>

                    <View style={styles.phoneBlock}>
                        <Image source={phone} style={{ height: 10, width: 10, tintColor: '#000', marginTop: 4 }} />
                        <Text style={styles.phoneText}>+91 8978780010</Text>
                    </View>
                </View>
                {/* download button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>🧾  Download Invoice</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
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
        fontWeight: '600',
    },
    orderId: {
        color: '#212121f5',
        fontSize: 16,
        marginBottom: 8,
    },
    statusChip: {
        backgroundColor: '#FFF5C4',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        flexDirection: 'row'
    },
    statusText: {
        color: '#5E5B00',
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 8
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
        // marginLeft: 30
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
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    productImage: {
        width: 80,
        height: 80,
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
        lineHeight: 20,
        marginBottom: 4,
    },
    itemWeight: {
        fontSize: 13,
        color: '#555',
        marginTop: 2,
    },
    itemQty: {
        fontSize: 13,
        color: '#555',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    orderHeading: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
        marginTop: 30,
    },
    timelineContainer: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
        position: 'relative',
    },
    iconColumn: {
        alignItems: 'center',
        width: 30,
    },
    iconCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    completed: {
        backgroundColor: '#21BA45',
    },
    pending: {
        backgroundColor: '#E0E0E0',
    },
    check: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    verticalLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#ccc',
        marginTop: 2,
    },
    textColumn: {
        marginLeft: 12,
        flex: 1,
    },
    stepTitle: {
        fontSize: 14,
        color: '#555',
    },
    completedText: {
        color: '#000',
        fontWeight: '500',
    },
    timeText: {
        fontSize: 13,
        color: '#777',
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 30,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 12,
        // elevation: 2,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    address: {
        fontSize: 15,
        color: '#333',
        marginBottom: 6,
        lineHeight: 20,
    },
    phone: {
        fontSize: 13,
        color: '#333',
    },
    storeHeading: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
        marginTop: 30,
    },
    card: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
    },
    storeCodeBox: {
        backgroundColor: '#E5F9ED',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    storeCodeLabel: {
        fontWeight: '500',
        color: '#2E7D32',
    },
    storeCodeValue: {
        fontWeight: '700',
        color: '#2E7D32',
    },
    addressBlock: {
        marginBottom: 10,
        flexDirection: 'row'
    },
    locationTitle: {
        fontWeight: '600',
        color: '#000',
        fontSize: 14,
        marginBottom: 4,
        marginLeft: 12
    },
    addressText: {
        color: '#555',
        fontSize: 13,
        marginLeft: 12,
        lineHeight: 18
    },
    phoneBlock: {
        marginTop: 5,
        flexDirection: 'row',
    },
    phoneText: {
        fontSize: 13,
        color: '#000',
        marginLeft: 12
    },
    button: {
        backgroundColor: 'linear-gradient',
        backgroundColor: '#4CAF50', // fallback for green
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#219653', // green gradient base color (if no gradient)
        marginTop: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
