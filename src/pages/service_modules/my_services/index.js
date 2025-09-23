import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, StyleSheet,
    Image, TouchableOpacity, ScrollView,
    FlatList,
    SafeAreaView
} from 'react-native';
import CustomHeader from '../../../components/common/CustomHeader';
// import parcel from '../../../assets/images/common/parcel.png'
import doorDelivery from '../../../assets/images/common/doorService.png'
import sprayService from '../../../assets/images/common/SprayingService.png'
import shop from '../../../assets/images/common/shop.png'
import DoorDeliveryComponent from '../door-delivery';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import filterIcon from '../../../assets/images/common/filter.png'
import rightArrow from '../../../assets/images/common/rightArrow.png'
import SprayingServiceDetail from '../spraying-service';
import NewServiceRequestScreen from '../spraying-service/newService';
import { useDispatch, useSelector } from 'react-redux';
import { getCondition, getProductDetailsFromInvoice, getServicesapi } from '../../../redux/services/operation';
import { Screen } from '../../../router/screen';
import Indicator from '../../../components/common/Indicator';
import { splitData } from '../../../utils/utils';
import FilterModalForOrderAndServices from '../../../components/common/FilterModalForOrderAndServices';
import { servicetype } from '../../../redux/services/type';
import CustomButton from '../../../components/common/CustomButton';
import moment from 'moment';
import { defConfigImageURL } from '../../dashboard_modules/tabs/home/index.service';
import { getPreviousAddress } from '../../../redux/user/operation';

