import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import bookingIcon from '../../../../assets/images/common/booking.png'
import product1 from '../../../../assets/images/shop/product1.png'
import cancel from '../../../../assets/images/common/failed.png'
import shop from '../../../../assets/images/common/shop.png';
import location from '../../../../assets/images/common/location.png';
import phone from '../../../../assets/images/common/phone.png'
import CustomHeader from '../../../../components/common/CustomHeader'
import { UserManager } from '../../../../storage'
import { useOperation } from '../../../../redux/operation'
import { useDispatch, useSelector } from 'react-redux'
import { createLoadingSelector } from '../../../../redux/loading-reducer'
import { useIsFocused } from '@react-navigation/native'
import { ProductType } from '../../../../redux/product/type'
import moment from 'moment'
import { FlatList } from 'react-native-gesture-handler'
import checkIcon from '../../../../assets/images/common/checkIcon.png'
import { defConfigImageURL } from '../../../dashboard_modules/tabs/home/index.service'
import AddressCard from '../../../../components/common/AddressCard'
import Indicator from '../../../../components/common/Indicator'


const MyBookingDetails = ({ navigation, route }) => {
    const BannerData = useSelector(state => state.product.bannerData);
    const appLanguage = UserManager?.getAppMultiLanguage
    const operation = useOperation();
    const dispatch = useDispatch();
    const loadingSelector = createLoadingSelector([ProductType.bookingShipmentDetails]);
    const isLoading = useSelector(state => loadingSelector(state));
    const data = route?.params?.data
    const isFocussed = useIsFocused();
    const bookingDetailsArray = useSelector((state) => state.product.bookingShipmentArray)

    useEffect(() => {
        if (isFocussed) {
            let params = data?.bookingId ?? ""
            dispatch(operation.product.bookingShipmentDetails(params))
        }
    }, [data, isFocussed])

    const { trackBookingHistory, bookingId, storeCode, orderedTotalBookingAmount, bookingStatus, createdOn, productName, deliveryCharge, trackBookingDetails } = bookingDetailsArray

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemCard}>
                <Image
                    source={{
                        uri: defConfigImageURL(
                            BannerData.imageBaseURL,
                            item?.productImage,
                        ),
                    }}
                    style={styles.productImage}
                />
                <View>
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemTitle}>{item?.productName}</Text>
                        <Text style={styles.itemWeight}>{item?.productSize}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, gap: 10 }}>
                        <Text style={styles.itemQty}>Qty. x{item?.orderedQuantity}</Text>
                        <Text style={styles.itemPrice}>₹{item?.orderedTotalAmount}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, }}>
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
                    <Text style={styles.soNoValue}>{bookingId}</Text>

                    <TouchableOpacity style={{
                        ...styles.cancelButton,
                        backgroundColor: bookingStatus?.toLowerCase().includes('canc') ? '#FFEDED' : "#DCFFD9",

                    }}>
                        <Image source={cancel} style={{ height: 15, width: 15, tintColor: bookingStatus?.toLowerCase().includes('canc') ? '#E00C0C' : "#147045", resizeMode: 'contain' }} />
                        <Text style={{
                            ...styles.cancelButtonText,
                            color: bookingStatus?.toLowerCase().includes('canc') ? '#E00C0C' : "#147045",

                        }}> {bookingStatus}</Text>
                    </TouchableOpacity>
                </View>

                {/* Booking Details Section */}
                <Text style={styles.sectionTitle}>Booking Details</Text>
                <View style={styles.detailCard}>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Booking No.</Text>
                        <Text style={styles.detailValue}>{bookingId}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Order Date</Text>
                        <Text style={styles.detailValue}>{moment(createdOn).format("DD-MM-YYYY")}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Store Code</Text>
                        <Text style={[styles.detailValue,]}>{storeCode}</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#A3D2B5', marginVertical: 8 }} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Order Type</Text>
                        <Text style={styles.detailValue}>Paid Online</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Sub Total</Text>
                        <Text style={styles.detailValue}>₹{orderedTotalBookingAmount}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Delivery Charges</Text>
                        <Text style={styles.detailValue}>₹{deliveryCharge}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Total Amount</Text>
                        <Text style={[styles.detailValue, { fontWeight: 'bold' }]}>₹{orderedTotalBookingAmount}</Text>
                    </View>
                </View>

                {/* Item Details Section */}
                <Text style={styles.sectionTitle}>Item Details</Text>
                <View style={styles.detailCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.quantityText}>Total Quantity</Text>
                        <Text style={{ fontWeight: 'bold' }}>{trackBookingDetails?.length} Items</Text>
                    </View>

                    <FlatList
                        data={trackBookingDetails ?? []}
                        renderItem={renderItem}
                    />


                </View>

                {/* order tracking */}
                <Text style={styles.heading}>Order Tracking</Text>

                {(trackBookingHistory || []).map((item, index) => {
                    return (
                        <View key={index} style={styles.card}>
                            {!item?.status?.toLowerCase().includes('canc') ? (
                                <View style={styles.row}>
                                    <View style={styles.leftColumn}>
                                        <View style={styles.greenCircle}>
                                            <Image
                                                source={checkIcon}
                                                style={{ width: 10, height: 10, resizeMode: 'contain', tintColor: "#fff" }}
                                            />
                                        </View>
                                        {index < trackBookingHistory?.length - 1 && <View style={styles.verticalLine} />}
                                    </View>

                                    <View style={styles.textColumn}>
                                        <Text style={styles.statusBooked}>{item?.status}</Text>
                                        <Text style={styles.timeText}>
                                            {moment(item?.createdOn).format('h:mm A, dddd, DD-MM-YYYY')}
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.row}>
                                    <View style={styles.leftColumn}>
                                        <View style={styles.redCircle}>
                                            <Text style={styles.crossText}>✕</Text>
                                        </View>
                                    </View>

                                    <View style={styles.textColumn}>
                                        <Text style={styles.statusCancelled}>{item?.status}</Text>
                                        <Text style={styles.timeText}>
                                            {moment(item?.createdOn).format('h:mm A, dddd, DD-MM-YYYY')}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    );
                })}


                <Text style={styles.sectionTitle}>Billing Address</Text>

                <AddressCard />

                {/* store address */}
                <Text style={styles.storeHeading}>Store Address</Text>


                <View style={{ marginBottom: 40 }}>
                    <AddressCard cardType="StoreType" />
                </View>

            </ScrollView>
            <Indicator Indicator={!isLoading} />
        </View>

    );
};
export default MyBookingDetails


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
    storeHeading: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
        marginTop: 30,
    },
    cancelButton: {
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    // sectionTitle: {
    //     marginTop: 20,
    //     fontSize: 16,
    //     fontWeight: '600',
    //     color: '#222',
    // },
    cancelButtonText: {
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
        // marginBottom: 20,
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
        backgroundColor: '#01AD41',
        position: 'absolute',
        top: 23,
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