import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, CheckBox } from 'react-native';
import sprayingDron from '../../../assets/images/common/sprayingDron.png'
import CustomHeader from '../../../components/common/CustomHeader';
import AddressCard from '../../../components/common/AddressCard';
import DeliveryAddress from '../../product_modules/components/AddressInputs';
import LinearGradient from 'react-native-linear-gradient';
import checkIcon from '../../../assets/images/common/checkIcon.png'
import SuccessScreen from '../../product_modules/components/SuccessScreen';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { UserManager } from '../../../storage';
import { useDispatch, useSelector } from 'react-redux';
import { useOperation } from '../../../redux/operation';
import { get_privious_address_of_spray_service, getSpryAddressCharges } from '../../../redux/services/operation';
import CategorizedDropdown from '../../../components/common/catogaryDropdown';
import { ProductType } from '../../../redux/product/type';
import DateTimePicker from "@react-native-community/datetimepicker";
import TimePicker from '../../../components/common/TimePicker';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import { farmercount } from '../../../utils/data';
import SelectLocationScreen from '../../../components/common/SelectLocationScreen';
import Webview_popup from '../../../components/common/WebViewPopup';
import constants from '../../../config/constants';
import CustomButton from '../../../components/common/CustomButton';
import { Screen } from '../../../router/screen';
import Indicator from '../../../components/common/Indicator';
import { setSpringAddress } from '../../../redux/farmer/operation';
import { HEToast } from '../../../components/toast';

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
    const { sprayItemData } = useSelector(state => state.services)
    const [showSuccess, setShowSuccess] = useState(false)

    const itemData = sprayItemData;
    const dropdownRef = useRef(null);

    const loadingSelector = createLoadingSelector([ProductType.productFromInvoice]);
    const isLoading = useSelector(state => loadingSelector(state));
    const appLanguage = UserManager?.getAppMultiLanguage;
    const farmerLanguage = useSelector(state => state.farmer.FarmerLanguageID);
    const StoreCodeDetails = useSelector(state => state.farmer.farmerStoreCodeDetails);
    const [enablePayment, setEnablePayment] = useState(false);
    const orderItemParam = useRoute()?.params?.orderItemParam || "";
    const [loading, setLoading] = useState(false);
    const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);
    const dispatch = useDispatch();
    const isFocussed = useIsFocused();
    const operation = useOperation();
    const [cropList, setCropList] = useState([]);
    const [showcalendar, setShowcalendar] = useState(false);
    const { previousAddress } = useSelector(state => state.user);
    const { sprayServiceCondition } = useSelector(state => state.services)
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedCrop, setSelectedCrop] = useState(itemData ? { value: itemData.crop } : null);
    const [selectedFarmCount, setSelectedFarmCount] = useState(itemData ? { value: itemData.noOfFarmers } : null)
    const [showTerms_Conditions, setShowTerms_Conditions] = useState(false);
    const croptypePrivious = itemData && cropList.find(x => x.name == itemData.crop)
    const isFirstRender = useRef(true);
    const [showMap, setShowMap] = useState(false);

    const [springServices, setSpringServices] = useState({
        coverageArea: '0',
        bookingDate: '',
        bookingTime: '',
        rescheduledDate: null,
        product: '',
        remark: '',
        Amount: 0,
        crop: '',
        dronePilotId: 0,
        farmerId: '',
        farmerStatus: '',
        isPaid: false,
        isReschedule: false,
        isVerified: false,
        serviceId: '',
        farmLand: '',
        alternativeContact: '',
        farmCount: "",
        baseRatePerAcre: 0,
        discountPerAcre: 0,
        totalDiscount: 0,
        estimatedAmount: 0,
    });

    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (itemData?.latitude == address?.latitude && itemData?.longitude == address?.longitude) {
            getAddressFromLatLng(springServices.latlng);
        }

        else if (address.pincode.length === 6) {
            // if (springServices.pinCode.length === 6 && (!(itemData?.latitude == springServices?.latlng?.latitude && itemData?.longitude == springServices?.latlng?.longitude) || itemData.pinCode != springServices.pinCode)) {
            saveAddress(
                `${address.address1} ${address.address2} ${address.city} ${address.state} ${address.pincode}`
            );
        }
    }, [address.pincode]);



    useEffect(() => {
        if (sprayItemData) {

            setAddress({
                address1: sprayItemData.address?.split(',')[0] || '',
                address2: sprayItemData.address?.split(',')[1] || '',
                city: '',
                state: '',
                pinCode: '',
                latitude: sprayItemData.latitude || 0,
                longitude: sprayItemData.longitude || 0,
            })

            setSpringServices({
                coverageArea: sprayItemData.coverageArea?.toString() || '0',
                bookingDate: sprayItemData.bookingDate || '',
                bookingTime: sprayItemData.preferredTime ? new Date(convertToISO(sprayItemData.preferredTime)) : '',
                rescheduledDate: sprayItemData.rescheduledDate || null,
                product: sprayItemData.product?.toString() || '',
                remark: sprayItemData.remarks || '',
                Amount: 0,
                crop: sprayItemData.crop || '',
                dronePilotId: 0,
                farmerId: sprayItemData.farmerId || '',
                farmerStatus: sprayItemData.serviceStatus || '',
                isPaid: false,
                isReschedule: sprayItemData.isReschedule || false,
                isVerified: sprayItemData.isVerified || false,
                serviceId: '',
                farmLand: sprayItemData.farmland?.toString() || '',
                alternativeContact: sprayItemData.alternateContact?.toString() || '',
                farmCount: sprayItemData.noOfFarmers?.toString() || '',
                baseRatePerAcre: sprayItemData.baseRatePerAcre || 0,
                discountPerAcre: sprayItemData.discountPerAcre || 0,
                totalDiscount: sprayItemData.totalDiscount || 0,
                estimatedAmount: sprayItemData.estimatedAmount || 0,
            });
            setFarmAccessible(itemData?.isFourWheeleAccessible ? "Yes" : "No")
            setHighVoltageLines(itemData?.isHighVoltageLines ? "Yes" : "No")
            setSelectedFarmCount({ value: itemData.noOfFarmers })
            setSelectedCrop(itemData ? { value: itemData.crop } : null)
        }

    }, [sprayItemData]);

    const FetchCrops = async () => {
        try {
            setLoading(true)
            const params = {

                language: farmerLanguage,

            };
            const res = await dispatch(operation.advisory.getCropsDrop(params));
            if (!res.errors || res.errors.length === 0) {
                setCropList(res);
            }
        } catch (error) {
            dispatch(operation.user.getErrorHandling(error, "getCrops"));
            console.error("Error fetching crops:", error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {

        if (isFocussed && cropList.length === 0) {
            FetchCrops();
        }
        if (itemData) {
            getAddressFromLatLng({ latitude: itemData.latitude, longitude: itemData.longitude }, false)
        }
        else {
            getAddress();
        }
    }, [isFocussed]);


    const handleSelectFarmCount = (item) => {
        setSelectedFarmCount(item);
        setSpringServices((prev) => ({
            ...prev,
            farmCount: item.value,
        }));
    };

    useEffect(() => {
        calculetCharges();
    }, [address?.latitude, address?.longitude, address.coverageArea, selectedCrop, cropList])


    const calculetCharges = useCallback(async () => {

        try {

            if (springServices.coverageArea < 5) {
                setSpringServices(prev => ({
                    ...prev,
                    baseRatePerAcre: 0,
                    discountPerAcre: 0,
                    totalDiscount: 0,
                    estimatedAmount: 0
                }))
                return
            }


            if (address?.latitude != 0 && address?.longitude != 0 && parseInt(springServices.coverageArea) >= 5 && selectedCrop != null) {

                const data = {
                    landAreaInAcres: springServices.coverageArea,
                    storeCode: StoreCodeDetails.storeCode,
                    endLatitude: address?.latitude,
                    endLongitude: address?.longitude,
                    cropType: (itemData && itemData?.crop == springServices.crop) ? croptypePrivious?.cropType : selectedCrop?.cropType,
                }

                const res = await dispatch(getSpryAddressCharges(data))

                if (
                    typeof res?.validationMessage === 'string' &&
                    res?.validationMessage?.length > 0
                ) {

                    setSpringServices(prev => ({
                        ...prev,
                        baseRatePerAcre: res.baseRatePerAcre,
                        discountPerAcre: res.discountPerAcre,
                        totalDiscount: res.totalDiscount,
                        estimatedAmount: res.estimatedAmount
                    }))

                    if (!res.validationMessage.toLowerCase().includes('successfully')) {
                        setErrorMessage(res?.validationMessage)
                    }
                    else {
                        setErrorMessage('')
                    }

                }
                else {
                    setSpringServices(prev => ({
                        ...prev,
                        baseRatePerAcre: 0,
                        discountPerAcre: 0,
                        totalDiscount: 0,
                        estimatedAmount: 0
                    }))
                }
            } else {
                return
            }
        } catch (error) {
            console.log("error2", error)
        }
        finally {
            // setLoading(false)
        }
    }, [address?.latitude, address?.longitude, springServices.coverageArea, selectedCrop, cropList])


    const saveAddress = useCallback(

        async address => {

            const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8`;

            fetch(geocodeURL)
                .then(response => response.json())
                .then(data => {

                    if (data.status === 'OK' && data.results?.length > 0) {
                        const location = data.results[0]?.formatted_address
                        // Safely extract the address components


                        const { lat, lng } = data.results[0].geometry.location;

                        const longaddress = location.split(',').slice(1).join(',').trim().split(',');;

                        setAddress((prev) => ({
                            ...prev,
                            address1: longaddress?.slice(0, 2)?.join(',').trim(),
                            address2: longaddress?.slice(2)?.join(',').trim(),
                            latitude: lat,
                            longitude: lng
                        }))

                        getAddressFromLatLng({ latitude: lat, longitude: lng }, false)

                    } else {
                        return false
                    }
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                })
                .finally(() => {
                    return false
                });
        },
        [setSpringServices],
    );

    const handleSubmit = async () => {

        if (!isChecked) {
            HEToast(appLanguage.lblErrorTermCondition ?? 'Please agree terms and conditions', "error")
            return
        }

        // check booking date
        if (springServices.bookingDate === "") {
            HEToast(appLanguage.lblChooseBookingDate ?? 'Choose booking date', "error")
            return
        }

        if (springServices.bookingTime === "") {
            HEToast(appLanguage.lblChooseTime ?? 'Please Choose Time', "error")
            return
        }

        if ((springServices.rescheduledDate === "" || springServices.rescheduledDate === null) && itemData) {
            HEToast(appLanguage?.lblChooseRescheduleDate ?? 'choose rescheduled date', "error")
            return
        }
        if (new Date(springServices.rescheduledDate) === new Date(springServices.bookingDate)) {
            HEToast(appLanguage?.lblRescheduleDateError ?? 'Reschedule date should not be the same as booking date', "error");
            return;
        }

        if (address.pincode.length < 6) {
            HEToast(appLanguage?.lblEnterValidPincode ?? 'Enter valid pincode', "error")
            return
        }

        if (springServices.coverageArea.length < 1) {
            HEToast(appLanguage?.lblEnterValidCoverageArea ?? 'Enter valid coverage area', "error")
            return
        }

        if (springServices.alternativeContact.length > 0 && springServices.alternativeContact.length < 10) {
            HEToast(appLanguage?.lblValidContactNumber ?? 'Enter valid Contact number', "error")
            return
        }

        if (parseInt(springServices.coverageArea) < parseInt(sprayServiceCondition.minimumCoverageArea)) {
            HEToast(`${appLanguage?.IblMinCoverageArea ?? `Minimum coverage area is ${sprayServiceCondition.minimumCoverageArea}`}`, 'error');

            return;
        }

        if (springServices.estimatedAmount == 0) {
            HEToast(appLanguage?.lblInvalidAddress ?? 'No service availabe for this address', "error")
            return
        }


        try {
            setLoading(true)

            const data = {
                "bookingDate": springServices.bookingDate,
                "rescheduledDate": springServices.rescheduledDate,
                "numberOfRescheduledTimes": 0,
                "farmerId": farmerAddress?.farmerIdentityId,
                "serviceId": itemData ? itemData.serviceId : "",
                "crop": springServices?.crop || "",
                "coverageArea": parseInt(springServices.coverageArea),
                "product": 0,
                "farmland": parseInt(springServices.farmLand),
                "address": (address?.address1 || "") +
                    (address?.state || "") +
                    (address?.city || "") +
                    (address?.pincode || ""),
                "latitude": address?.latitude || 0,
                "longitude": address?.longitude || 0,
                "remarks": springServices?.remark || "",
                "isVerified": true,
                "serviceStatus": itemData ? itemData.serviceStatus : null,
                "isPaid": true,
                "amount": 0,
                "estimatedAmount": springServices.estimatedAmount,
                "isReschedule": itemData ? true : false,
                "dronePilotId": 0,
                "storeCode": StoreCodeDetails.storeCode,
                "isFourWheeleAccessible": farmAccessible == "Yes" ? true : false,
                "isHighVoltageLines": highVoltageLines == "Yes" ? true : false,
                "alternateContact": springServices.alternativeContact,
                "noOfFarmers": parseInt(springServices.farmCount),
                "baseRate": springServices.baseRatePerAcre,
                "discountPerAcre": springServices.discountPerAcre,
                "totalDiscount": springServices.totalDiscount,
                "storeManagerId": 0,
                "storeManagerEmail": "",
                "deliveryPartnerId": 0,
                "deliveryPartnerName": "",
                "deliveryPartnerContactName": "",
                "deliveryPartnerContactMobileNo": "",
                "deliveryPartnerNotificationEmailId": "",
                "deliveryAgentId": "",
                "deliveryAgentName": "",
                "deliveryAgentMobileNo": "",
                "PreferredTime": formatTime(springServices.bookingTime),
                "cropType": (itemData && itemData?.crop == springServices.crop) ? croptypePrivious?.cropType : selectedCrop?.cropType,
            }

            const rescheduleData = {
                ...data,
                "id": 0,
            }

            const info = itemData ? rescheduleData : data

            const res = await dispatch(setSpringAddress(info));
            console.log(res, 'rrrrrrrr')
            if (res.toLowerCase().includes('success')) {
                setShowSuccess(true)
                setSelectedCrop(null)
                setSpringServices({
                    coverageArea: '0',
                    bookingDate: "",
                    product: '',
                    remark: '',
                    Amount: 0,
                    crop: '',
                    dronePilotId: 0,
                    farmerId: '',
                    farmerStatus: '',
                    isPaid: false,
                    isReschedule: 0,
                    isVerified: false,
                    serviceId: '',
                    farmCount: '',
                    baseRatePerAcre: 0,
                    discountPerAcre: 0,
                    totalDiscount: 0,
                    estimatedAmount: 0,
                    alternativeContact: '',
                    rescheduledDate: null,
                    bookingTime: "",
                });
                setAddress({
                    location: '',
                    address1: '',
                    address2: '',
                    city: '',
                    state: '',
                    pincode: '',
                    latitude: '',
                    longitude: ""
                })
                setHighVoltageLines(null)
                setFarmAccessible(null)
                setSelectedFarmCount(null)
                setErrorMessage('')
                placesRef.current?.clear();
                if (itemData) {
                    dispatch({ type: servicetype.spreayItemDataset, payload: null })
                }

            }
        } catch (error) {
            console.log("error1", error);
        }
        finally {
            setLoading(false)

        }
    };


    const getAddress = async () => {
        try {
            const res = await dispatch(get_privious_address_of_spray_service({ farmid: farmerAddress?.farmerIdentityId }))

            getAddressFromLatLng({
                longitude: res.deliveryAddress.farmerDeliveryLongitude,
                latitude: res.deliveryAddress.farmerDeliveryLatitude

            })

        } catch (error) {
            console.log(error);

        }
    }


    const getAddressFromLatLng = useCallback(
        async (latlng, shomap = true) => {
            // Replace YOUR_GOOGLE_MAPS_API_KEY with your actual API key
            const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng?.latitude},${latlng?.longitude}&key=AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8`;

            fetch(geocodeURL)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'OK') {
                        let location = data?.results?.[0]?.formatted_address;
                        placesRef?.current?.setAddressText(location);
                        const addressComponents = data?.results?.[0]?.address_components;

                        const city = (addressComponents ?? []).find(component =>
                            component.types.includes('administrative_area_level_3'),
                        );
                        const state = (addressComponents ?? []).find(component =>
                            component.types.includes('administrative_area_level_1'),
                        );

                        let pincode = data?.results?.[0]?.address_components.find(
                            x => x.types[0] === 'postal_code',
                        );
                        const englishTextPin = pincode?.long_name.replace(
                            /\D/g,
                            '',
                        );

                        setAddress(prev => ({
                            ...prev,
                            city: city?.long_name,
                            state: state?.long_name,
                            pincode: englishTextPin ?? pincode?.long_name,
                        }));

                    } else {
                        console.error('Geocoding failed:', data.status);
                    }
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                })
                .finally(() => {
                    return
                });
        },
        [setAddress],
    );


    const handleStartTimeSelected = (time) => {
        setSpringServices(prev => ({ ...prev, bookingTime: time }));
    };

    const formatTime = (date) => {
        if (!date) return "Select Time";
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const isButtonEnabled = address?.state && address?.pincode && address?.city && springServices?.crop && springServices?.coverageArea && !errorMessage?.length > 0 && springServices?.bookingDate && springServices?.alternativeContact

    return showMap ? <SelectLocationScreen address={address} setAddress={setAddress} setShowMap={setShowMap} /> :
        showSuccess ? <SuccessScreen
            setShowSuccess={setShowSuccess}
            title={"Submitted Successfully!"}
            subtitle={"Your Spray service saved successfully"}
            path={Screen.MyServicesScreen}
            state={"Spraying Services'"}
        />
            :
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
                    <View style={{ marginTop: 10 }}>
                        <Image
                            source={sprayingDron} // replace with actual path
                            style={styles.droneImage}
                        />
                    </View>
                    <View style={{ paddingVertical: 6 }}>
                        {/* Alert Text */}
                        <Text style={styles.alertText}>*All fields are required</Text>

                        {/* Form Container */}
                        <Text style={styles.sectionTitle}>Crop Details</Text>
                        <View style={styles.formBox}>

                            {/* Crop Dropdown */}
                            <View style={styles.inputBox}>
                                <Text style={styles.label}>Crop</Text>
                                <CategorizedDropdown
                                    ref={dropdownRef}
                                    cropData={cropList}
                                    selectedCrop={selectedCrop}
                                    setSpringServices={setSpringServices}
                                    setSelectedCrop={setSelectedCrop}
                                    itemData={itemData}
                                    disabled={itemData ? itemData.parentServiceId == null ? false : true : false}
                                />
                            </View>

                            {/* Coverage Area & Farm Land */}
                            <View style={styles.row}>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.label}>Coverage Area</Text>
                                    <View style={styles.unitInput}>
                                        <TextInput
                                            style={styles.input}
                                            keyboardType="numeric"
                                            placeholder="0"
                                            onChangeText={text => {
                                                const data = text.replace(/[^0-9]/g, '');
                                                setSpringServices(prev => ({ ...prev, coverageArea: data }));
                                            }}
                                            placeholderTextColor={'#999'}
                                        />
                                        <Text style={styles.unit}>acre</Text>
                                    </View>
                                </View>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.label}>Farm Land</Text>
                                    <View style={styles.unitInput}>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={text => {
                                                const data = text.replace(/[^0-9]/g, '');
                                                setSpringServices(prev => ({ ...prev, farmLand: data }));
                                            }}
                                            keyboardType="numeric"
                                            placeholder="0"
                                            placeholderTextColor={'#999'}

                                        />
                                        <Text style={styles.unit}>acre</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Date & Time */}
                            <View style={styles.row}>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.label}>Schedule Date</Text>
                                    <TouchableOpacity style={styles.dropdown}
                                        onPress={() => {
                                            if (!itemData) {
                                                setShowcalendar(true);
                                            }
                                        }}
                                    >
                                        <Text
                                            style={springServices.bookingDate === "" ? styles.placeholder : {
                                                color: '#000000'
                                            }}
                                        >
                                            {springServices.bookingDate === ""
                                                ? "DD-MM-YYYY"
                                                : moment(springServices.bookingDate).format("DD-MM-YYYY")}
                                        </Text>
                                    </TouchableOpacity>


                                    {showcalendar && (
                                        <DateTimePicker
                                            value={springServices.bookingDate === "" ? new Date(new Date().setDate(new Date().getDate() + 1)) : springServices.bookingDate}
                                            mode="date"
                                            display="default"
                                            onChange={(event, selectedDate) => {
                                                setShowcalendar(false);
                                                if (event.type === "dismissed") {
                                                    return; // Do nothing if canceled
                                                }
                                                setSpringServices((prev) => ({ ...prev, bookingDate: selectedDate }));
                                            }}
                                            disabled={itemData ? true : false}
                                            minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))} // First valid date (Monday-Friday)
                                            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))} // Last valid weekday
                                        />
                                    )}
                                </View>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.label}>Select Time</Text>

                                    <TimePicker time={springServices.bookingTime} onTimeSelected={handleStartTimeSelected} applanguage={appLanguage} />

                                </View>
                            </View>

                            {/* Remarks */}
                            <View style={styles.inputBox}>
                                <Text style={styles.label}>
                                    Remarks <Text style={{ color: 'red', fontWeight: 30 }}>(Optional)</Text>
                                </Text>
                                <TextInput
                                    style={[styles.TextInput, { height: 100, textAlignVertical: 'top' }]}
                                    placeholder="Enter Alternate Contact"
                                    value={springServices.remark}
                                    placeholderTextColor="#999"
                                    multiline
                                    numberOfLines={4}
                                    onChangeText={text => {
                                        setSpringServices(prev => ({ ...prev, remark: text }));
                                    }}
                                />

                            </View>
                        </View>

                        {/* Farmer Details Title */}
                        <Text style={styles.sectionTitle}>Farmer Details</Text>
                        <View style={styles.formBox}>
                            {/* Number of Farmer(s) */}
                            <View style={styles.inputBox}>
                                <Text style={styles.label}>Number of Farmer(s)</Text>

                                <Dropdown
                                    data={farmercount}
                                    labelField="label"
                                    valueField="value"
                                    disable={itemData ? true : false}
                                    placeholder={"Select"}
                                    value={selectedFarmCount ? selectedFarmCount.value.toString() : null}
                                    onChange={handleSelectFarmCount}
                                    style={{
                                        width: '100%',
                                        height: 40,
                                        borderRadius: 8,
                                        paddingHorizontal: 10,
                                        backgroundColor: 'transparent',
                                        borderWidth: 1,
                                        borderColor: "#D1D5DB",
                                    }}
                                    placeholderStyle={{
                                        fontSize: 14,
                                        fontWeight: 400,
                                        color: '#999',
                                    }}
                                    selectedTextStyle={{
                                        fontSize: 14,
                                        color: '#333333',
                                        paddingVertical: 4,
                                    }}
                                    itemTextStyle={{
                                        fontSize: 14,
                                        color: '#555555',
                                    }}
                                    itemContainerStyle={{
                                        backgroundColor: '#f9f9f9',
                                        borderBottomColor: '#dddddd',
                                        borderBottomWidth: 0.5,
                                        paddingVertical: 1,
                                        paddingHorizontal: 10,
                                    }}
                                    dropdownStyle={{
                                        borderRadius: 8,
                                        elevation: 3,
                                        backgroundColor: '#ffffff',
                                    }}
                                    activeItemStyle={{
                                        backgroundColor: '#e0f7fa',
                                    }}
                                    activeLabelStyle={{
                                        color: '#00796b',
                                    }}
                                />

                            </View>

                            {/* Alternate Contact */}
                            <View style={styles.inputBox}>

                                <Text style={styles.label}>Alternate Contact</Text>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Enter Alternate Contact"
                                    value={springServices.alternativeContact}
                                    placeholderTextColor="#999"
                                    maxLength={12}
                                    keyboardType="phone-pad"
                                    onChangeText={text => {
                                        const contact = text.replace(/[^0-9]/g, '');
                                        setSpringServices(prev => ({ ...prev, alternativeContact: contact }));
                                    }}
                                />
                            </View>
                        </View>

                        {/* farmer address */}
                        <Text style={styles.sectionTitle}>Farm Address</Text>

                        <DeliveryAddress setShowMap={setShowMap} enablePayment={enablePayment} saveAddress={saveAddress} address={address} setAddress={setAddress} placesRef={placesRef} />

                        {/* FAQ */}
                        <Text style={styles.sectionTitle}>FAQ Quations <Text style={{ color: 'red', fontWeight: 30 }}>(Optional)</Text></Text>
                        <View style={styles.radioCard}>

                            {/* Question 1 */}
                            <Text style={styles.radioLabel}>Farm Accessible by four-wheeler</Text>
                            <View style={styles.radioGroup}>
                                {['Yes', 'No'].map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={styles.radioOption}
                                        onPress={() => { setFarmAccessible(option) }}
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
                                    <Text style={styles.value}>₹{springServices?.baseRatePerAcre}</Text>
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Discount</Text>
                                    <Text style={styles.value}>- ₹{springServices?.discountPerAcre}</Text>
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Total Discount</Text>
                                    <Text style={styles.value}>- ₹{springServices?.totalDiscount}</Text>
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Estimated Charges</Text>
                                    <Text style={styles.value}>{springServices?.estimatedAmount ?? 0}</Text>
                                </View>

                                <View style={{ height: 1, backgroundColor: '#DFDFDF', marginVertical: 8 }} />

                                {/* <View style={styles.divider} /> */}

                                <View style={styles.priceRow}>
                                    <Text style={styles.totalLabel}>Total Amount</Text>
                                    <Text style={styles.totalValue}>₹{springServices?.estimatedAmount ?? '0'}</Text>
                                </View>
                            </View>
                        </View>


                    </View>

                </ScrollView>
                {/* Terms & Submit */}

                {/* submit button */}
                <View style={{ backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 20 }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}
                    >
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
                        </TouchableOpacity>
                        <Text style={styles.agreeText}> I agree to the  </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowTerms_Conditions(true);
                            }}
                        >
                            <Text style={styles.termsText}>Terms and Conditions</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomButton
                        title={"Submit"}
                        onPress={handleSubmit}
                        disabled={!isButtonEnabled}
                        show={false}
                    />
                </View>

                <Webview_popup
                    isPopupHidden={false}
                    popupTitle={appLanguage?.terms ?? 'Terms and Conditions'}
                    popupVisible={showTerms_Conditions}
                    onPressClose={() => {
                        setShowTerms_Conditions(false);
                    }}
                    WebViewURL={constants.termsAndConditionSpray}
                />
                <Indicator show={loading} />
            </>

};

export default NewServiceRequestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 16,
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
        marginBottom: 6,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 700,
        marginBottom: 10,
        marginTop: 15
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
        color: '#4E4E4E'

    },

    radioCard: {
        backgroundColor: '#ffffffff',
        borderRadius: 10,
        padding: 16,
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
        marginLeft: 2,
        // paddingTop: 10
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