function MyServicesScreen({ navigation }) {
    const farmerLanguage = useSelector(state => state.farmer.FarmerLanguageID);
    const state = useRoute().params?.state
    const { applyedservices } = useSelector(state => state.services);
    const [loading, setLoading] = useState(false)
    const [soNumber, setSoNumber] = useState('');
    const [activeCategory, setActiveCategory] = useState(state);
    const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const isfoucused = useIsFocused()
    const productData = useSelector(state => state.services.doorDeliveryProduct)
    const BannerData = useSelector(state => state.product.bannerData);
    const isfocused = useIsFocused()

    const orderItems = [
        {
            id: '1',
            name: 'Gromor nutri drip 12-61-0',
            weight: '25 kg',
            quantity: '1',
            price: '₹249',
            image: require('../../../assets/images/shop/product1.png'),
        },
        {
            id: '2',
            name: 'Magwin magnesium sulphate',
            weight: '50 kg',
            quantity: '3',
            price: '₹3319',
            image: require('../../../assets/images/shop/product2.png'),
        },
    ];

    useEffect(() => {
        if (isfocused) setPreviousAddress()
    }, [isfocused])

    useEffect(() => {
        const getdata = async () => {
            const resdata = await dispatch(getCondition())
            dispatch({ type: servicetype.SprayCondation, payload: resdata })
        }
        getdata()

    }, [isfoucused])

    const renderItem = ({ item }) => (
        <View style={styles.sprayingcard}>
            <View style={styles.sprayingcardHeader}>
                <Text style={styles.serviceId}>Service ID</Text>
                <View style={[styles.sprayingBadge, { backgroundColor: "#DCFFD9" }]}>
                    <Text style={styles.sprayingBadgeText}>{splitData(item?.serviceStatus)}</Text>
                </View>
            </View>
            <Text style={styles.serviceIdText}>{item?.serviceId}</Text>
            <View style={{ height: 1, backgroundColor: '#A3D2B5', marginVertical: 8 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <View>
                    <Text style={styles.Sprayingcrop}>Crop: <Text style={styles.cropName}>{item.crop}</Text></Text>
                    <Text style={styles.date}>Scheduled Date: {item.date}</Text>
                    {item?.preferredTime ? <Text style={styles.date}>Preferred Time: {item?.preferredTime}</Text> : null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate(Screen.SprayingService, { data: item })}>
                        <Image source={rightArrow} style={{ tintColor: '#000', marginTop: 15, height: 15, width: 15, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    useEffect(() => {
        fetchData()
    }, [])



    const setPreviousAddress = async () => {
        try {
            await dispatch(getPreviousAddress(farmerAddress.farmerIdentityId))
        } catch (error) {
            console.log(error)
        }
    }


    const fetchData = async () => {
        try {
            setLoading(true);
            await dispatch(getServicesapi({ farmerIdentityId: farmerAddress?.farmerIdentityId }));
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };


    const getDeliveryStatus = async (param) => {
        try {
            console.log(param, 'param')
            setLoading(true);
            const res = await dispatch(getProductDetailsFromInvoice(param));
            dispatch({ type: servicetype.doorDeliveryProduct + '_SUCCESS', payload: res });
        } catch (err) {
            setLoading(false);

            dispatch({ type: servicetype.doorDeliveryProduct + '_SUCCESS', payload: null })
            dispatch(operation.user.getErrorHandling({ message: err?.data?.description }, 'orderTrackingDetails'));
            console.log('Error in getDeliveryStatus', err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View>
                <CustomHeader
                    type="services"
                    topTitle="My Services"
                    subtitle=""
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                    style={styles.header}
                />
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    onPress={() => setActiveCategory('Door Delivery')}
                    style={styles.tabButton}
                >
                    <View style={styles.tabInner}>
                        <Image source={doorDelivery} style={{
                            width: 24, height: 24,
                            tintColor: activeCategory === 'Door Delivery' ? '#01AD41' : '#444'
                        }}
                        />
                        <Text style={[
                            styles.tabText,
                            activeCategory === 'Door Delivery' && styles.activeTabText
                        ]}>
                            Door Delivery
                        </Text>

                    </View>
                    {activeCategory === 'Door Delivery' && <View style={styles.greenUnderline} />}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setActiveCategory('Spraying Services');
                    }}
                    style={styles.tabButton}
                >
                    <View style={styles.tabInner}>
                        <Image source={sprayService} style={{ width: 24, height: 24, tintColor: activeCategory === 'Spraying Services' ? '#01AD41' : '#444' }} />
                        <Text style={[
                            styles.tabText,
                            activeCategory === 'Spraying Services' && styles.activeTabText
                        ]}>
                            Spraying Services
                        </Text>

                    </View>
                    {activeCategory === 'Spraying Services' && <View style={styles.greenUnderline} />}
                </TouchableOpacity>
            </View>

            <FlatList
                data={[{}]}
                renderItem={() => (
                    activeCategory === 'Door Delivery' ? (
                        <View>
                            <Image source={require('../../../assets/images/common/services.png')} style={styles.bannerImage} />
                            <Text style={styles.title}>Doorstep Delivery Service</Text>
                            <Text style={styles.subtitle}>*Available even in Remote Villages</Text>

                            <View style={{ paddingHorizontal: 16 }}>
                                <Text style={styles.soLabel}>SO Number</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder="Enter 14 digit SO Number"
                                        placeholderTextColor="#999"
                                        value={soNumber}
                                        onChangeText={setSoNumber}
                                        keyboardType="default"
                                        maxLength={14}
                                        style={styles.input}
                                    />
                                    <TouchableOpacity
                                        onPress={() => getDeliveryStatus({
                                            invoiceNumber: soNumber,
                                            language: farmerLanguage,
                                        })}
                                    >
                                        <Image source={require('../../../assets/images/splash/search.png')} style={styles.searchIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {productData && <View style={styles.card}>
                                <View style={styles.storeRow}>
                                    <Image source={shop} style={styles.storeIcon} />
                                    <Text style={styles.storeText}>Store Code: <Text style={styles.storeCode}>{productData?.storeCode ?? ""}</Text></Text>
                                </View>

                                <View style={styles.infoBlock}>
                                    <Text style={styles.label}>Order No.</Text>
                                    <Text style={styles.value}>{soNumber ?? ""}</Text>
                                </View>
                                <View style={{ width: '100%', height: 1, backgroundColor: "#A3D2B5", marginVertical: 4 }} />

                                <View style={styles.infoBlock}>
                                    <Text style={styles.label}>Order Amount: <Text style={styles.value}>₹{productData?.amount ?? productData?.totalAmount ?? 0}</Text></Text>
                                    <Text style={styles.label}>Order Date: <Text style={styles.value}>{moment(productData?.orderDate).format('DD-M-YYYY')}</Text></Text>
                                </View>
                                <View style={{ width: '100%', height: 1, backgroundColor: "#A3D2B5", marginVertical: 4 }} />

                                <Text style={styles.totalQty}>Total Quantity: {productData?.totalQuantity ?? 0}</Text>

                                <FlatList
                                    data={productData?.orderItems || []}
                                    keyExtractor={item => item.itemNumber}
                                    renderItem={({ item }) => (
                                        <View style={styles.itemBox}>
                                            <Image source={{ uri: defConfigImageURL(BannerData.productImage, item?.productImage) }} style={styles.itemImage} resizeMode={'contain'} />

                                            <View style={styles.itemInfo}>
                                                <Text style={styles.itemName}>{item?.productName}</Text>
                                                <Text style={styles.itemWeight}>{item?.size}</Text>
                                                <View style={styles.itemFooter}>
                                                    <Text style={styles.itemQty}>Qty. x{item?.quantity}</Text>
                                                    <Text style={styles.itemPrice}>{isNaN(item?.actualPrice * item?.quantity) ? 0 : item?.actualPrice * item?.quantity}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>}

                        </View>
                    ) : (
                        <View>
                            <View style={{ paddingHorizontal: 10 }}>
                                <View style={styles.newBtnRow}>
                                    <Text style={styles.total}>Total {applyedservices?.length ?? 0} Services</Text>

                                    <CustomButton
                                        title={"+ New Service"}
                                        onPress={() => navigation.navigate(NewServiceRequestScreen)}
                                        show={false}
                                    />

                                </View>
                                <FlatList
                                    data={applyedservices || []}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderItem}
                                    contentContainerStyle={{ paddingBottom: 100 }}
                                />
                            </View>
                        </View>
                    )
                )}
            />

            {activeCategory == "Door Delivery" ?
                <CustomButton
                    title={"Proceed to Delivery"}
                    onPress={() => {
                        navigation.navigate(Screen.DoorDelivery, { soNumber: soNumber })
                        setSoNumber('')
                    }}
                    show={false}
                    disabled={!soNumber}
                />
                :
                <CustomButton
                    title={"Filters"}
                    onPress={() => setVisible(true)}
                    show={false}
                />
            }

            <Indicator Indicator={!loading} />
            <FilterModalForOrderAndServices visible={visible} setVisible={setVisible} />

        </SafeAreaView >
    );
}
export default MyServicesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffffd0',
        paddingVertical: 12,
        borderRadius: 8,
        // marginTop: 20
    },
    tabButton: {
        alignItems: 'center',
        flex: 1
    },
    tabInner: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6
    },
    tabText: {
        fontSize: 16,
        color: '#444'
    },
    activeTabText: {
        color: '#01AD41',
        fontWeight: 'bold'
    },
    badge: {
        minWidth: 20,
        height: 20,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6
    },
    badgeActive: {
        backgroundColor: '#01AD41'
    },
    badgeInactive: {
        backgroundColor: '#E5E5E5'
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600'
    },
    greenUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        top: 58,
        marginTop: 4,
        height: 2,
        backgroundColor: '#01AD41',
        width: '100%'
    },
    inactiveTabText: {
        color: '#555',
    },
    bannerImage: {
        width: '100%',
        height: 250,
        // borderRadius: 8,
        marginTop: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 16,
        textAlign: 'center',
        lineHeight: 18
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 400,
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 16,
        marginTop: 4
    },
    soLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4E4E4E',
        marginBottom: 8,
        // marginLeft: 10
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 1,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 14,
        color: '#000',
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: '#00AF50',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        margin: 14,
        justifyContent: 'center'
    },
    storeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        justifyContent: 'center',
        backgroundColor: '#DAFDE7',
        borderRadius: 10,
        width: '100%',
        paddingVertical: 5
    },
    storeIcon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginRight: 6,
    },
    storeText: {
        fontSize: 14,
        color: '#444',
    },
    storeCode: {
        color: '#00AF50',
        fontWeight: '600',
    },
    infoBlock: {
        // marginBottom: 6,
        marginVertical: 6
    },
    label: {
        fontSize: 13,
        color: '#444',
    },
    value: {
        fontWeight: '600',
        color: '#000',
    },
    totalQty: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
    },
    itemBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        borderWidth: 0.6,
        borderColor: '#DFDFDF',
        padding: 10,
        marginBottom: 10,

    },
    itemImage: {
        width: 50,
        height: 70,
        resizeMode: 'contain',
        marginRight: 12,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontWeight: '600',
        fontSize: 14,
    },
    itemWeight: {
        fontSize: 12,
        color: '#666',
    },
    itemQty: {
        fontSize: 13,
        marginTop: 4,
    },
    itemPrice: {
        fontWeight: '600',
        fontSize: 14,
    },
    proceedBtn: {
        flexDirection: 'row',
        // backgroundColor: 'linear-gradient(90deg, #00C851, #007E33)', // This is symbolic, not directly supported
        // backgroundColor: '#00AF50', // fallback solid color
        // marginTop: 20,
        paddingVertical: 14,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    proceedText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    arrow: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 10,
        fontWeight: '500',
    },
    newBtnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    total: {
        fontSize: 15,
        fontWeight: '600',
    },
    newBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    newBtnText: {
        color: '#fff',
        fontWeight: '600',
    },
    sprayingcard: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 14,
        marginBottom: 10,
        position: 'relative',
    },
    sprayingcardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    serviceId: {
        fontWeight: '600',
        color: '#333',
        fontSize: 14
    },
    sprayingBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 18,
    },
    sprayingBadgeText: {
        fontSize: 12,
        color: '#333',
        fontWeight: '600',
    },
    serviceIdText: {
        marginTop: 4,
        marginBottom: 6,
        fontWeight: '400',
        color: '#000',
        fontSize: 14
    },
    Sprayingcrop: {
        color: '#4E4E4E',
        fontSize: 13,
        fontWeight: 600
    },
    cropName: {
        // fontWeight: 'bold',
        color: '#4E4E4E',
    },
    date: {
        color: '#555',
        marginTop: 2,
    },
    filterButtonWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 16,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    filterButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});