import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, SafeAreaView, Platform } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from '../../../components/common/CustomHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import checkIcon from '../../../assets/images/common/checkIcon.png'
import AddressCard from '../../../components/common/AddressCard';
import DeliveryAddress from '../../product_modules/components/AddressInputs';
import LinearGradient from 'react-native-linear-gradient';
import Webview_popup from '../../../components/common/WebViewPopup';
import { UserManager } from '../../../storage';
import constants from '../../../config/constants';
import { useOperation } from '../../../redux/operation';
import { useDispatch, useSelector } from 'react-redux';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { ProductType } from '../../../redux/product/type';
import { servicetype } from '../../../redux/services/type';
import { BUILD, BuildTypes } from '../../../config';
import CustomButton from '../../../components/common/CustomButton';
import { HEToast } from '../../../components/toast';
import { India_INRCurrency } from '../../../utils/validator';
import { numberFormat } from '../../../utils/utils';
import CTText from '../../../components/ctText';
import { RFValue } from 'react-native-responsive-fontsize';
import { palette } from '../../../theme/color';
import Indicator from '../../../components/common/Indicator';
import { setDoordeliveryService } from '../../../redux/services/operation';


let defdelivery_Charge = {
    deliveryCharge: 0,
    deliveryChargeCalc: 0,
    deliveryChargeDiscount: 0,
};

