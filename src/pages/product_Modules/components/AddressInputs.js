import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Dropdown } from './AddressDropdown';
import SearchIcon from '../../../assets/images/common/searchIcon.png';
import locationPin from '../../../assets/images/common/locationPin.png';
import { RFValue } from 'react-native-responsive-fontsize';
import { palette } from '../../../theme/color';
import { width } from '../../../config/resposiveSize';
import { UserManager } from '../../../storage';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../../router/screen';


const DeliveryAddress = ({ address, setAddress, placesRef }) => {
    const [errors, setErrors] = useState({});
    const appLanguage = UserManager?.getAppMultiLanguage;
    const appLanguages = useSelector(state => state.user.appMultiLanguage);

    const navigation = useNavigation();
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
        }
        setErrors(prev => ({ ...prev, [key]: errorMsg }));
    };

    const handlePlaceSelect = (details) => {
        if (!details?.address_components) return;

        const components = details.address_components;
        const getComponent = (type) =>
            components.find(comp => comp.types.includes(type))?.long_name || '';

        const city = getComponent('administrative_area_level_3') || getComponent('locality');
        const state = getComponent('administrative_area_level_1');
        const pincode = getComponent('postal_code');

        const formattedAddress = details.formatted_address;
        const addressParts = formattedAddress.split(',').slice(1); // skip first line
        const address1 = addressParts.slice(0, 2).join(',').trim();
        const address2 = addressParts.slice(2).join(',').trim();

        setAddress(prev => ({
            ...prev,
            location: formattedAddress,
            address1,
            address2,
            city,
            state,
            pincode,
        }));
    };
    const homePlace = {
        description: 'Home',
        geometry: { location: { lat: 12.934, lng: 77.610 } }
    };


    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>{appLanguage.location ?? "Location"}</Text>
            {/* <GooglePlacesAutocomplete
                ref={placesRef}
                placeholder="Search your address"
                placeholderTextColor={'black'}
                minLength={2}
                autoFocus={false}
                fetchDetails={true}
                returnKeyType={'search'}
                keyboardShouldPersistTaps="always"
                listViewDisplayed={'auto'}
                enablePoweredByContainer={false}
                renderDescription={(row) => row.description}
                predefinedPlaces={[homePlace] || []}
                GooglePlacesSearchQuery={{
                    rankby: 'distance',
                    type: 'cities',
                }}

                onPress={(data, details = null) => {
                    if (!details) {
                        console.warn('No details returned for place');
                        return;
                    }

                    try {
                        handlePlaceSelect(details);
                    } catch (e) {
                        console.error('handlePlaceSelect error', e);
                    }
                }}

                query={{
                    key: 'AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8',
                    language: 'en',
                    region: 'us',
                    type: 'establishment',
                    components: 'country:in',
                }}

                textInputProps={{
                    placeholderTextColor: palette.lightgray,
                    returnKeyType: "search",
                    // fontSize: RFValue(13),
                    onChangeText: () => { },
                }}

                onFail={(error) => {
                    console.warn('Places API Error:', error);
                }}

                styles={{
                    textInput: {
                        fontSize: 13,
                        color: 'black',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 6,
                        paddingHorizontal: 10,
                        height: 40,
                    },
                    textInputContainer: {
                        borderColor: '#ddd',
                        flexDirection: 'row',
                        alignItems: 'center',
                    },
                    container: { flex: 0, zIndex: 10 },
                    description: { color: '#000' },
                    listView: {
                        backgroundColor: '#fff',
                        zIndex: 1000,
                        position: 'absolute',
                        top: 40,
                    },
                }}
            /> */}


            {errors.location ? <Text style={styles.errorText}>{errors.location}</Text> : null}

            <TouchableOpacity style={styles.selectLocationButton}
                onPress={() => navigation.navigate(Screen.MapScreen)}
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
                    <Dropdown
                        label={appLanguages.city ?? "City"}
                        options={cities}
                        selectedValue={address.city}
                        onSelect={(value) => handleChange('city', value)}
                    />
                    {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                    <Dropdown
                        label={appLanguages.state ?? "State"}
                        options={states}
                        selectedValue={address.state}
                        onSelect={(value) => handleChange('state', value)}
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

            <TouchableOpacity style={{ ...styles.selectLocationButton, marginTop: 10 }}>
                {/* <Image source={locationPin} style={styles.locationPin} /> */}
                <Text style={styles.selectLocationText}>{appLanguage.use_this_address ?? "Use this address"}</Text>
            </TouchableOpacity>
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
