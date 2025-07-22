import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import bookingIcon from '../../../../assets/images/common/booking.png'
import product1 from '../../../../assets/images/shop/product1.png'
import cancel from '../../../../assets/images/common/failed.png'
import shop from '../../../../assets/images/common/shop.png';
import location from '../../../../assets/images/common/location.png';
import phone from '../../../../assets/images/common/phone.png'
import CustomHeader from '../../../../components/common/CustomHeader'
const MyBooking = () => {
    return (
        <View style={{ flex: 1, marginTop: 30 }}>
            <View>
                <CustomHeader
                    type="BookingDetails"
                    topTitle="Booking Details"
                    subtitle=""
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Order pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                />
            </View>
            <ScrollView style={styles.container}>
                {/* Header Section */}
                <View style={styles.headerCard}>
                    <Image source={bookingIcon} style={styles.bookingIcon} />
                    <Text style={styles.soNoLabel}>SO No.</Text>
                    <Text style={styles.soNoValue}>BD250429214586</Text>

                    <TouchableOpacity style={styles.cancelButton}>
                        <Image source={cancel} style={{ height: 15, width: 15, tintColor: '#E00C0C', resizeMode: 'contain' }} />
                        <Text style={styles.cancelButtonText}> Cancel In-progress</Text>
                    </TouchableOpacity>
                </View>

                {/* Booking Details Section */}
                <Text style={styles.sectionTitle}>Booking Details</Text>
                <View style={styles.detailCard}>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Booking No.</Text>
                        <Text style={styles.detailValue}>BD250429737593</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Order Date</Text>
                        <Text style={styles.detailValue}>06-05-2025</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Store Code</Text>
                        <Text style={[styles.detailValue, styles.underline]}>S0393</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#A3D2B5', marginVertical: 8 }} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Order Type</Text>
                        <Text style={styles.detailValue}>Paid Online</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Sub Total</Text>
                        <Text style={styles.detailValue}>₹2,990</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Delivery Charges</Text>
                        <Text style={styles.detailValue}>₹130</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Total Amount</Text>
                        <Text style={[styles.detailValue, { fontWeight: 'bold' }]}>₹6063</Text>
                    </View>
                </View>

                {/* Item Details Section */}
                <Text style={styles.sectionTitle}>Item Details</Text>
                <View style={styles.detailCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.quantityText}>Total Quantity</Text>
                        <Text style={{ fontWeight: 'bold' }}>2 Items</Text>

                    </View>

                    {/* Item Row */}
                    {/* item 1 */}
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
                    {/* item 2 */}

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
                </View>

                {/* order tracking */}
                <Text style={styles.heading}>Order Tracking</Text>

                <View style={styles.card}>
                    {/* Booked */}
                    <View style={styles.row}>
                        <View style={styles.leftColumn}>
                            <View style={styles.greenCircle}>
                                <Text style={styles.tickText}>✓</Text>
                            </View>
                            <View style={styles.verticalLine} />
                        </View>

                        <View style={styles.textColumn}>
                            <Text style={styles.statusBooked}>Booked</Text>
                            <Text style={styles.dateText}>3:46 PM, Wednesday, 06-05-2025</Text>
                        </View>
                    </View>

                    {/* Cancelled */}
                    <View style={styles.row}>
                        <View style={styles.leftColumn}>
                            <View style={styles.redCircle}>
                                <Text style={styles.crossText}>✕</Text>
                            </View>
                        </View>

                        <View style={styles.textColumn}>
                            <Text style={styles.statusCancelled}>Cancelled</Text>
                            <Text style={styles.dateText}>4:00 PM, Thursday, 07-05-2025</Text>
                        </View>
                    </View>
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

                <View style={styles.StoreCard}>
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

            </ScrollView>
        </View>

    );
};
export default MyBooking


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F7F9',
        flex: 1,
        padding: 10
    },
    headerCard: {
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    bookingIcon: {
        width: 28,
        height: 28,
        marginBottom: 10,
        tintColor: '#01AD41'
    },
    soNoLabel: {
        fontSize: 14,
        color: '#444',
        fontWeight: 'bold',
    },
    soNoValue: {
        fontSize: 16,
        marginBottom: 10,
    },
    cancelButton: {
        flexDirection: "row",
        backgroundColor: '#FFEDED',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelButtonText: {
        color: '#B51010',
        fontWeight: '500',
        fontSize: 14,
        // lineHeight: 18

    },
    detailCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 12,
        marginTop: 15
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        color: '#555',
    },
    detailValue: {
        color: '#000',
    },
    underline: {
        textDecorationLine: 'underline',
        color: '#01AD41',
    },
    quantityText: {
        marginBottom: 10,
        color: '#444',
        justifyContent: 'space-between'
    },
    itemRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderColor: '#ccc',
        paddingTop: 10,
    },
    productImage: {
        width: 50,
        height: 60,
        resizeMode: 'contain',
        marginRight: 10,
    },
    productName: {
        fontWeight: '600',
        fontSize: 14,
    },
    productSubText: {
        fontSize: 12,
        color: '#555',
    },
    productPrice: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000',
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
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    leftColumn: {
        width: 30,
        alignItems: 'center',
        position: 'relative',
    },
    greenCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    redCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tickText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
    },
    crossText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
    },
    verticalLine: {
        width: 2,
        height: 40,
        backgroundColor: 'green',
        position: 'absolute',
        top: 20,
    },
    textColumn: {
        flex: 1,
        paddingLeft: 8,
    },
    statusBooked: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000',
    },
    statusCancelled: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'red',
    },
    dateText: {
        color: '#555',
        fontSize: 13,
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
    StoreCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 40,

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

});


// const styles = StyleSheet.create({})