const DoorDeliveryComponent = ({ navigation }) => {
    const [sameAddress, setSameAddress] = useState(true);
    const [allowTerm, setAllowTerm] = useState(false)
    const [showMap, setShowMap] = useState(false);
    const placesRef = useRef();
    const operation = useOperation();
    const dispatch = useDispatch();
    const { previousAddress } = useSelector(state => state.user)
    const appLanguage = UserManager?.getAppMultiLanguage;
    const farmerLanguage = useSelector(state => state.farmer.FarmerLanguageID);
    const soNumber = useRoute()?.params?.soNumber
    const orderItemParam = useSelector(state => state.services.doorDeliveryProduct)
    const [showTerms_Conditions, setShowTerms_Conditions] = useState(false);
    const [paySuccessVisible, setPaySuccessVisible] = useState(false);
    const [payFailureVisible, setPayFailureVisible] = useState({
        visible: false,
        title: '',
        description: '',
        type: '',
        buttonText: '',
    });
    const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);
    const [deliverCharges, setDeliverCharges] = useState(defdelivery_Charge);
    const [enablePayment, setEnablePayment] = useState(false);
    const [TransdeliverCharges, setTransdeliverCharges] = useState({});
    const [distance, setDistance] = useState()

    const loadingSelector = createLoadingSelector([
        ProductType.productFromInvoice,
    ]);
    const StoreCodeDetails = useSelector(
        state => state.farmer.farmerStoreCodeDetails,
    );
    const [errorMessage, setErrorMessage] = useState('')
    const getNotification = () => {
        let param = {
            userId: farmerAddress?.farmerIdentityId,
            hasRead: 1,
        };
        dispatch(operation.farmer.getNotification(param));
    };
    const isLoading = useSelector(state => loadingSelector(state));
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


    useEffect(() => {
        getAddress()
    }, [previousAddress])


    useEffect(() => {
        if (orderItemParam?.orderItems && orderItemParam?.orderItems.length > 0) {
            let items = [];
            let price = {
                subTotal: 0,
                discount: 0,
                taxes: 0,
                couponDiscount: 0,
                deliverCharger: 0,
                totalCost: 0,
                productType: 0,
                additionalDiscount: 0,
                additionalDiscountPercentage: 0,
            };
            orderItemParam?.orderItems.map((cartItem, cartIndex) => {
                price.subTotal += cartItem?.actualPrice;
                if (
                    cartItem?.size?.includes('KG') ||
                    cartItem?.size?.includes('kg') ||
                    cartItem?.size?.includes('Kg') ||
                    cartItem?.size?.includes('kG')
                ) {
                    price.productType = 1;
                }
                price.discount += cartItem?.actualPrice - cartItem?.priceAfterDiscount;
                items.push(calculateSize(cartItem));
            });

            let kgValues = 0;
            let ltValues = 0;

            items?.map(item => {
                if (item?.size === 'KG') {
                    kgValues += item?.quantity;
                } else if (item?.size === 'LT') {
                    ltValues += item?.quantity;
                }
            });

            let tempParams = {
                kgs: kgValues,
                ltr: ltValues,
                amount: orderItemParam?.amount,
                storeCode: StoreCodeDetails.storeCode,
                latitude: address?.latitude,
                longitude: address?.longitude,
                farmerId: farmerAddress?.farmerIdentityId,
                language: farmerLanguage,
                soNumber: soNumber,
                storeCode: farmerAddress?.storeCode || '',
            };
            if (
                address?.latitude === 0 &&
                address?.longitude === 0
            ) {
                return;
            }

            if ((address.address1 || address.address2) && address?.latitude && address?.longitude) {
                getDeliveryCharges(tempParams);
            } else {
                console.log('ccccccccccc')
                setEnablePayment(false);
                return;
            }

        }

    }, [
        orderItemParam?.orderItems,
        address?.latitude,
        address?.longitude,
        StoreCodeDetails.storeCode,
    ]);


    const getAddress = useCallback(
        async address => {
            const preAddress = previousAddress?.deliveryAddress?.deliveryAddress
            const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(preAddress)}&key=AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8`;

            // setCheckBillAdd(false);

            fetch(geocodeURL)
                .then(response => response.json())
                .then(data => {

                    if (data.status === 'OK' && data.results?.length > 0) {
                        const addressComponents = data.results[0].address_components;
                        const location = data.results[0]?.formatted_address

                        const city =
                            addressComponents.find((component) =>
                                component.types.includes("locality")
                            )?.long_name || "";

                        const state =
                            addressComponents.find((component) =>
                                component.types.includes("administrative_area_level_1")
                            )?.long_name || "";

                        const pincode =
                            addressComponents.find((component) =>
                                component.types.includes("postal_code")
                            )?.long_name || "";

                        const { lat, lng } = data.results[0].geometry.location;

                        const longaddress = location.split(',').slice(1).join(',').trim().split(',');

                        setAddress(prev => ({
                            ...prev,
                            address1: longaddress?.slice(0, 2)?.join(',').trim(),
                            address2: longaddress?.slice(2)?.join(',').trim(),
                            city: city,
                            state: state,
                            pincode: pincode,
                            latitude: lat,
                            longitude: lng
                        }));

                        placesRef.current?.clear()
                    }
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                })
                .finally(() => {
                    // setShowMaps(false)
                    return true
                });
        },
        [setAddress,
            previousAddress
        ],
    );

    const calculateSize = val => {
        let itemValue = {};
        let value = val?.size;
        let quantity = val?.quantity;

        if (
            value?.includes('KG') ||
            value?.includes('kg') ||
            value?.includes('Kg') ||
            value?.includes('kG')
        ) {
            itemValue = {
                quantity: Number(value.replace(/(\D)/g, '')) * quantity,
                size: 'KG',
            };
        } else if (
            value?.includes('GM') ||
            value?.includes('gm') ||
            value?.includes('Gm') ||
            value?.includes('gM')
        ) {
            itemValue = {
                quantity: (Number(value.replace(/(\D)/g, '')) * quantity) / 1000,
                size: 'KG',
            };
        } else if (
            (value?.includes('LT') ||
                value?.includes('lt') ||
                value?.includes('Lt') ||
                value?.includes('lT') ||
                value?.includes('L') ||
                value?.includes('l')) &&
            !value?.includes('ML') &&
            !value?.includes('ml') &&
            !value?.includes('Ml') &&
            !value?.includes('mL')
        ) {
            itemValue = {
                quantity: Number(value.replace(/(\D)/g, '')) * quantity,
                size: 'LT',
            };
        } else if (
            value?.includes('ML') ||
            value?.includes('ml') ||
            value?.includes('Ml') ||
            value?.includes('mL')
        ) {
            itemValue = {
                quantity: (Number(value.replace(/(\D)/g, '')) * quantity) / 1000,
                size: 'LT',
            };
        }
        // console.log(itemValue,"itemValue",orderItemParam?.orderItems)
        return itemValue;
    };

    const getDeliveryCharges = param => {

        console.log(param,'ppppppp')

        dispatch(operation.farmer.getNewDeliveryCharges(param))
            .then(res => {

                if (
                    typeof res?.validationMessage === 'string' &&
                    res?.validationMessage?.length > 0
                ) {
                    setEnablePayment(false);
                    HEToast(res?.validationMessage ?? '');

                    setErrorMessage(res?.validationMessage)
                    const num = res?.validationMessage.match(/\d+/)?.[0];
                    setDistance(num)
                    return
                } else {
                    console.log(res, 'rrrrrrrrrr')
                    setDeliverCharges(res);
                    setTransdeliverCharges(res);
                    setEnablePayment(true);
                }
            })
            .catch(err => {
                const { message, title } = err;
                if (message?.includes('401')) {
                    navigation.dispatch(
                        CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                    );
                } else {
                    // dispatch(operation.user.getErrorHandling(err, 'getDeliveryCharges'));
                    HEToast(err?.message, 'error');
                    setEnablePayment(false);
                }
            });
    };

    const saveAddress = useCallback(
        async address => {
            const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8`;

            fetch(geocodeURL)
                .then(response => response.json())
                .then(data => {

                    if (data.status === 'OK' && data.results?.length > 0) {
                        const location = data.results[0]?.formatted_address

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
        [setAddress],
    );

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
                        const englishTextPin = pincode?.long_name.replace(/\D/g, '',
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

    const onPressCheckOut = async (type) => {

        try {
            const Payload = {
            "farmerId": farmerAddress?.farmerIdentityId || "",
            "language": farmerLanguage || 0,
            "devicePlatform": Platform.OS,
            "environment": BUILD === BuildTypes.Production ? '0' : '1',
            "deliveryType": 2,
            "deliveryCharge": deliverCharges.deliveryCharge,
            "deliveryChargeDiscount": deliverCharges.deliveryChargeDiscount,
            "deliveryChargeCalc": deliverCharges.deliveryChargeCalc,
            "storeCode": farmerAddress?.storeCode || '',
            "orderItems": orderItemParam?.orderItems,
            "deliveryAddress": address.address1 + " " + address.address2 + " " + address.city + " " + address.state + " " + address.pincode,
            "latitude": address?.latitude,
            "longitude": address?.longitude,
            'soNumber': soNumber
        }


        console.log(Payload, 'Payload')

        if (type == 'COD') {

            dispatch(setDoordeliveryService(Payload))
                .then(res => {
                    console.log(res)
                    if (res) {
                        // setCODSuccessVisible({ visible: true, transId: res });

                    } else {
                        dispatch(operation.user.getErrorHandling(res, 'createTransaction'));
                    }
                    dispatch({ type: servicetype.productFromInvoice + '_SUCCESS', payload: null })
                    dispatch({ type: servicetype.doorDeliveryProduct + '_SUCCESS', payload: null })

                })
                .catch(err => {
                    const { message, title } = err;
                    if (message?.includes('401')) {
                        navigation.dispatch(
                            CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                        );
                    } else {
                        dispatch(operation.user.getErrorHandling({ message: err?.data?.description }, 'createTransaction'));
                    }
                    dispatch({ type: servicetype.productFromInvoice + '_SUCCESS', payload: null })
                    dispatch({ type: servicetype.doorDeliveryProduct + '_SUCCESS', payload: null })


                });
        }
        else {
            dispatch(setDoordeliveryService(Payload))
                .then(res => {
                    // console.log(res,'kkkkkkres')
                    if (res.errors == null || res.errors.length === 0) {
                        if (
                            farmerAddress?.mobileNumber &&
                            farmerAddress?.storeCode &&
                            farmerAddress?.villageCode &&
                            farmerAddress?.farmerIdentityId &&
                            res?.toString() !== ''
                        ) {
                            const paymentData = {
                                amount: parseFloat(
                                    deliverCharges?.deliveryCharge,
                                ).toFixed(1),
                                productinfo: 'Gromor',
                                phone: farmerAddress?.mobileNumber,
                                transactionid: res.toString(),
                                firstname: farmerAddress?.name ?? '',
                                email: farmerAddress?.emailId ?? '',
                                udf1: farmerAddress?.storeCode, // store code
                                udf2: farmerAddress?.villageCode, // village code
                                udf3: farmerAddress?.farmerIdentityId, // farmeridentity
                            };

                            const preparedData = createPaymentParams(paymentData);
                            // console.log(
                            //   'preparedData :>> ',
                            //   JSON.stringify(preparedData, null, 2),
                            // );
                            // PayUBizSdk.openCheckoutScreen(preparedData);
                        } else {
                            dispatch(
                                operation.user.getErrorHandling({ message: err?.data?.description }, 'createTransaction'),
                            );
                        }
                    } else {
                        dispatch(operation.user.getErrorHandling({ message: err?.data?.description }, 'createTransaction'));
                    }
                    // dispatch({ type: servicetype.productFromInvoice + '_SUCCESS', payload: null })
                    dispatch({ type: servicetype.doorDeliveryProduct + '_SUCCESS', payload: null })
                })
                .catch(err => {
                    console.log('err', err);
                    const { message, title } = err;
                    if (message?.includes('401')) {
                        navigation.dispatch(
                            CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                        );
                    } else {
                        dispatch(operation.user.getErrorHandling({ message: err?.data?.description }, 'createTransaction'));
                    }
                });
            dispatch({ type: servicetype.doorDeliveryProduct + '_SUCCESS', payload: null })

        }
        } catch (error) {
            console.log(error,'eeeeeeeeeeee')
        }
    }

    const decimalCount = num => {
        const numStr = String(num);
        if (numStr.includes('.')) {
            return numStr.split('.')[1].length;
        }
        return 0;
    };
    return (

        <SafeAreaView style={{ flex: 1 }}>

            {/* Header */}
            <View style={{ marginTop: 30, }}>
                <CustomHeader
                    type="door delivery"
                    topTitle="Door Delivery"
                    showLocation={false}
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

                {/* {!sameAddress && <DeliveryAddress address={address} setAddre={setAddress} />} */}
                {!sameAddress && <DeliveryAddress setShowMap={setShowMap} saveAddress={saveAddress} address={address} setAddress={setAddress} placesRef={placesRef} />}

                <Text style={styles.sectionTitle}>Store Address</Text>

                <View style={{ marginTop: 10 }}>
                    <AddressCard cardType="StoreType" />
                </View>

                {/* Price Details & Button */}
                <Text style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>Price Details</Text>
                <View style={styles.totalAmountBox}>
                    <Text style={styles.totalAmount}>Total Amount</Text>
                    <Text style={styles.totalAmount}>
                        {`${India_INRCurrency} ${enablePayment ? numberFormat(
                            deliverCharges?.deliveryCharge ?? 0,
                            decimalCount(deliverCharges?.deliveryCharge),
                        ) : 0}`}
                    </Text>
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
                <View style={{ paddingHorizontal: 19 }}>


                    {errorMessage?.includes('Not enough quantity') &&
                        <CTText
                            text={`${errorMessage} `}
                            fontSize={RFValue(11)}
                            textColor={palette.red}
                        />
                    }

                    {isNaN(distance == undefined ? "a" : errorMessage.match(/\d+/)?.[0]) &&
                        <CTText
                            text={`${errorMessage} `}
                            fontSize={RFValue(11)}
                            textColor={palette.red}
                        />
                    }

                    {!isNaN(distance == undefined ? "a" : errorMessage.match(/\d+/)?.[0]) && !enablePayment && <CTText
                        text={`${appLanguage?.lblDoorDeliveryDistanceValidation.replace('-', distance) ??
                            'Door Deliver service is not available for the distance more than 30 Km'
                            } `}
                        fontSize={RFValue(11)}
                        textColor={palette.red}
                    />
                    }
                </View>

            </ScrollView>
            <View>
                <CustomButton
                    title={"Place Order"}
                    onPress={onPressCheckOut}
                    show={false}
                    disabled={!enablePayment}
                />
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

            <Indicator show={isLoading} />
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

