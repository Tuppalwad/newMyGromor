import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { Dropdown } from './AddressDropdown';
import SearchIcon from '../../../assets/images/common/searchIcon.png';
import locationPin from '../../../assets/images/common/locationPin.png';

const DeliveryAddress = ({ address, setAddress }) => {
    const [errors, setErrors] = useState({});

    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune'];
    const states = ['Maharashtra', 'Delhi', 'Karnataka'];

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
            default:
                break;
        }

        setErrors(prev => ({ ...prev, [key]: errorMsg }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.searchInputContainer}>
                <Image source={SearchIcon} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Location or Area"
                    value={address.location}
                    onChangeText={(text) => handleChange('location', text)}
                    placeholderTextColor="#878787"
                />
            </View>
            {errors.location ? <Text style={styles.errorText}>{errors.location}</Text> : null}

            <TouchableOpacity style={styles.selectLocationButton}>
                <Image source={locationPin} style={styles.locationPin} />
                <Text style={styles.selectLocationText}> Select Location</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Address Line 1</Text>
            <TextInput
                style={styles.input}
                placeholder="Address Line 1"
                value={address.address1}
                onChangeText={(text) => handleChange('address1', text)}
                placeholderTextColor={'#878787'}
            />
            {errors.address1 ? <Text style={styles.errorText}>{errors.address1}</Text> : null}

            <Text style={styles.label}>Address Line 2</Text>
            <TextInput
                style={styles.input}
                placeholder="Address Line 2"
                value={address.address2}
                onChangeText={(text) => handleChange('address2', text)}
                placeholderTextColor={'#878787'}
            />
            {/* Optional field — No error message */}

            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                    <Dropdown
                        label="City"
                        options={cities}
                        selectedValue={address.city}
                        onSelect={(value) => handleChange('city', value)}
                    />
                    {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                    <Dropdown
                        label="State"
                        options={states}
                        selectedValue={address.state}
                        onSelect={(value) => handleChange('state', value)}
                    />
                    {errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}
                </View>
            </View>

            <Text style={styles.label}>Pin Code</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Pincode"
                value={address.pincode}
                onChangeText={(text) => handleChange('pincode', text)}
                keyboardType="numeric"
                placeholderTextColor={'#878787'}
            />
            {errors.pincode ? <Text style={styles.errorText}>{errors.pincode}</Text> : null}
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
        backgroundColor: '#EAF9F1',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#D9D9D9',
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
