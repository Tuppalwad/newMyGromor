import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import parcelIcon from '../../../../assets/images/common/parcel.png'; // Assuming you have a parcel icon
import product1 from '../../../../assets/images/shop/product1.png'; // Assuming you have a product image
import shop from '../../../../assets/images/common/shop.png';
import location from '../../../../assets/images/common/location.png';
import phone from '../../../../assets/images/common/phone.png'
import progress from '../../../../assets/images/splash/timer.png'
import CustomHeader from '../../../../components/common/CustomHeader';
import checkIcon from '../../../../assets/images/common/checkIcon.png'
import { UserManager } from '../../../../storage';
import { useOperation } from '../../../../redux/operation';
import { useDispatch, useSelector } from 'react-redux';
import { createLoadingSelector } from '../../../../redux/loading-reducer';
import { useIsFocused } from '@react-navigation/native';
import { OrderType } from '../../../../redux/order/type';
import { HEToast } from '../../../../components/toast';
import moment from 'moment';
import { defConfigImageURL } from '../../../dashboard_modules/tabs/home/index.service';
import AddressCard from '../../../../components/common/AddressCard';
import Indicator from '../../../../components/common/Indicator';

export default function PurchaseDetail({ navigation, route }) {

    const appLanguage = UserManager?.getAppMultiLanguage;
    const operation = useOperation();
    const dispatch = useDispatch();
    const loadingSelector = createLoadingSelector([
        OrderType.deliveryStatus,
        OrderType.orderShipmentDetails,
        OrderType.downloadInvoiceMethod,
        OrderType.orderTrackingDetails,
        OrderType.downloadinvoiceDetails,
    ]);
    const isLoading = useSelector(state => loadingSelector(state));
    const data = route?.params?.data;
    const isFocussed = useIsFocused();
    const [statusData, setStatusData] = useState([]);
    const [trackingArray, setTrackingArray] = useState(false);
    const [orderData, setOrderData] = useState({});
    const [newDeliveryStatus, setnewDeliveryStatus] = useState(true);
    const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);
    const BannerData = useSelector(state => state.product.bannerData);

    const [invoiceData, setinvoiceData] = useState({
        visible: false,
        invoice_URL: '',
    });
    const farmerLanguage = useSelector(state => state.farmer.FarmerLanguageID);

    useEffect(() => {
        if (isFocussed) {
            let params = {
                magicId: data?.magicOrderId,
                transactionId: data?.transactionId,
                costingId: data?.costingId,
                farmerId: data?.farmerId,
                farmerLanguage: farmerLanguage,
                orderStatus: data?.orderStatus,
            };
            getDeliveryDetails(params);
        }
    }, [data, isFocussed]);

    const getDeliveryDetails = param => {
        if (
            param?.orderStatus === 'Inprogress' ||
            param?.orderStatus === 'PaymentFailed' ||
            param?.orderStatus === 'PaymentReceived' ||
            param?.orderStatus === 'Notrack'
        ) {
            dispatch(operation.order.orderDeliveryDetails(param))
                .then(res => {
                    setOrderData(res.data ?? {});
                    setTrackingArray(true);
                })
                .catch(err => {
                    dispatch(
                        operation.user.getErrorHandling(err, 'orderDeliveryDetails'),
                    );
                });
        } else {
            dispatch(operation.order.orderShipmentDetails(param))
                .then(res => {
                    setOrderData(res.data ?? {});
                    getDeliveryStatus(param);
                })
                .catch(err => {
                    setnewDeliveryStatus(false);
                    dispatch(
                        operation.user.getErrorHandling(err, 'orderShipmentDetails'),
                    );
                });
        }
    };

    const getDeliveryStatus = param => {
        dispatch(operation.order.orderTrackingDetails(param))
            .then(res => {
                let trackingList = [];
                res?.map((item, index) => {
                    item.isDone = true;
                    trackingList.push(item);
                });
                setStatusData(trackingList ?? []);
                setnewDeliveryStatus(true);
            })
            .catch(err => {
                // dispatch(operation.user.getErrorHandling(err, 'orderTrackingDetails'));
            });
    };

    useEffect(() => {
        if (!newDeliveryStatus) {
            let params = {
                magicId: data?.magicOrderId,
                transactionId: data?.transactionId,
                costingId: data?.costingId,
                farmerId: data?.farmerId,
            };
            dispatch(operation.order.deliveryStatus(params))
                .then(res => {
                    let trackingList = [];
                    res?.map((item, index) => {
                        item.isDone = true;
                        trackingList.push(item);
                    });
                    setStatusData(trackingList ?? []);
                    setOrderData(route?.params?.data);
                })
                .catch(err => {
                    setTrackingArray(true);
                    dispatch(operation.user.getErrorHandling(err, 'deliveryStatus'));
                });
        }
    }, [data, newDeliveryStatus]);

    const onPressInvoice = param => {
        try {
            if (param) {
                let transactionId = data?.transactionId;
                dispatch(operation.order.downloadinvoiceDetails(transactionId))
                    .then(res => {
                        try {
                            if (res) {
                                const invoice = { ...invoiceData };
                                invoice.visible = param;
                                invoice.invoice_URL = res ?? '';
                                setinvoiceData(invoice);
                                HEToast(
                                    (appLanguage?.lblInvoiceGeneratedfor ?? 'Invoice Generated for ') +
                                    transactionId,
                                    'success',
                                );
                            } else {
                                HEToast(appLanguage?.something_went_wrong_try ?? 'Something went wrong', 'error');
                            }
                        } catch (innerError) {
                            console.error('Error while processing response:', innerError);
                            HEToast(appLanguage?.something_went_wrong_try ?? 'Something went wrong', 'error');
                        }
                    })
                    .catch(err => {
                        console.error('API Error:', err);
                        // HEToast(
                        //   appLanguage?.lblErrorDownloadingInvoice ?? 'Error downloading invoice', 
                        //   'error'
                        // );
                        dispatch(
                            operation.user.getErrorHandling(err, 'downloadinvoiceDetails'),
                        );
                    });
            } else {
                const invoice = { ...invoiceData };
                invoice.visible = param;
                setinvoiceData(invoice);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            HEToast(appLanguage?.something_went_wrong_try ?? 'Something went wrong', 'error');
        }
    };


    const onPressBuy = () => {
        const item = {
            ...data,
            id: data?.productId,
            categoryId: data?.categoryId,
        };
        navigation.navigate(Screen.productDetails, {
            data: item,
            storeCode: farmerAddress?.storeCode,
        });
    };


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
                        <Text style={styles.itemTitle}>{item?.itemName}</Text>
                        <Text style={styles.itemWeight}>{item?.size}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginLeft: 10,
                        gap: 10
                    }}>
                        <Text style={styles.itemQty}>Qty. x{item.quantity}</Text>
                        <Text style={styles.itemPrice}>₹{item.actualPrice * item.quantity}</Text>
                    </View>
                </View>
            </View>
        );
    };


    return (
        < >
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
                    <Text style={styles.orderId}>{orderData?.soNumber}</Text>
                    <View style={styles.statusChip}>
                        <Image source={progress} style={{ height: 12, width: 12, marginTop: 4, tintColor: '#5E5B00' }} />
                        <Text style={styles.statusText}>{orderData?.status}</Text>
                    </View>
                </View>

                {/* Order Details */}
                <Text style={styles.sectionTitle}>Order Details</Text>
                <View style={styles.detailCard}>
                    <DetailRow label="Order Date" value={moment(orderData?.orderDate).format("DD-MM-YYYY")} />
                    <DetailRow label="Store Code" value={orderData?.storeCode} hasBorder />
                    <DetailRow label="Order Type" value={orderData?.paymentType == 1 ? "Paid Offline" : "Paid Online"} />
                    <DetailRow label="Sub Total" value={`₹ ${orderData.totalAmount}`} />
                    <DetailRow label="Delivery Charges" value={`₹ ${orderData.deliveryCharge}`} />
                    <DetailRow label="Total Amount" value={`₹ ${orderData.totalAmount}`} isBold />
                </View>

                {/* Item Details */}
                <Text style={styles.sectionTitle}>Item Details</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.itemCount}>Total Quantity </Text>
                    <Text style={styles.boldText}>{(orderData?.orderItems || orderData?.shipmentItems || [])?.length} Items</Text>
                </View>

                <FlatList
                    data={(orderData?.orderItems || orderData?.shipmentItems) ?? []}
                    renderItem={renderItem}
                />

                {/* order delivary status */}

                <Text style={styles.orderHeading}>Order Tracking</Text>
                <View style={styles.timelineContainer}>
                    {(statusData || [])?.map((step, index) => (
                        <View key={index} style={styles.stepRow}>
                            {/* Icon + Line */}
                            <View style={styles.iconColumn}>
                                <View style={[styles.iconCircle, step.isDone ? styles.completed : styles.pending]}>
                                    {step.isDone && <Image
                                        source={checkIcon}
                                        style={{ width: 10, height: 10, fontWeight: 600, resizeMode: 'contain', tintColor: '#fff' }}
                                    />
                                    }
                                </View>
                                {index < statusData?.length - 1 && <View style={styles.verticalLine} />}
                            </View>

                            {/* Content */}
                            <View style={styles.textColumn}>
                                <Text style={[styles.stepTitle, step.completed && styles.completedText]}>
                                    {step?.status.toLowerCase()
                                        .split('_')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ')
                                    }
                                </Text>
                                {step.createdOn && (
                                    <Text style={styles.timeText}>{moment(step?.createdOn).format('h:mm A, dddd, DD-MM-YYYY')}</Text>
                                )}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Billing Address */}
                <Text style={styles.sectionTitle}>Billing Address</Text>

                <AddressCard />

                {/* store address */}
                <Text style={styles.storeHeading}>Store Address</Text>


                <View style={{ marginTop: 10 }}>
                    <AddressCard cardType="StoreType" />
                </View>

                {/* download button */}
                <TouchableOpacity style={styles.button} onPress={() => onPressInvoice(true)}>
                    <Text style={styles.buttonText}>🧾 Download Invoice</Text>
                </TouchableOpacity>
            </ScrollView>
            <Indicator show={isLoading} />
        </>
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
        marginBottom: 5,
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
        width: 1.5,
        // flex: 1,
        backgroundColor: '#01AD41',
        marginTop: 2,
        height: 40

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
        marginVertical: 30

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
