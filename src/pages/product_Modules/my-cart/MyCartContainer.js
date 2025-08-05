import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, CheckBox, FlatList } from 'react-native';
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
import CustomLoginRadioButton from '../../../components/common/CustomLoginRadioButton';
import doorDelivary from '../../../assets/images/common/transport.png'
import pickUp from '../../../assets/drawer/shop.png'
import LinearGradient from 'react-native-linear-gradient';
import AddressCard from '../../../components/common/AddressCard';
import CustomPopupModal from '../../../components/common/CustomPopupModal';
import { Icon } from '../../../../assets/images';
import CTText from '../../../components/ctText';
import { RFValue } from 'react-native-responsive-fontsize';
import { palette } from '../../../theme/color';
import DeliveryAddress from '../components/AddressInputs';
import checkIcon from '../../../assets/images/common/checkIcon.png'
import { defConfigImageURL } from "../../dashboard_modules/tabs/home/index.service";
import { useSelector } from 'react-redux';
import PriceDetails from './PriceDetails';
import Webview_popup from '../../../components/common/WebViewPopup';
import constants from '../../../config/constants';
import { HEToast } from '../../../components/toast';
import ConfirmationModal from '../../../components/common/ConfirmationModal';


const MyCartContainer = ({
    cartData,
    isLoading,
    onPressGoToAddress,
    appLanguage,
    onPressDelete,
    onPressCheckOut,
    onPressAddQuantity,
    onPressMinusQuantity,
    priceData,
    StoreCodeDetails,
    showDelete,
    setShowDelete,
    onPressConfirmDelete,
    onPressShopNow,
    showNoCode,
    onPressItem,
    handlePress,
    activeTab,
    tabData,
    onPressBook,
    cartFertilizersData,
    priceBookData,
    onPressBookNow,
    onPressBookingSuccess,
    bookingVisible,
    setBookingVisible,
    setPaySuccessVisible,
    paySuccessVisible,
    deliveryType,
    setDeliveryType,
    activeCategory,
    setActiveCategory,
    setActiveTab,
    address,
    setAddress,
    placesRef,
    checkBillAdd,
    setCheckBillAdd,
    checkBillingAddress,
    enablePayment,
    showDeliveryMethodErrro,
    setAllowTerm,
    allowTerm,
    CodVisible,
    setCODVisible,
    setShowDeliveryMethodErrro
}) => {
    const navigation = useNavigation();
    let Card_ArrayData = activeTab.id == 2 ? cartFertilizersData : cartData;

    const count_item = Card_ArrayData.length;
    const [showTerms_Conditions, setShowTerms_Conditions] = useState(false);

    const BannerData = useSelector(state => state.product.bannerData);

    const renderItem = ({ item, index }) => (
        <View style={styles.itemWrapper}>
            <View style={styles.itemCard}>
                <View style={{
                    width: 85,
                    height: 95,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#D9D9D9',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <Image source={{ uri: defConfigImageURL(BannerData.imageBaseURL, item?.slide1) }} style={styles.productImage} resizeMode={'contain'} />

                </View>
                <View style={styles.itemDetails}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                        <Text style={styles.productName}>{item?.nameToShowOnSite}</Text>
                        <TouchableOpacity style={{ position: 'relative' }} onPress={() => setShowDelete({ item: item, visible: true })}>
                            <Image source={bin} style={styles.deleteIcon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.productWeight}>{item.size}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>

                        <View style={styles.quantityRow}>
                            <TouchableOpacity onPress={() => onPressMinusQuantity(item, index)} style={{
                                ...styles.qtyButton,
                                borderColor: item.quantity == 1 ? palette.buttondisabled : '#0A8F43',

                            }}
                                disabled={item.quantity == 1}

                            >
                                <Text style={{
                                    ...styles.qtyText,
                                    color: item.quantity == 1 ? palette.buttondisabled : '#0A8F43',
                                }}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.qtyNumber}>{item?.quantity}</Text>
                            <TouchableOpacity onPress={() => onPressAddQuantity(item, index)} style={{
                                ...styles.qtyButton,
                                borderColor: item?.quantity == item.maxQuantity ? palette.buttondisabled : '#0A8F43',
                            }}
                                disabled={!(item?.inStock === 'true' || item.inStock)}
                            >
                                <Text style={{
                                    ...styles.qtyText,
                                    color: item?.quantity == item.maxQuantity ? palette.buttondisabled : '#0A8F43',
                                }}>+</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.priceSection}>
                            <Text style={styles.price}>₹{item.sellingPrice}</Text>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    );


    return (

        <>
            <View >
                <CustomHeader
                    type="cart"
                    topTitle="My Cart"
                    subtitle=""
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                />
            </View>
            <View style={styles.tabContainer}>
                {/* Non-Fertilizers Tab */}
                <TouchableOpacity
                    onPress={() => setActiveTab(tabData[0])}
                    style={styles.tabButton}
                >
                    <View style={styles.tabInner}>
                        <Text style={[
                            styles.tabText,
                            activeTab.id === 1 && styles.activeTabText
                        ]}>
                            Non-Fertilizers
                        </Text>
                        <View style={[
                            styles.badge,
                            activeTab.id === 1 ? styles.badgeActive : styles.badgeInactive
                        ]}>
                            <Text style={styles.badgeText}>{cartData.length}</Text>
                        </View>
                    </View>
                    {activeTab.id === 1 && <View style={styles.greenUnderline} />}
                </TouchableOpacity>

                {/* Fertilizers Tab */}
                <TouchableOpacity
                    onPress={() => setActiveTab(tabData[1])}
                    style={styles.tabButton}
                >
                    <View style={styles.tabInner}>
                        <Text style={[
                            styles.tabText,
                            activeTab.id === 2 && styles.activeTabText
                        ]}>
                            Fertilizers
                        </Text>
                        <View style={[
                            styles.badge,
                            activeTab.id === 2 ? styles.badgeActive : styles.badgeInactive
                        ]}>
                            <Text style={styles.badgeText}>{cartFertilizersData.length}</Text>
                        </View>
                    </View>
                    {activeTab.id === 2 && <View style={styles.greenUnderline} />}
                </TouchableOpacity>
            </View>

            <FlatList
                data={[{}]}
                renderItem={() => (
                    <View nestedScrollEnabled={true} style={{ flex: 1 }}>
                        {/* Warning Box + Product List */}
                        <View style={styles.container}>
                            <View style={styles.warningBox}>
                                <Text style={styles.warningHeading}>Seperate Order Required</Text>
                                <Text style={styles.warningText}>
                                    Please place separate orders for Fertilizers and Non-Fertilizers. Switch categories using the buttons above.
                                </Text>
                            </View>

                            <View style={{ paddingHorizontal: 10 }}>
                                {/* Cart Items List */}
                                {count_item > 0 && <>
                                    <Text style={styles.sectionTitle}>{count_item || 0} Items</Text>
                                    <View style={{ height: 'auto', backgroundColor: "#fff", borderRadius: 8 }}>
                                        <FlatList
                                            data={Card_ArrayData || []}
                                            renderItem={renderItem}
                                            keyExtractor={(item, index) => index.toString()}
                                            showsVerticalScrollIndicator={false}
                                            scrollEnabled={true}
                                        />
                                    </View>
                                </>}

                                {/* Billing Address */}
                                <Text style={styles.sectionTitle}>Billing Address</Text>

                                <AddressCard title={appLanguage?.billing_address ?? 'Billing Address'} />

                                {/* Delivery Method */}
                                <Text style={{ paddingVertical: 15, fontWeight: 600, fontSize: 16 }}>Select Delivery Method</Text>
                                {deliveryType == "" && showDeliveryMethodErrro && <Text style={{ color: '#F52F2F', paddingBottom: 10 }}> Please select one option to proceed </Text>}
                                <View style={{ ...styles.row, borderWidth: deliveryType == "" && showDeliveryMethodErrro ? 0.5 : 0, borderColor: deliveryType == "" && showDeliveryMethodErrro ? '#F52F2F' : '' }}>
                                    {/* Door Delivery */}
                                    <TouchableOpacity
                                        style={[
                                            styles.optionBox,
                                            {
                                                backgroundColor: deliveryType === 1 ? '#effde3dc' : '#fff',
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            },
                                            deliveryType === 1 && styles.selectedBox
                                        ]}
                                        onPress={() => setDeliveryType(1)}
                                    >
                                        <View
                                            style={{
                                                top: 8, left: 14, position: 'absolute', flexDirection: 'row', alignItems: 'center',
                                            }}
                                        >
                                            <CustomLoginRadioButton
                                                selected={deliveryType === 1}
                                                style={{ ...styles.optionBox }}
                                                onPress={() => setDeliveryType(1)}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 40 }}>
                                            <Image source={doorDelivary} style={{ height: 24, width: 24 }} />
                                            <Text style={styles.optionTitle}>Door Delivery</Text>
                                            <Text style={styles.optionSub}>Direct to your location</Text>
                                        </View>
                                    </TouchableOpacity>

                                    {/* Store Pickup */}
                                    <TouchableOpacity
                                        style={[
                                            styles.optionBox,
                                            {
                                                backgroundColor: deliveryType === 2 ? '#effde3dc' : '#fff',
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                marginLeft: 10
                                            },
                                            deliveryType === 2 && styles.selectedBox
                                        ]}
                                        onPress={() => setDeliveryType(2)}
                                    >
                                        <View
                                            style={{
                                                top: 8, left: 14, position: 'absolute', flexDirection: 'row', alignItems: 'center',
                                            }}
                                        >
                                            <CustomLoginRadioButton
                                                selected={deliveryType === 2}
                                                style={styles.optionBox}
                                                onPress={() => setDeliveryType(2)}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 40 }}>
                                            <Image source={pickUp} style={{ height: 24, width: 24 }} />
                                            <Text style={styles.optionTitle}>Store Pickup</Text>
                                            <Text style={styles.optionSub}>Collect from store</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {/* Delivery Address Checkbox */}

                                <Text style={{ paddingVertical: 10, fontWeight: 600, fontSize: 16 }}>Delivery Address</Text>


                                <TouchableOpacity
                                    style={{ ...styles.row, marginBottom: 0, backgroundColor: '#f3f2f2ff' }}
                                    onPress={() => { checkBillingAddress(), setCheckBillAdd(!checkBillAdd) }}
                                >
                                    <View style={[styles.customCheckbox, checkBillAdd && styles.customCheckboxChecked]}>
                                        <Image
                                            source={checkIcon}
                                            style={{ width: 15, height: 15, tintColor: '#fff' }}
                                            resizeMode='contain'
                                        />
                                    </View>
                                    <Text style={styles.checkboxLabel}>Delivery address same as billing address</Text>
                                </TouchableOpacity>

                                {!checkBillAdd && <DeliveryAddress address={address} setAddress={setAddress} placesRef={placesRef} />}

                                <View style={{ marginTop: 10 }}>
                                    <AddressCard cardType="StoreType" />
                                </View>

                                {/* Price Details */}
                                <Text style={styles.heading}>Price Details</Text>
                                <PriceDetails priceData={priceData} styles={styles} />


                                <View style={{
                                    flexDirection: 'row', alignItems: 'center',
                                    paddingBottom: 100, paddingVertical: 10, justifyContent: 'center'
                                }}>
                                    <TouchableOpacity
                                        onPress={() => setAllowTerm(!allowTerm)}
                                        style={[styles.customCheckbox, allowTerm && styles.customCheckboxChecked]}>
                                        <Image
                                            source={checkIcon}
                                            style={{ width: 15, height: 15, tintColor: '#fff' }}
                                            resizeMode='contain'
                                        />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.termsText}>  By placing the order, you agree to our{' '}  </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowTerms_Conditions(true);
                                            }}
                                        >
                                            <Text style={styles.termsLink}>Terms and Conditions</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>


                    </View>
                )}
            />


            <CustomPopupModal
                visible={showDelete?.visible}
                icon={Icon.warning}
                isRed={true}
                title={appLanguage?.warning ?? 'Warning!'}
                buttonText={appLanguage?.yes ?? 'Yes'}
                button2Text={appLanguage?.no ?? 'No'}
                onPressButton2={() => {
                    setShowDelete({ visible: false, item: null });
                }}
                BottomPopupStatus={true}
                onPressDone={() => {
                    onPressDelete();
                }}>
                <CTText
                    text={
                        appLanguage?.delete_confirmation ??
                        'Are you sure, do you want to delete this item?'
                    }
                    fontSize={RFValue(12)}
                    semiBold
                    textColor={palette.grey}
                    style={{ textAlign: 'center' }}
                />
            </CustomPopupModal>


            {/* <CustomPopupModal
                visible={CodVisible ?? false}
                icon={Icon.warning}
                isRed={true}
                title={appLanguage?.lblConfirmation ?? 'Confirmation!'}
                buttonText={appLanguage?.lblProceed ?? 'Proceed'}
                button2Text={appLanguage?.cancel ?? 'Cancel'}
                isHiddenCrossIcon={true}
                onPressDone={() => onPressCheckOut('COD')}
                onPressClose={() => {
                    setCODVisible(false);
                }}
                onPressButton2={() => {
                    setCODVisible(false);
                }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <CTText
                        text={
                            appLanguage?.lblContinuethispayment ??
                            'Are you sure you want to continue this payment?'
                        }
                        medium
                        style={{ textAlign: 'center' }}
                    />
                </View>
            </CustomPopupModal> */}

            <ConfirmationModal
                visible={CodVisible ?? false}
                title="Confirm"
                subtitle="Are you sure you want to continue this payment?"
                onCancel={() => setCODVisible(false)}
                onConfirm={() => { onPressCheckOut('COD') }}
                position="center"
            />


            <Webview_popup
                isPopupHidden={false}
                popupTitle={appLanguage?.terms ?? 'Terms and Conditions'}
                popupVisible={showTerms_Conditions}
                onPressClose={() => {
                    setShowTerms_Conditions(false);
                }}
                WebViewURL={constants.termsAndCondition}
            />

            <View style={styles.bottomContainer}>
                <View style={styles.footer}>
                    {activeTab.id === 1 ? <>
                        <TouchableOpacity style={{
                            ...styles.codButton,
                            borderColor: enablePayment ? '#FF6F00' : palette.disabled_Button,

                        }}
                            disabled={!enablePayment}
                        >
                            <Text style={{
                                ...styles.codText,
                                color: enablePayment ? '#FF6F00' : palette.disabled_Button,

                            }}>Cash on Delivery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.payButtonWrapper}
                            disabled={!enablePayment}
                            onPress={() => {
                                if (!allowTerm) {
                                    HEToast("Please allow Term and conditions")
                                    return
                                }

                                if (deliveryType == "") {
                                    setShowDeliveryMethodErrro(true)
                                    return
                                } else {
                                    setCODVisible(true)
                                }
                            }}
                        >
                            <LinearGradient
                                colors={[enablePayment ? '#1E8153' : palette.disabled_Button, enablePayment ? '#4EA618' : palette.disabled_Button]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.payButton}
                            >
                                <Text style={styles.payText}>Pay ₹{priceData.totalCost}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </>
                        : <TouchableOpacity style={styles.payButtonBooking}
                            disabled={!enablePayment}
                            onPress={() => {

                                if (deliveryType == "") {
                                    setShowDeliveryMethodErrro(true)
                                    return
                                } else {
                                    onPressCheckOut('Booking')
                                }
                            }}

                        >
                            <LinearGradient
                                colors={[enablePayment ? '#1E8153' : palette.disabled_Button, enablePayment ? '#4EA618' : palette.disabled_Button]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.payButton}
                            >
                                <Text style={styles.payText}>Book Now </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </>



    );
};

