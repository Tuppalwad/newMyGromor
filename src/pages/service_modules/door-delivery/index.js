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

const DoorDeliveryComponent = () => {
    const [sameAddress, setSameAddress] = useState(true);

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

        <SafeAreaView style={styles.container}>




            {/* Header */}
            <View >
                <CustomHeader
                    type="door delivery"
                    topTitle="door delivery"
                    showLocation={true}
                    subtitle={true}
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                />
            </View>
            <ScrollView style={{ paddingHorizontal: 16 }} >
                {/* Billing Address */}
                <Text style={styles.sectionTitle}>Billing Address</Text>
                <View style={styles.card}>
                    <Text style={styles.boldText}>Siddharth Chhajer</Text>
                    <Text style={styles.lightText}>
                        Plot no. 2-4-197/A, Cinema Road, Below Margadarsi Office, Adilabad, Begumpet Telangana, 504001
                    </Text>
                    <Text style={styles.lightText}>+91 9999912345</Text>
                </View>

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

                {/* Store Address */}
                {/* <Text style={styles.sectionTitle}>Store Address</Text>
                <View style={styles.card}>
                    <View style={styles.storeCodeBox}> */}
                {/* <Ionicons name="storefront-outline" size={14} color="green" /> */}
                {/* <Text style={styles.storeCode}> Store Code: <Text style={{ color: '#007A46', fontWeight: '600' }}>S0393</Text></Text>
                    </View> */}
                {/* <View style={styles.addressRow}> */}
                {/* <Ionicons name="location-outline" size={14} color="gray" /> */}
                {/* <Text style={styles.lightText}>
                            Mana Gromor Centre A.kondapuram{"\n"}
                            Coromandel International Ltd,{"\n"}
                            c/o Mana Gromor Center, Building No. 110/1,{"\n"}
                            A.kondapuram, Putlur Mandal, Anantapur
                        </Text>
                    </View> */}
                {/* <View style={styles.addressRow}>
                        {/* <Ionicons name="call-outline" size={14} color="gray" /> */}
                {/* <Text style={styles.lightText}>+91 8978780010</Text>
                    </View> */}
                {/* </View>  */}

                {/* Price Details & Button */}
                <Text style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>Price Details</Text>
                <View style={styles.totalAmountBox}>
                    <Text style={styles.totalAmount}>Total Amount</Text>
                    <Text style={styles.totalAmount}>₹50</Text>
                </View>

                <Text style={styles.footerText}>
                    By placing the order, you agree to our <Text style={{ color: '#1AC46D' }}>Terms and Conditions</Text>
                </Text>

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
        </SafeAreaView>
    );
};

export default DoorDeliveryComponent;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 12,
        backgroundColor: '#f3f2f2ff'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12
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
    bottomContainer: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        // backgroundColor: '#fff',
        // paddingVertical: 12,
        // paddingHorizontal: 16,
        // borderTopWidth: 1,
        // borderTopColor: '#fff',
        // justifyContent: 'center',
        // alignItems: 'center'
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

