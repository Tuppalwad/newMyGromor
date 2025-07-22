import React, { useState } from 'react';
import {
    View, Text, TextInput, StyleSheet,
    Image, TouchableOpacity, ScrollView,
    FlatList
} from 'react-native';
import CustomHeader from '../../../components/common/CustomHeader';
// import parcel from '../../../assets/images/common/parcel.png'
import doorDelivery from '../../../assets/images/common/doorService.png'
import sprayService from '../../../assets/images/common/SprayingService.png'
import shop from '../../../assets/images/common/shop.png'

function MyServicesScreen() {
    // const [selectedTab, setSelectedTab] = useState('Door Delivery');
    const [soNumber, setSoNumber] = useState('');
    const [activeCategory, setActiveCategory] = useState('Door Delivery');
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

    return (
        <View style={styles.container}>

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
                        }} />
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
                        // navigation.navigate('MyBookings');
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
            <ScrollView>
                {/* Image Banner */}
                <Image source={require('../../../assets/images/common/services.png')} style={styles.bannerImage} />

                {/* Delivery Info */}
                <Text style={styles.title}>Doorstep Delivery Service</Text>
                <Text style={styles.subtitle}>*Available even in Remote Villages</Text>

                {/* SO Number Input */}
                <View style={{ paddingHorizontal: 16 }}>
                    <Text style={styles.soLabel}>SO Number</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Enter 14 digit SO Number"
                            placeholderTextColor="#999"
                            value={soNumber}
                            onChangeText={setSoNumber}
                            keyboardType="numeric"
                            maxLength={14}
                            style={styles.input}
                        />
                        <TouchableOpacity>
                            <Image source={require('../../../assets/images/splash/search.png')} style={styles.searchIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Store Code */}
                <View style={styles.card}>
                    <View style={{ ...styles.storeRow, alignContent: 'center', alignSelf: 'center' }}>
                        <Image source={shop} style={styles.storeIcon} />
                        <Text style={styles.storeText}>Store Code: <Text style={styles.storeCode}>SO393</Text></Text>
                    </View>

                    {/* Order Info */}
                    <View style={styles.infoBlock}>
                        <Text style={styles.label}>Order No.</Text>
                        <Text style={styles.value}>CD250701031942</Text>
                    </View>
                    < View style={{ height: 1, backgroundColor: '#A3D2B5', marginVertical: 8 }} />

                    <View style={styles.infoBlock}>
                        <Text style={styles.label}>Order Amount: <Text style={styles.value}>₹3618</Text></Text>
                        <Text style={styles.label}>Order Date: <Text style={styles.value}>06-05-2025</Text></Text>
                    </View>
                    < View style={{ height: 1, backgroundColor: '#A3D2B5', marginVertical: 8 }} />

                    {/* <View style={styles.separator} /> */}

                    {/* Quantity */}
                    <Text style={styles.totalQty}>Total Quantity: 4</Text>

                    {/* Items List */}
                    <FlatList
                        data={orderItems}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.itemBox}>
                                <Image source={item.image} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemWeight}>{item.weight}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.itemQty}>Qty. x{item.quantity}</Text>
                                        <Text style={styles.itemPrice}>{item.price}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>

                {/* Proceed Button */}
                <TouchableOpacity style={styles.proceedBtn}>
                    <Text style={styles.proceedText}>Proceed to Delivery</Text>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
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
        backgroundColor: '#EEF2F1',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20
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
        marginBottom: 6,
    },
    label: {
        fontSize: 13,
        color: '#444',
    },
    value: {
        fontWeight: '600',
        color: '#000',
    },
    // separator: {
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#ccc',
    //     marginVertical: 10,
    // },
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
        backgroundColor: 'linear-gradient(90deg, #00C851, #007E33)', // This is symbolic, not directly supported
        backgroundColor: '#00AF50', // fallback solid color
        marginTop: 20,
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
});
