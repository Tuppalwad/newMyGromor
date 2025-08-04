import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, SafeAreaView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from '../../../components/common/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import checkIcon from '../../../assets/images/common/checkIcon.png'
import AddressCard from '../../../components/common/AddressCard';
import DeliveryAddress from '../../product_modules/components/AddressInputs';
import LinearGradient from 'react-native-linear-gradient';
import Webview_popup from '../../../components/common/WebViewPopup';
import { UserManager } from '../../../storage';
import constants from '../../../config/constants';

const DoorDeliveryComponent = ({ navigation }) => {
    const [sameAddress, setSameAddress] = useState(true);
    const appLanguage = UserManager?.getAppMultiLanguage;
    const [allowTerm, setAllowTerm] = useState(false)
    const [showTerms_Conditions, setShowTerms_Conditions] = useState(false);
    const [address, setAddress] = useState({
        location: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        pincode: '',
        latitude: '',
        longitude: ""
    });
    return (

        <SafeAreaView style={{ flex: 1 }}>

            {/* Header */}
            <View style={{ marginTop: 30, }}>
                <CustomHeader
                    type="door delivery"
                    topTitle="Door Delivery"
                    showLocation={true}
                    subtitle={true}
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                />
            </View>

            <ScrollView style={styles.container} >

                <Text style={styles.sectionTitle}>Billing Address</Text>
                <AddressCard />

                {/* Delivery Address */}
                <Text style={styles.sectionTitle}>Delivery Address</Text>

                <TouchableOpacity
                    style={{ ...styles.row, marginBottom: 0, }}
                    onPress={() => setSameAddress(!sameAddress)}
                >
                    <View style={[styles.customCheckbox, sameAddress && styles.customCheckboxChecked]}>
                        {/* {sameAddress && <Text style={styles.checkmark}>✔</Text>} */}
                        <Image
                            source={checkIcon}
                            style={{ width: 15, height: 15, tintColor: '#fff' }}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={styles.checkboxLabel}>Delivery address same as billing address</Text>
                </TouchableOpacity>

                {!sameAddress && <DeliveryAddress address={address} setAddre={setAddress} />}
                <Text style={styles.sectionTitle}>Store Address</Text>

                <View style={{ marginTop: 10 }}>
                    <AddressCard cardType="StoreType" />
                </View>

                {/* Price Details & Button */}
                <Text style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>Price Details</Text>
                <View style={styles.totalAmountBox}>
                    <Text style={styles.totalAmount}>Total Amount</Text>
                    <Text style={styles.totalAmount}>₹50</Text>
                </View>

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

            </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.placeOrderButton}>
                        <LinearGradient
                            colors={['#1E8153', '#4EA618']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.payButton}
                        >
                            <Text style={styles.payText} >Place Order</Text>
                            {/* <Text >Pay ₹{priceData.totalCost}</Text> */}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
            <Webview_popup
                isPopupHidden={false}
                popupTitle={appLanguage?.terms ?? 'Terms and Conditions'}
                popupVisible={showTerms_Conditions}
                onPressClose={() => {
                    setShowTerms_Conditions(false);
                }}
                WebViewURL={constants.termsAndCondition}
            />
        </SafeAreaView>
    );
};

export default DoorDeliveryComponent;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#f3f2f2ff'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginBottom: 12
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600'
    },
    iconGroup: {
        flexDirection: 'row',
        gap: 12
    },
    icon: {
        marginRight: 8
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 6
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        elevation: 1,
    },
    boldText: {
        fontWeight: '600',
        fontSize: 14,
        marginBottom: 4
    },
    lightText: {
        fontSize: 13,
        color: '#555',
        lineHeight: 18
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#fff',
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

    storeCodeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    storeCode: {
        fontSize: 12,
        marginLeft: 4
    },

    addressRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 6,
        marginTop: 8
    },

    buttonContainer: {
        padding: 14,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600'
    },

    totalAmountBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 6,
        marginTop: 12
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: '600'
    },

    footerText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#555',
        marginTop: 16,
        fontWeight: 600,
        marginBottom: 30,
        paddingBottom: 50
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeOrderButton: {
        width: '100%',
    },

    payButton: {
        // borderRadius: 8,
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

