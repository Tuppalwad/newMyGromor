import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { Dropdown } from './AddressDropdown';
import locationPin from '../../../assets/images/common/locationPin.png';
import { palette } from '../../../theme/color';
import { UserManager } from '../../../storage';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../../router/screen';
import OSMAddressSearch from './OSMAddressSearch';
import LocationIcon from '../../../assets/images/common/locationGreen.png'
const DeliveryAddress = ({ address, setAddress, saveAddress, setShowMap }) => {
    const [errors, setErrors] = useState({});
    const appLanguages = UserManager?.getAppMultiLanguage;
    const navigation = useNavigation();
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune'];
    const states = ['Maharashtra', 'Delhi', 'Karnataka'];
    const [results, setResults] = useState([]);

    const handleChange = (key, value) => {
        setAddress(prev => ({ ...prev, [key]: value }));
        validateField(key, value);
    };

    const validateField = (key, value) => {
        let errorMsg = '';
        switch (key) {
            case 'location':
            case 'address1':
            case 'city':
            case 'state':
                if (!value || value.trim() === '') {
                    errorMsg = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
                }
                break;
            case 'pincode':
                if (!/^\d{6}$/.test(value)) {
                    errorMsg = 'Pin Code must be 6 digits.';
                }
                break;
        }
        setErrors(prev => ({ ...prev, [key]: errorMsg }));
    };

    useEffect(() => {
        if (address.pincode.length == 6) {
            saveAddress(address.address1 + address.address2 + address.city + address.state + address.pincode)
        }
    }, [address.pincode])

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>Location</Text>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                    setResults([]);
                }}
            >
                <OSMAddressSearch
                    setResults={setResults}
                    results={results}
                    onSelectAddress={(address) => {
                        const addressLines = address.fullAddress.split(',');
                        setAddress(prev => ({
                            ...prev,
                            location: address.fullAddress || "",
                            address1: addressLines[0]?.trim() || '',
                            address2: addressLines.slice(1, 3).join(', ').trim(),
                            city: address.city,
                            state: address.state,
                            pincode: address.pincode,
                            latitude: address.lat,
                            longitude: address.lon
                        }));

                    }}
                />
            </TouchableWithoutFeedback>
            {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

            {/* Rest of your component remains the same */}
            <TouchableOpacity
                style={styles.selectLocationButton}
                onPress={() => setShowMap(true)}
            >
                <Image source={locationPin} style={styles.locationPin} />
                <Text style={styles.selectLocationText}>{appLanguages.select_location ?? "Select Location"}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>{appLanguages.address_line_1 ?? "Address Line 1"}</Text>
            <TextInput
                style={styles.input}
                placeholder="Address Line 1"
                value={address.address1}
                onChangeText={(text) => handleChange('address1', text)}
                placeholderTextColor="#878787"
            />
            {errors.address1 ? <Text style={styles.errorText}>{errors.address1}</Text> : null}

            <Text style={styles.label}>{appLanguages.address_line_2 ?? "Address Line 2"}</Text>
            <TextInput
                style={styles.input}
                placeholder="Address Line 2"
                value={address.address2}
                onChangeText={(text) => handleChange('address2', text)}
                placeholderTextColor="#878787"
            />

            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                    {/* <Dropdown
                        label="City"
                        options={cities}
                        selectedValue={address.city}
                        onSelect={(value) => handleChange('city', value)}
                    /> */}
                    <Text style={styles.label}>{appLanguages.city ?? "City"}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder={appLanguages.city ?? "City"}
                        value={address.city}
                        onChangeText={(text) => handleChange('city', text)}
                        placeholderTextColor="#878787"
                    />
                    {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                    {/* <Dropdown
                        label="State"
                        options={states}
                        selectedValue={address.state}
                        onSelect={(value) => handleChange('state', value)}
                    /> */}
                    <Text style={styles.label}>{appLanguages.state ?? "State"}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder={appLanguages.state ?? "State"}
                        value={address.state}
                        onChangeText={(text) => handleChange('state', text)}
                        placeholderTextColor="#878787"
                    />
                    {errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}
                </View>
            </View>

            <Text style={styles.label}>{appLanguages.pincode ?? "Pin Code"}</Text>
            <TextInput
                style={styles.input}
                placeholder={appLanguages.pincode_placeholder ?? "Enter Pincode"}
                value={address.pincode}
                onChangeText={(text) => handleChange('pincode', text)}
                keyboardType="numeric"
                placeholderTextColor="#878787"
            />
            {errors.pincode ? <Text style={styles.errorText}>{errors.pincode}</Text> : null}
            {
                // (!enablePayment || (!address.address1 || !address.city || !address.state || !address.pincode)) &&

                // <TouchableOpacity
                //     style={{
                //         ...styles.selectLocationButton,
                //         backgroundColor:
                //             address.address1 && address.city && address.state && address.pincode
                //                 ? '#F2F8F4'
                //                 : '#f0f0f0',
                //         marginTop: 10,
                //     }}
                //     onPress={() => {
                //         saveAddress(address.address1 + address.address2 + address.city + address.state + address.pincode)
                //     }}
                //     disabled={!address.address1 || !address.city || !address.state || !address.pincode}
                // >

                //     <Image source={LocationIcon} style={{
                //         ...styles.locationPin,
                //         tintColor: address.address1 && address.city && address.state && address.pincode
                //             ? '#1C8A4B'
                //             : '#a0a0a0',
                //     }} />

                //     <Text
                //         style={{
                //             ...styles.selectLocationText,
                //             color:
                //                 address.address1 && address.city && address.state && address.pincode
                //                     ? '#1C8A4B'
                //                     : '#a0a0a0',
                //         }}
                //     >
                //         Use this address
                //     </Text>
                // </TouchableOpacity>
            }

        </ScrollView>
    );
};




const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '500',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 6,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    searchIcon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginRight: 8,
        tintColor: '#01AD41',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 6,
        padding: 12,
        marginBottom: 8,
    },
    selectLocationButton: {
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        backgroundColor: '#F2F8F4',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#A3D2B5',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    locationPin: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        paddingRight: 10,
    },
    selectLocationText: {
        paddingLeft: 4,
        color: '#009966',
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
        marginLeft: 4,
    },
});

export default DeliveryAddress;
