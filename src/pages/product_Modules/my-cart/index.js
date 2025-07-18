import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, CheckBox } from 'react-native';
import product1 from '../../../assets/images/shop/product1.png';
import { useState } from 'react';
import bin from '../../../assets/images/common/bin.png';
import bellIcon from '../../../assets/images/splash/BellIcon.png'
import cartIcon from '../../../assets/images/splash/cart.png';
import redDot from '../../../assets/images/splash/redDot.png';
import leftArrow from '../../../assets/images/splash/leftArrow.png';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../../components/common/CustomHeader';
import CustomRadioButton from '../../../components/common/CustomRadioButton';
import CustomLoginRadioButton from '../../../components/CustomLoginRadioButton';
import doorDelivary from '../../../assets/images/common/transport.png'
import pickUp from '../../../assets/drawer/shop.png'
import LinearGradient from 'react-native-linear-gradient';

const Cart = () => {
    const [selected, setSelected] = useState('pickup');
    const [sameAddress, setSameAddress] = useState(true);
    const [activeCategory, setActiveCategory] = useState('non-fertilizers');
    const navigation = useNavigation();
    return (
        <>

            {/* <View style={styles.rightSection}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={leftArrow} style={{ height: 18, width: 18, objectFit: 'contain', marginBottom: 10 }} />
                    <Text style={styles.title}>My Cart</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.iconWrapper}>
                        <Image source={bellIcon} style={styles.icon} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconWrapper}>
                        <Image source={cartIcon} style={styles.icon} resizeMode='contain' />
                        <Image source={redDot} style={styles.redDot} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </View> */}

            <CustomHeader
                type="cart"
                topTitle="My Cart"
                subtitle=""
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    onPress={() => setActiveCategory('non-fertilizers')}
                    style={styles.tabButton}
                >
                    <View style={styles.tabInner}>
                        <Text style={[
                            styles.tabText,
                            activeCategory === 'non-fertilizers' && styles.activeTabText
                        ]}>
                            Non-Fertilizers
                        </Text>
                        <View style={[
                            styles.badge,
                            activeCategory === 'non-fertilizers' ? styles.badgeActive : styles.badgeInactive
                        ]}>
                            <Text style={styles.badgeText}>3</Text>
                        </View>
                    </View>
                    {activeCategory === 'non-fertilizers' && <View style={styles.greenUnderline} />}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setActiveCategory('fertilizers')}
                    style={styles.tabButton}
                >
                    <View style={styles.tabInner}>
                        <Text style={[
                            styles.tabText,
                            activeCategory === 'fertilizers' && styles.activeTabText
                        ]}>
                            Fertilizers
                        </Text>
                        <View style={[
                            styles.badge,
                            activeCategory === 'fertilizers' ? styles.badgeActive : styles.badgeInactive
                        ]}>
                            <Text style={styles.badgeText}>1</Text>
                        </View>
                    </View>
                    {activeCategory === 'fertilizers' && <View style={styles.greenUnderline} />}
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>

                {/* Warning Box */}
                <View style={styles.warningBox}>
                    <Text style={styles.warningHeading}>Seperate Order Required</Text>
                    <Text style={styles.warningText}>
                        Please place separate orders for Fertilizers and Non-Fertilizers. Switch categories using the buttons above.
                    </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
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
                            <TouchableOpacity><Text style={styles.deleteIcon}><Image source={bin} style={{ height: 18, width: 18 }} /></Text></TouchableOpacity>
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
                            <TouchableOpacity><Text style={styles.deleteIcon}><Image source={bin} style={{ height: 18, width: 18 }} /></Text></TouchableOpacity>
                            <Text style={styles.price}>₹499</Text>
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

                    {/* delivary mode  */}
                    <Text style={styles.heading}>Select Delivery Method</Text>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.optionBox, { backgroundColor: selected === 'door' ? '#effde3dc' : '#fff', borderRadius: 8, alignItems: 'center', flexDirection: 'row' }, selected === 'door' && styles.selectedBox]} onPress={() => setSelected('door')}>

                            <View
                                style={{
                                    top: 8, left: 14, position: 'absolute', flexDirection: 'row', alignItems: 'center',
                                }}
                            >

                                <CustomLoginRadioButton
                                    selected={selected === 'door'}
                                    style={{ ...styles.optionBox }}
                                    onPress={() => setSelected('door')}
                                />
                            </View>
                            <View
                                style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 40 }}
                            >

                                <Image source={doorDelivary} style={{ height: 24, width: 24 }} />
                                <Text style={styles.optionTitle}>Door Delivery</Text>
                                <Text style={styles.optionSub}>Direct to your location</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.optionBox, { backgroundColor: selected === 'pickup' ? '#effde3dc' : '#fff', borderRadius: 8, alignItems: 'center', flexDirection: 'row', marginLeft: 10 }, selected === 'pickup' && styles.selectedBox]} onPress={() => setSelected('pickup')}>

                            <View
                                style={{
                                    top: 8, left: 14, position: 'absolute', flexDirection: 'row', alignItems: 'center',


                                }}
                            >
                                <CustomLoginRadioButton
                                    selected={selected === 'pickup'}
                                    style={styles.optionBox}
                                    onPress={() => setSelected('pickup')}
                                />
                            </View>
                            <View
                                style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 40 }}
                            >
                                <Image source={pickUp} style={{ height: 24, width: 24 }} />
                                <Text style={styles.optionTitle}>Store Pickup</Text>
                                <Text style={styles.optionSub}>Collect from store</Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                    {/* Delivery Address Section */}
                    <Text style={styles.heading}>Select Delivery Method</Text>
                    <TouchableOpacity style={{ ...styles.row, backgroundColor: '#f3f2f2ff' }} onPress={() => setSameAddress(!sameAddress)}>
                        <View style={[styles.customCheckbox, sameAddress && styles.customCheckboxChecked]}>
                            {sameAddress && <Text style={styles.checkmark}>✔</Text>}
                        </View>
                        <Text style={styles.checkboxLabel}>Delivery address same as billing address</Text>
                    </TouchableOpacity>


                    {/* Price Details Section */}
                    <Text style={styles.heading}>Price Details</Text>
                    <View style={styles.priceBox}>
                        <View style={styles.priceRow}>
                            <Text style={styles.label}>Sub Total</Text>
                            <Text style={styles.value}>₹997</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.label}>Discount</Text>
                            <Text style={styles.discount}>- ₹100</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.label}>Delivery Charges</Text>
                            <Text style={styles.value}>₹50</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.priceRow}>
                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalValue}>₹947</Text>
                        </View>
                    </View>

                    <Text style={styles.termsText}>
                        By placing the order, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms and Conditions</Text>
                    </Text>
                </View>

            </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.codButton}>
                        <Text style={styles.codText}>Cash on Delivery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.payButtonWrapper}>
                        <LinearGradient
                            colors={['#1E8153', '#4EA618']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.payButton}>
                            <Text style={styles.payText}>Pay ₹947</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>


        </>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f2f2ff',
        flex: 1,
        paddingBottom: 100
    },
    rightSection: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconWrapper: {
        marginRight: 16,
        position: 'relative',
    },
    redDot: {
        width: 8,
        height: 8,
        position: 'absolute',
        top: -2,
        right: -2,
    },
    icon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
        alignItems: 'center',
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
        flexDirection: 'row',
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
        top: 27,
        marginTop: 4,
        height: 2,
        backgroundColor: '#01AD41',
        width: '100%'
    },
    inactiveTabText: {
        color: '#555',
    },
    warningBox: {
        backgroundColor: '#FFF8BC',
        // borderRadius: 6,
        padding: 10,
        marginBottom: 16,
    },
    warningHeading: {
        fontWeight: 'bold',
        color: '#4E4600',
        marginBottom: 4,
    },
    warningText: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        color: '#4E4600',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 8,
        // marginLeft: 16,
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
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
    heading: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    optionBox: {
        width: '48%',
        // backgroundColor: '#fff',
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedBox: {
        borderColor: '#2E7D32',
    },
    radioCircle: (isSelected) => ({
        height: 14,
        width: 14,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: isSelected ? '#2E7D32' : '#aaa',
        backgroundColor: isSelected ? '#2E7D32' : '#fff',
        marginBottom: 6,
    }),
    optionTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
        marginTop: 10
    },
    optionSub: {
        fontSize: 12,
        color: '#666',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    codBtn: {
        width: '48%',
        borderColor: '#FF6B00',
        borderWidth: 1,
        borderRadius: 6,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    codText: {
        color: '#FF6B00',
        fontWeight: 'bold',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
    },
    customCheckbox: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: '#0f0',
        borderRadius: 4,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    customCheckbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginRight: 10,
    },

    customCheckboxChecked: {
        backgroundColor: '#00B058', // green like the image
        borderColor: '#00B058',
    },

    checkmark: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 18,
    },


    priceBox: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    label: {
        color: '#333',
        fontSize: 14,
    },
    value: {
        fontSize: 14,
        color: '#000',
    },
    discount: {
        color: '#000',
        fontSize: 14,
    },
    divider: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 8,
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
    termsText: {
        fontSize: 12,
        paddingVertical: 20,
        textAlign: 'center',
        color: '#333',
        paddingBottom: 100
    },
    termsLink: {
        color: 'green',
        fontWeight: '500',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    codButton: {
        width: '48%',
        borderWidth: 1,
        borderColor: '#FF6F00',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },

    codText: {
        color: '#FF6F00',
        fontWeight: '600',
        fontSize: 16,
    },

    payButtonWrapper: {
        width: '48%',
    },

    payButton: {
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    payText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },

});
