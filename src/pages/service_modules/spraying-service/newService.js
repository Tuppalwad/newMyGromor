import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, CheckBox } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import sprayingDron from '../../../assets/images/common/sprayingDron.png'
import CustomHeader from '../../../components/common/CustomHeader';
import AddressCard from '../../../components/common/AddressCard';
import DeliveryAddress from '../../product_modules/components/AddressInputs';
import LinearGradient from 'react-native-linear-gradient';
import checkIcon from '../../../assets/images/common/checkIcon.png'
import SuccessScreen from '../../product_modules/components/SuccessScreen';
import { useNavigation } from '@react-navigation/native';
const NewServiceRequestScreen = () => {
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
    const placesRef = useRef();
    const [isChecked, setIsChecked] = useState(false);
    const toggleCheckbox = () => setIsChecked(!isChecked);
    const [farmAccessible, setFarmAccessible] = useState('Yes');
    const [highVoltageLines, setHighVoltageLines] = useState('Yes');
    const navigation = useNavigation()

    return (
        <>

            {/* Header */}
            <View>
                <CustomHeader
                    type="services"
                    topTitle="New Service Request"
                    subtitle=""
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                    style={styles.header}
                />
            </View>
            <ScrollView style={styles.container}>
                {/* Image */}
                <Image
                    source={sprayingDron} // replace with actual path
                    style={styles.droneImage}
                />
                <View style={{ paddingVertical: 16 }}>
                    {/* Alert Text */}
                    <Text style={styles.alertText}>*All fields are required</Text>

                    {/* Form Container */}
                    <Text style={styles.sectionTitle}>Crop Details</Text>
                    <View style={styles.formBox}>

                        {/* Crop Dropdown */}
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Crop</Text>
                            <View style={styles.dropdown}>
                                <Text style={styles.placeholder}>Select Crop</Text>
                                {/* <Icon name="chevron-down" size={20} color="#666" /> */}
                            </View>
                        </View>

                        {/* Coverage Area & Farm Land */}
                        <View style={styles.row}>
                            <View style={styles.inputHalf}>
                                <Text style={styles.label}>Coverage Area</Text>
                                <View style={styles.unitInput}>
                                    <TextInput style={styles.input} keyboardType="numeric" placeholder="0" />
                                    <Text style={styles.unit}>acre</Text>
                                </View>
                            </View>
                            <View style={styles.inputHalf}>
                                <Text style={styles.label}>Farm Land</Text>
                                <View style={styles.unitInput}>
                                    <TextInput style={styles.input} keyboardType="numeric" placeholder="0" />
                                    <Text style={styles.unit}>acre</Text>
                                </View>
                            </View>
                        </View>

                        {/* Date & Time */}
                        <View style={styles.row}>
                            <View style={styles.inputHalf}>
                                <Text style={styles.label}>Schedule Date</Text>
                                <TouchableOpacity style={styles.dropdown}>
                                    <Text style={styles.placeholder}>Select Date</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputHalf}>
                                <Text style={styles.label}>Select Time</Text>
                                <TouchableOpacity style={styles.dropdown}>
                                    <Text style={styles.placeholder}>Select Time</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Remarks */}
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>
                                Remarks <Text style={{ color: 'red', fontWeight: 30 }}>(optional)</Text>
                            </Text>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter your Remarks"
                                placeholderTextColor="#999"
                                multiline
                            />
                        </View>
                    </View>

                    {/* Farmer Details Title */}
                    <Text style={styles.sectionTitle}>Farmer Details</Text>
                    <View style={styles.formBox}>
                        {/* Number of Farmer(s) */}
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Number of Farmer(s)</Text>
                            <TouchableOpacity style={styles.dropdown}>
                                <Text style={styles.placeholder}>Select</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Alternate Contact */}
                        <View style={styles.inputBox}>

                            <Text style={styles.label}>Alternate Contact</Text>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter Alternate Contact"
                                placeholderTextColor="#999"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* farmer address */}
                    <Text style={styles.sectionTitle}>Farm Address</Text>
                    <DeliveryAddress address={address} setAddress={setAddress} placesRef={placesRef} style={{ fontSize: 14, fontWeight: 600, color: '#4E4E4E', }} />

                    {/* FAQ */}
                    <Text style={styles.sectionTitle}>FAQ Quations <Text style={{ color: 'red', fontWeight: 30 }}>(optional)</Text></Text>
                    <View style={styles.radioCard}>

                        {/* Question 1 */}
                        <Text style={styles.radioLabel}>Farm Accessible by four-wheeler</Text>
                        <View style={styles.radioGroup}>
                            {['Yes', 'No'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={styles.radioOption}
                                    onPress={() => setFarmAccessible(option)}
                                >
                                    <View style={farmAccessible === option ? styles.radioCircleSelected : styles.radioCircle} />
                                    <Text style={styles.radioText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Question 2 */}
                        <Text style={styles.radioLabel}>High-voltage lines on farmland</Text>
                        <View style={styles.radioGroup}>
                            {['Yes', 'No'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={styles.radioOption}
                                    onPress={() => setHighVoltageLines(option)}
                                >
                                    <View style={highVoltageLines === option ? styles.radioCircleSelected : styles.radioCircle} />
                                    <Text style={styles.radioText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                    </View>
                    {/* store address */}
                    <Text style={styles.sectionTitle}>Store Address</Text>
                    <View >
                        <AddressCard cardType="StoreType" />
                    </View>

                    <View style={styles.priceCard}>
                        <Text style={styles.sectionTitle}>Price Details</Text>

                        <View style={styles.priceBox}>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>Price Per Acre</Text>
                                <Text style={styles.value}>₹2,999</Text>
                            </View>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>Discount</Text>
                                <Text style={styles.value}>- ₹100</Text>
                            </View>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>Total Discount</Text>
                                <Text style={styles.value}>- ₹100</Text>
                            </View>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>Estimated Charges</Text>
                                <Text style={styles.value}>0</Text>
                            </View>

                            <View style={{ height: 1, backgroundColor: '#DFDFDF', marginVertical: 8 }} />

                            {/* <View style={styles.divider} /> */}

                            <View style={styles.priceRow}>
                                <Text style={styles.totalLabel}>Total Amount</Text>
                                <Text style={styles.totalValue}>₹2899</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* Terms & Submit */}
            <View style={{ backgroundColor: '#fff' }}>
                <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
                    <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
                        {isChecked && (
                            <Image
                                source={checkIcon}
                                style={styles.checkIcon}
                                resizeMode="contain"
                            />
                        )}
                    </View>
                    <Text style={styles.agreeText}>
                        I agree to the <Text style={styles.termsText}>Terms and Conditions</Text>
                    </Text>
                </TouchableOpacity>
                {/* submit button */}
                <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate(SuccessScreen)}>
                    <LinearGradient
                        colors={['#1E8153', '#4EA618']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.payButton}
                    >
                        <Text style={styles.submitText}>Submit</Text>

                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default NewServiceRequestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        // paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 12,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    cartIcon: {
        marginLeft: 10,
    },
    droneImage: {
        width: '100%',
        height: 160,
        borderRadius: 10,
        resizeMode: 'cover',
        marginBottom: 8,
    },
    alertText: {
        color: 'red',
        fontSize: 12,
        // marginBottom: 10,
        marginTop: 15
    },
    formBox: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 700,
        marginBottom: 10,
        marginTop: 25
    },
    inputBox: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: 600,
        color: '#4E4E4E',
        marginBottom: 4,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeholder: {
        color: '#9CA3AF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 16,
    },
    inputHalf: {
        flex: 1,
    },
    unitInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        paddingHorizontal: 10,
        height: 40,
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
    },
    unit: {
        color: '#6B7280',
        fontSize: 14,
    },
    TextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        paddingHorizontal: 10,
        height: 40,
    },
    // termsContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     backgroundColor: '#fff',
    //     padding: 12,
    //     borderRadius: 10,
    //     // marginBottom: 20,
    // },
    // termsText: {
    //     marginLeft: 10,
    //     fontSize: 13,
    //     color: '#111827',
    // },
    // link: {
    //     color: '#10B981',
    //     fontWeight: 'bold',
    // },
    // submitButton: {
    //     backgroundColor: '#22C55E',
    //     paddingVertical: 14,
    //     borderRadius: 8,
    //     alignItems: 'center',
    //     marginBottom: 30,
    // },
    // submitText: {
    //     color: '#fff',
    //     fontWeight: 'bold',
    //     fontSize: 15,
    // },
    radioCard: {
        backgroundColor: '#ffffffff',
        borderRadius: 10,
        padding: 16,
        // marginBottom: 20,
        // marginTop: 10
    },
    radioLabel: {
        fontSize: 14,
        fontWeight: 600,
        color: '#000',
        marginBottom: 10
    },
    radioGroup: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 12,
    },

    radioOption: {
        fontSize: 14,
        fontWeight: 600,
        flexDirection: 'row',
        alignItems: 'center',
    },

    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 8,
    },

    radioCircleSelected: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 6,
        borderColor: 'green', // or '#4EA618'
        marginRight: 8,
    },

    radioText: {
        fontSize: 16,
    },
    priceCard: {
        borderRadius: 8,
        marginBottom: 10,
    },
    priceHeading: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 10,
    },
    priceBox: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    priceLabel: {
        fontSize: 14,
        fontWeight: 400,
        color: '#4E4E4E',
    },
    value: {
        fontSize: 14,
        color: '#000',
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
    },
    totalValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 20,
        marginLeft: 20,
        paddingTop: 10
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkedBox: {
        backgroundColor: '#00A651', // Green when checked
        borderColor: '#00A651',
    },
    checkIcon: {
        width: 12,
        height: 12,
        tintColor: '#fff', // only works if the image is a single-color PNG or SVG
    },
    agreeText: {
        fontSize: 16,
        color: '#000',
    },
    termsText: {
        color: '#00A651',
        fontWeight: '600',
    },
    submitButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    payButton: {
        width: '90%',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});