export default MyCartContainer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f2f2ff',
        flex: 1,
        paddingBottom: 10
    },

    redDot: {
        width: 8,
        height: 8,
        position: 'absolute',
        top: -2,
        right: -2,
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

    tabContainer: {
        flexDirection: 'row',
        paddingVertical: 18,
        backgroundColor: '#fbfffcff'
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
        top: 33,
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
        padding: 10,
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
        fontSize: 16,
        fontWeight: 700,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 8,
        paddingVertical: 10
    },

    itemWrapper: {
        backgroundColor: '#fff',
        borderRadius: 8,
    },

    itemCard: {
        borderBottomWidth: 1,
        borderColor: '#A3D2B5',
        // paddingBottom: 15,
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10
    },
    productImage: {
        width: 80,
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
        paddingVertical: 10
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginLeft: 10
    },
    qtyButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
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
        borderWidth: 1,
        width: 45,
        borderWidth: 1,
        paddingVertical: 4,
        borderColor: '#0A8F43',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    priceSection: {
        alignItems: 'flex-end',
    },
    deleteIcon: {
        width: 18,
        height: 18,
        marginBottom: 4,
        marginRight: -15,
        marginTop: -10
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
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

    heading: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10,
        paddingVertical: 10
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
        alignItems: 'center',
        fontSize: 12,
        // paddingVertical: 20,
        textAlign: 'center',
        color: '#333',
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
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },

    codText: {
        fontWeight: '600',
        fontSize: 16,
    },

    payButtonWrapper: {
        width: '48%',
    },
    payButtonBooking: {
        width: '98%',
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
