import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../../../components/common/CustomHeader';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import parcel from '../../../../assets/images/common/parcel.png';
import booking from '../../../../assets/images/common/booking.png';
import timerIcon from '../../../../assets/images/splash/timer.png';
import deliver from '../../../../assets/images/common/deliver.png';
import failed from '../../../../assets/images/common/failed.png';
import rightArrow from '../../../../assets/images/common/rightArrow.png';
import { useNavigation } from '@react-navigation/native';
import filterIcon from '../../../../assets/images/common/filter.png';
import moment from 'moment';
import Indicator from '../../../../components/common/Indicator';
import FilterModalForOrderAndServices from '../../../../components/common/FilterModalForOrderAndServices';

const orders = [
    { id: 1, key: 'inprogress', status: 'In-progress', color: '#FFF3CD', textColor: '#856404', image: timerIcon },
    { id: 2, key: 'delivered', status: 'Delivered', color: '#D4EDDA', textColor: '#155724', image: deliver },
    { id: 3, key: 'failed', status: 'Payment Failed', color: '#F8D7DA', textColor: '#721C24', image: failed },
    { id: 4, key: 'cancel', status: 'Cancelled', color: '#F8D7DA', textColor: '#721C24', image: failed },
    { id: 5, key: 'booked', status: "Booked", color: '#D4EDDA', textColor: '#155724', image: deliver },

];

export default function MyOrdersScreen({
    isLoading, onPressItem, onPressContinue,
    sortData, setSelectedSort, selectedSort, appLanguage, OrderArray, onEndReached,
    getFetchAPIMethod,
    activeCategory, setActiveCategory
}) {
    const navigation = useNavigation();
    const [visible, setVisible] = useState('false')
    const count = OrderArray?.length || 0;

    const NumberComponent = ({ text, num, item }) => {
        return (
            <View style={{ flexDirection: "column" }}>

                <View style={styles.cardHeader}>
                    <Text style={styles.orderLabel}>{text}.</Text>
                    <View style={[styles.statusBadge, { backgroundColor: item?.color }]}>
                        <Image source={item?.image} style={{ width: 13, height: 13, tintColor: item?.textColor, resizeMode: 'contain' }} />
                        <Text style={[styles.statusText, { color: item?.textColor }]}>{item?.status}</Text>
                    </View>

                </View>
                <Text style={styles.orderNumber}>{num}</Text>

            </View>
        )
    }



    const renderItem = ({ item, index }) => {

        let colorData = null
        let newItem = null

        if (activeCategory == "purchases") {
            colorData = orders.find((it) =>
                item?.orderStatus?.toLowerCase().includes(it.key)
            )
            newItem = {
                transactionId: item.transactionId,
                orderAmount: item.orderAmount
            }

        }
        else {
            colorData = orders.find((it) =>
                item?.bookingStatus?.toLowerCase().includes(it.key)
            )
            newItem = {
                transactionId: item.bookingId,
                orderAmount: item.orderedTotalBookingAmount
            }
        }


        return (

            <View key={index} style={styles.card}>
                <NumberComponent
                    text={activeCategory === 'purchases' ? "Order No" : "So No"}
                    num={newItem?.transactionId}
                    item={colorData}
                />
                <View style={{ height: 1, backgroundColor: '#A3D2B5', marginVertical: 8 }} />
                <View style={styles.footerRow}>
                    <View>
                        <Text style={styles.amount}>Order Amount: ₹{newItem?.orderAmount}</Text>
                        <Text style={styles.date}>Order Date: {moment(newItem.createdOn).format('DD-MM-YYYY')}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onPressItem(item)}>
                        <Image source={rightArrow} style={{ width: 16, height: 16, tintColor: '#000', resizeMode: 'contain', }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }




    return (
        <>
            <View style={styles.container}>
                <CustomHeader
                    type="order"
                    topTitle="My Orders"
                    subtitle=""
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Order pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                />

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        onPress={() => setActiveCategory('purchases')}
                        style={styles.tabButton}
                    >
                        <View style={styles.tabInner}>
                            <Image source={parcel} style={{
                                width: 24, height: 24,
                                tintColor: activeCategory === 'purchases' ? '#01AD41' : '#444'
                            }} />
                            <Text style={[
                                styles.tabText,
                                activeCategory === 'purchases' && styles.activeTabText
                            ]}>
                                My Purchases
                            </Text>

                        </View>
                        {activeCategory === 'purchases' && <View style={styles.greenUnderline} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setActiveCategory('bookings');
                            // navigation.navigate('MyBookings');
                        }}
                        style={styles.tabButton}
                    >
                        <View style={styles.tabInner}>
                            <Image source={booking} style={{ width: 24, height: 24, tintColor: activeCategory === 'bookings' ? '#01AD41' : '#444' }} />
                            <Text style={[
                                styles.tabText,
                                activeCategory === 'bookings' && styles.activeTabText
                            ]}>
                                My Bookings
                            </Text>

                        </View>
                        {activeCategory === 'bookings' && <View style={styles.greenUnderline} />}
                    </TouchableOpacity>
                </View>


                <View style={styles.content}>
                    <Text style={styles.totalText}>Total {count} {activeCategory === 'purchases' ? "Purchases" : "Bookings"}</Text>

                    <FlatList
                        data={OrderArray || []}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />


                </View>

                <LinearGradient
                    colors={['#1E8153', '#4EA618']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.filterButtonWrapper}
                >
                    <TouchableOpacity style={styles.filterButton} onPress={() => setVisible(true)}>
                        <Image source={filterIcon} style={{ width: 18, height: 18, tintColor: "#fff" }} />
                        {/* <Icon name="filter-variant" size={18} color="#fff" /> */}
                        <Text style={styles.filterText}> Filters</Text>
                    </TouchableOpacity >
                </LinearGradient>


                <FilterModalForOrderAndServices visible={visible} setVisible={setVisible} />
                <Indicator Indicator={!isLoading} />
            </View >
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 12,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderRadius: 8,
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
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 60
    },
    totalText: {
        fontSize: 14,
        marginVertical: 12,
    },
    card: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 4,
    },
    orderLabel: {
        fontWeight: '600',
        fontSize: 14,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
        lineHeight: 25
    },
    orderNumber: {
        fontSize: 14,
        marginBottom: 4,
    },
    amount: {
        fontWeight: '600',
        marginBottom: 4,
    },
    date: {
        color: '#777',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filterButtonWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 18,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
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
