
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Linking } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useOperation } from '../../../redux/operation';
import { Screen } from '../../../router/screen';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import MyCartContainer from './MyCartContainer';
import { ProductType } from '../../../redux/product/type';
import constants from '../../../config/constants';
import { UserManager } from '../../../storage';
import { PaymentType } from '../../../redux/payment/type';
import { HEToast } from '../../../components/toast';
import { CommonActions } from '@react-navigation/native';
import { isEmpty } from '../../../utils/validator';
import { getMinimumCount } from '../../../redux/farmer/operation';
import { getPreviousAddress } from '../../../redux/user/operation';


let defdelivery_Charge = {
    deliveryCharge: 0,
    deliveryChargeCalc: 0,
    deliveryChargeDiscount: 0,
};


const MyCart = ({ navigation, route }) => {
    const operation = useOperation();
    const dispatch = useDispatch();
    const loadingSelector = createLoadingSelector([
        ProductType.myCart,
        ProductType.productCart,
        ProductType.bookNowFromcartAction,
        ProductType.deleteCartBookingProduct,
        ProductType.deleteCartProduct,
        PaymentType.paymentUpdate,
        ProductType.MyCartBooking,
        ProductType.productCartBooking,
    ]);
    const placesRef = useRef();
    const [deliverCharges, setDeliverCharges] = useState(defdelivery_Charge);
    const [deliveryType, setDeliveryType] = useState('');
    const [activeCategory, setActiveCategory] = useState('non-fertilizers');
    const [enablePayment, setEnablePayment] = useState(false);
    const isLoading = useSelector(state => loadingSelector(state));
    const { previousAddress } = useSelector(state => state.user);
    const [checkBillAdd, setCheckBillAdd] = useState(true);

    const appLanguage = UserManager?.getAppMultiLanguage;
    const isFocussed = useIsFocused();
    const [promoCode, setPromoCode] = useState('');
    const [showPromo, setShowPromo] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    const [distance, setDistance] = useState();

    const [BookingSuccessVisible, setBookingSuccessVisible] = useState({
        visible: false,
        transId: '',
    });
    const [priceData, setPriceData] = useState({
        subTotal: 0,
        discount: 0,
        taxes: 0,
        couponDiscount: 0,
        totalCost: 0,
        productType: 0,
        deliverCharges: 0
    });

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

    const [priceBookData, setPriceBookData] = useState({
        subTotal: 0,
        discount: 0,
        taxes: 0,
        couponDiscount: 0,
        totalCost: 0,
        productType: 0,
    });
    const [showNoCode, setShowNoCode] = useState({
        visible: false,
        title: '',
        description: '',
    });
    const [showDelete, setShowDelete] = useState({ item: null, visible: false });
    const cartDataArray = useSelector(state => state.product.cartData);
    const cartBookingDataArray = useSelector(
        state => state.product.cartBookingData,
    );
    const farmerLanguage = useSelector(state => state.farmer.FarmerLanguageID);
    const [bookingVisible, setBookingVisible] = useState({
        visible: false,
        isSelected: false,
    });
    const [paySuccessVisible, setPaySuccessVisible] = useState({
        visible: false,
        item: '',
    });
    const cartType = route?.params?.cartTypeData;
    const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);
    const StoreCodeDetails = useSelector(
        state => state.farmer.farmerStoreCodeDetails,
    );
    const tabData = [
        { id: 1, title: appLanguage.lblNonFertilizers ?? 'Non - Fertilizers' },
        { id: 2, title: appLanguage.lblFertilizers ?? 'Fertilizers' },
    ];
    const [activeTab, setActiveTab] = useState(tabData[0]);
    const [cartFertilizersData, setCartFertilizersData] = useState([]);
    const [showDeliveryMethodErrro, setShowDeliveryMethodErrro] = useState(false)
    const isfocused = useIsFocused()

    useEffect(() => {
        getAddress()
        if (previousAddress) {
            setCheckBillAdd(false)
        }
    }, [previousAddress])


    useEffect(() => {
        if (isFocussed) {
            setCartData(cartDataArray);
            setCartFertilizersData(cartBookingDataArray);
        }
    }, [isFocussed, cartDataArray]);

    useEffect(() => {
        if (!isEmpty(cartType) && cartType === 'Booking') {
            setActiveTab(tabData[1]);
            getMyCartBooking({
                language: farmerLanguage,
                farmerId: farmerAddress?.farmerIdentityId,
            });
        }
    }, [cartType]);

    useEffect(() => {
        if (activeTab?.id == 2 || isFocussed) {
            getMyCartBooking({
                language: farmerLanguage,
                farmerId: farmerAddress?.farmerIdentityId,
            });
        }
    }, [activeTab, isFocussed]);

    const Card_ArrayData = activeTab.id == 2 ? cartFertilizersData : cartData;


    useEffect(() => {

        if (Card_ArrayData && Card_ArrayData?.length > 0) {
            let price = {
                subTotal: 0,
                discount: 0,
                taxes: 0,
                couponDiscount: 0,
                totalCost: 0,
                productType: 0,
                deliverCharges: 0
            };
            Card_ArrayData?.map((cartItem, cartIndex) => {
                price.subTotal += cartItem?.sellingPrice;
                if (cartItem?.size?.includes('KG') ||
                    cartItem?.size?.includes('kg') ||
                    cartItem?.size?.includes('Kg') ||
                    cartItem?.size?.includes('kG')) {
                    price.productType = 1;
                }
                price.discount += cartItem?.actualPrice - cartItem?.sellingPrice;
            });
            price.totalCost = price.subTotal;
            price.totalCost = price.totalCost - price.couponDiscount;
            setPriceData(price);


            let kgValues = 0;
            let ltValues = 0;

            Card_ArrayData?.map(item => {
                if (item?.size === 'KG') {
                    kgValues += item?.quantity;
                } else if (item?.size === 'LT') {
                    ltValues += item?.quantity;
                }
            });

            let tempParams = {
                kgs: kgValues,
                ltr: ltValues,
                amount: price.subTotal,
                storeCode: StoreCodeDetails.storeCode,
                latitude: address.latitude,
                longitude: address.longitude,
                productType: activeCategory !== "non-fertilizers" ? 1 : 0,
                farmerId: farmerAddress?.farmerIdentityId,
                language: farmerLanguage
            };


            if (deliveryType.type == (appLanguage?.door_delivery ?? "Door Delivery") && checkoutType === "fertilizer") {
                let quantity = 0
                cartBookingDataArray.length > 0 && cartBookingDataArray.forEach(element => {
                    quantity += element.quantity
                });
                if (quantity < 5) {
                    console.log('1')
                    setEnablePayment(false);
                    return
                }
            }
            if (deliveryType.type == 2) {
                setEnablePayment(true);
                return
            }


            if ((address.address1 || address.address2) && address.city && address.pincode && address.state && address.latitude && address.longitude) {
                setEnablePayment(true);
                getDeliveryCharges(tempParams)
            } else {
                setEnablePayment(false);
                return;
            }
            if (deliveryType.type != 2) {
                getDeliveryCharges(tempParams)
            }


        }
    }, [Card_ArrayData, activeTab.id, address.latitude, address.longitude, checkBillAdd]);

    useEffect(() => {

        if (Card_ArrayData && Card_ArrayData?.length > 0) {
            let price = {
                subTotal: 0,
                discount: 0,
                taxes: 0,
                couponDiscount: 0,
                totalCost: 0,
                productType: 0,
            };
            Card_ArrayData?.map((cartItem, cartIndex) => {
                price.subTotal += cartItem?.sellingPrice * cartItem?.quantity;
                if (cartItem?.size?.includes('KG') ||
                    cartItem?.size?.includes('kg') ||
                    cartItem?.size?.includes('Kg') ||
                    cartItem?.size?.includes('kG')) {
                    price.productType = 1;
                }
                price.discount +=
                    cartItem?.actualPrice - cartItem?.sellingPrice * cartItem?.quantity;
            });
            price.totalCost = price?.subTotal;
            price.totalCost = price?.totalCost - price?.couponDiscount;
            setPriceBookData(price);
        }
    }, [Card_ArrayData, activeTab.id]);


    // useEffect(() => {
    //     if (isfocused) dispatch(getMinimumCount())
    //     setPreviousAddress()
    // }, [isfocused])


    // const setPreviousAddress = async () => {
    //     try {
    //         await dispatch(getPreviousAddress(farmerAddress.farmerIdentityId))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    const getMyCart = param => {
        dispatch(operation.product.getMyCart(param))
            .then(res => {
                setCartData(res ?? []);
            })
            .catch(err => {
                const { message, title } = err;
                if (message?.includes('401')) {
                    navigation.dispatch(
                        CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                    );
                } else {
                    dispatch(operation.user.getErrorHandling(err, 'getMyCart'));
                }
            });
    };

    const getMyCartBooking = param => {
        dispatch(operation.product.getMyCartBooking(param))
            .then(res => {
                setCartFertilizersData(res ?? []);
            })
            .catch(err => {
                const { message, title } = err;
                if (message?.includes('401')) {
                    navigation.dispatch(
                        CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                    );
                } else {
                    dispatch(operation.user.getErrorHandling(err, 'getMyCartBooking'));
                }
            });
    };

    const onChangePromo = value => {
        setPromoCode(value);
    };

    const onPressConfirmDelete = (item, index) => {
        setShowDelete({ item: item, visible: true });
    };

    const onPressDelete = (item, index) => {
        let param = {
            cartId: showDelete?.item?.cartId,
        };

        setShowDelete({ item: null, visible: false });

        if (activeTab?.id == 1) {
            dispatch(operation.product.deleteCartProduct(param))
                .then(res => {
                    HEToast(
                        appLanguage?.lblCartItems ?? 'Cart Items successfully deleted',
                        'success',
                    );
                    getMyCart({
                        farmerId: farmerAddress?.farmerIdentityId,
                        language: farmerLanguage,
                    });
                })
                .catch(err => {
                    const { message, title } = err;
                    if (message?.includes('401')) {
                        navigation.dispatch(
                            CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                        );
                    } else {
                        dispatch(operation.user.getErrorHandling(err, 'deleteCartProduct'));
                    }
                });
        } else {
            dispatch(operation.product.deleteCartBookingProduct(param))
                .then(res => {
                    HEToast(
                        appLanguage?.lblCartItems ?? 'Cart Items successfully deleted',
                        'success',
                    );
                    getMyCartBooking({
                        language: farmerLanguage,
                        farmerId: farmerAddress?.farmerIdentityId,
                    });
                })
                .catch(err => {
                    const { message, title } = err;
                    if (message?.includes('401')) {
                        navigation.dispatch(
                            CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                        );
                    } else {
                        dispatch(
                            operation.user.getErrorHandling(err, 'deleteCartBookingProduct'),
                        );
                    }
                });
        }
    };

    const onPressCheckOut = checkoutType => {
        let outOfStock = false;
        cartData.length > 0 && cartData?.map((item, index) => {
            if (
                !item?.inStock ||
                item?.inStock === 'false' ||
                parseInt(item?.sellingPrice) == 0
            ) {
                outOfStock = true;
                return;
            }
        });

        cartFertilizersData.length > 0 && cartFertilizersData?.map((item, index) => {
            if (
                !item?.inStock ||
                item?.inStock === 'false' ||
                parseInt(item?.sellingPrice) == 0
            ) {
                outOfStock = true;
                return;
            }
        });
        if (outOfStock) {
            setShowNoCode({
                visible: true,
                title: appLanguage?.out_of_stock ?? 'Out Of Stock',
                description:
                    appLanguage?.lblremoveproduct ??
                    'Please delete out of stock item from your cart to purchase.',
                type: 'NORMAL',
            });
            return;
        }
        navigation.navigate(Screen.checkoutNew, { checkoutType });
    };

    const onPressAddQuantity = (item, index) => {

        if (activeTab?.id == 1) {
            let tempArr =
                activeTab?.id == 1 ? [...cartData] : [...cartFertilizersData];
            tempArr.map((cartItem, cartIndex) => {
                if (cartIndex === index) {
                    cartItem.actualPrice += cartItem.actualPrice / cartItem.quantity;
                    cartItem.sellingPrice += cartItem.sellingPrice / cartItem.quantity;
                    cartItem.quantity += 1;
                    updateCart(cartItem);
                }
            });
            setCartData(tempArr);
        } else {
            updateCart(item, 'Add');
        }
    };

    const onPressMinusQuantity = (item, index) => {
        if (activeTab?.id == 1) {
            let tempArr =
                activeTab?.id == 1 ? [...cartData] : [...cartFertilizersData];
            tempArr.map((cartItem, cartIndex) => {
                if (cartIndex === index) {
                    cartItem.actualPrice -= cartItem.actualPrice / cartItem.quantity;
                    cartItem.sellingPrice -= cartItem.sellingPrice / cartItem.quantity;
                    cartItem.quantity -= 1;
                    updateCart(cartItem);
                }
            });
            setCartData(tempArr);
        } else {
            updateCart(item, 'Minus');
        }
    };

    const updateCart = (param, type) => {

        let tempParam = {
            farmerId: farmerAddress?.farmerIdentityId,
            id: param?.cartId,
            itemCode: param?.itemNumber,
            quantity:
                activeTab?.id == 1
                    ? param?.quantity
                    : type == 'Minus'
                        ? parseInt(param?.quantity) - 1
                        : parseInt(param?.quantity) + 1,
            productId: param?.productId,
        };
        if (activeTab?.id == 1) {
            dispatch(operation.product.updateProducToCart(tempParam)).catch(err => {
                const { message, title } = err;
                if (message?.includes('401')) {
                    navigation.dispatch(
                        CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                    );
                } else {
                    dispatch(operation.user.getErrorHandling(err, 'updateProducToCart'));
                }
            });
        } else {
            dispatch(operation.product.updateProducToCartBooking(tempParam))
                .then(res => {
                    getMyCartBooking({
                        language: farmerLanguage,
                        farmerId: farmerAddress?.farmerIdentityId,
                    });
                })
                .catch(err => {
                    const { message, title } = err;
                    if (message?.includes('401')) {
                        navigation.dispatch(
                            CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                        );
                    } else {
                        dispatch(
                            operation.user.getErrorHandling(err, 'updateProducToCartBooking'),
                        );
                    }
                });
        }
    };

    const onPressShopNow = () => {
        navigation.replace(Screen.dashboard, {
            screen: appLanguage?.buy_products ?? Screen.product,
        });
    };

    const onPressGoToAddress = type => {
        setShowNoCode({ visible: false, title: '', description: '', type: '' });
        if (type === 'ADDRESS') {
            setTimeout(() => {
                navigation.navigate(Screen.myAccount);
            }, 500);
        }
    };

    const onPressTermsAndCondition = () => {
        Linking.openURL(constants.termsAndCondition);
    };

    const onPressItem = (item, index) => {
        const tempitem = {
            ...item,
            id: item?.productId,
        };
        navigation.navigate(Screen.productDetails, {
            data: tempitem,
            storeCode: farmerAddress?.storeCode,
        });
    };

    const handlePress = id => {
        let selectedData = tabData.filter(e => e.id === id);
        if (selectedData != null && selectedData.length > 0) {
            setActiveTab(selectedData[0]);
        }
    };

    const onPressBook = () => {
        setBookingVisible({ visible: true, isSelected: false });
    };

    const onPressBookingSuccess = () => {
        setPaySuccessVisible({ visible: false, item: '' });
        navigation.navigate(Screen.bookingHistory);
    };

    const onPressBookNow = () => {
        if (isEmpty(farmerAddress?.address?.addressLine1)) {
            setShowNoCode({
                visible: true,
                title: appLanguage?.check_your_address ?? 'Check Your Address',
                description:
                    appLanguage?.lblCheckAddressDecs ??
                    'Please provide your address to make payment.',
            });
            return;
        }
        if (isEmpty(farmerAddress?.storeCode)) {
            setShowNoCode({
                visible: true,
                title: appLanguage?.lblContactTeam ?? 'Contact Coromandel',
                description:
                    appLanguage?.lblNoStoreCodeDecs ??
                    'No store code mapped for the provided address, Please contact Coromandel',
            });
            return;
        }

        let outOfStock = false;
        cartFertilizersData.length > 0 && cartFertilizersData?.map((item, index) => {
            if (
                !item?.inStock ||
                item?.inStock === 'false' ||
                parseInt(item?.sellingPrice) == 0
            ) {
                outOfStock = true;
                return;
            }
        });

        if (outOfStock) {
            setShowNoCode({
                visible: true,
                title: appLanguage?.out_of_stock ?? 'Out Of Stock',
                description:
                    appLanguage?.lblUnabletobooktheproduct ??
                    'Unable to book the product because the selling price is less than zero.',
                type: 'NORMAL',
            });
            return;
        }

        setBookingVisible({ visible: false, isSelected: false });

        let tempParam = {
            farmerId: farmerAddress?.farmerIdentityId,
            language: farmerLanguage,
        };
        dispatch(operation.product.bookNowFromcart(tempParam))
            .then(res => {
                if (res) {
                    setPaySuccessVisible({ visible: true, item: res });
                } else {
                    dispatch(operation.user.getErrorHandling(res, 'bookNow'));
                }
            })
            .catch(err => {
                const { message, title } = err;
                if (message?.includes('401')) {
                    navigation.dispatch(
                        CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                    );
                } else {
                    dispatch(operation.user.getErrorHandling(err, 'bookNowFromcart'));
                }
            });
    };


    const getDeliveryCharges = param => {

        dispatch(operation.farmer.getNewDeliveryCharges(param))
            .then(res => {
                if (
                    typeof res?.validationMessage === 'string' &&
                    res?.validationMessage?.length > 0
                ) {
                    setEnablePayment(false);
                    if (!BookingSuccessVisible.visible) {
                        HEToast(res?.validationMessage ?? '');
                        setErrorMessage(res?.validationMessage)
                        const num = res?.validationMessage.match(/\d+/)?.[0];
                        setDistance(num)
                    }
                    return;
                } else {
                    setEnablePayment(true);
                    // setTransdeliverCharges(res);
                }
                if (deliveryType?.type === (appLanguage?.door_delivery ?? 'Door Delivery')) {
                    setDeliverCharges(res);
                } else {
                    setDeliverCharges(defdelivery_Charge);
                }

            })
            .catch(err => {
                const { message, title } = err;
                if (message?.includes('401')) {
                    navigation.dispatch(
                        CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                    );
                } else {
                    // console.log('kkkkkkkkkkkkkkkkkkkkkkkk')
                    // console.log(err, 'kkk')
                    HEToast(err?.message, 'error');
                    setEnablePayment(false);
                }
            });
    };


    console.log(previousAddress, 'ppppppppppp')

    const checkBillingAddress = () => {
        // Mark this as an intentional change to avoid triggering useEffect
        // setIgnoreNextEffect(true);

        if (checkBillAdd) {
            setCheckBillAdd(false);
            getAddress();
        } else {
            const address = farmerAddress.address;
            const hasLatLng = address && (address.addressLine2 || address.addressLine1);

            if (!hasLatLng) {
                HEToast(
                    'Billing address does not have latitude and longitude. Please enter delivery address.',
                );
            } else {
                const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address.addressLine2 || address.addressLine1)}&key=AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8`;

                fetch(geocodeURL)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'OK' && data.results?.length > 0) {
                            const addressComponents = data.results[0].address_components;
                            const location = data.results[0]?.formatted_address;

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

                            console.log(pincode, 'kkkkkkkkkkkkkkkddddddd');

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
                            placesRef.current?.clear();
                        } else {
                            if (deliveryType.type !== 2) {
                                HEToast(appLanguage.lblSaveDeliveryAddressToProceed ?? 'Location Not found');
                                console.error('Geocoding failed:', data.status);
                            }
                            return;
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching address:', error);
                    })
                    .finally(() => {
                        setLoadMap(false);
                        return false;
                    });

                setCheckBillAdd(true);
            }
        }
    };


    const getAddress = useCallback(
        async address => {
            const preAddress = previousAddress?.deliveryAddress?.deliveryAddress

            if (!preAddress) {
                return
            }

            const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(preAddress)}&key=AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8`;

            setCheckBillAdd(false)
            fetch(geocodeURL)
                .then(response => response.json())
                .then(data => {

                    if (data.status === 'OK' && data.results?.length > 0) {
                        const addressComponents = data.results[0].address_components;
                        const location = data.results[0]?.formatted_address
                        // Safely extract the address components

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
                            )?.long_name || ""; // May not be available in your response

                        const { lat, lng } = data.results[0].geometry.location;

                        const longaddress = location.split(',').slice(1).join(',').trim().split(',');;
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
                        placesRef.current?.clear();
                    } else {
                        if (deliveryType.type !== (appLanguage?.pick_up ?? "Pick Up")) {
                            HEToast(appLanguage.lblSaveDeliveryAddressToProceed ?? 'Location Not found');
                            console.error('Geocoding failed:', data.status);
                        }
                        return
                    }
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                })
                .finally(() => {

                    // setLoadMap(false);
                    return false
                });
        },
        [saveAddress, deliveryType],
    );


    const saveAddress = useCallback(
        async address => {
            const preAddress = address

            console.log(preAddress, 'preAddress')

            const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(preAddress)}&key=AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8`;

            // setCheckBillAdd(false)
            fetch(geocodeURL)
                .then(response => response.json())
                .then(data => {

                    if (data.status === 'OK' && data.results?.length > 0) {
                        const addressComponents = data.results[0].address_components;
                        const location = data.results[0]?.formatted_address
                        // Safely extract the address components

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
                            )?.long_name || ""; // May not be available in your response

                        const { lat, lng } = data.results[0].geometry.location;

                        const longaddress = location.split(',').slice(1).join(',').trim().split(',');;
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
                        placesRef.current?.clear();
                    } else {
                        if (deliveryType.type !== (appLanguage?.pick_up ?? "Pick Up")) {
                            HEToast(appLanguage.lblSaveDeliveryAddressToProceed ?? 'Location Not found');
                            console.error('Geocoding failed:', data.status);
                        }
                        return
                    }
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                })
                .finally(() => {

                    // setLoadMap(false);
                    return false
                });
        },
        [
            address.latitude,
            address.longitude
        ],
    );


    const getAddressFromLatLng = useCallback(
        async (latlng, shomap = true) => {
            // Replace YOUR_GOOGLE_MAPS_API_KEY with your actual API key
            const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.latitude},${latlng.longitude}&key=AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8`;
            if (shomap) {
                setShowMaps(true)
            }
            setCheckBillAdd(false)
            fetch(geocodeURL)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'OK') {
                        let location = data?.results?.[0]?.formatted_address;

                        console.log(location, 'location')
                        placesRef?.current?.setAddressText(location);
                        const addressComponents = data?.results?.[0]?.address_components;

                        const city = (addressComponents ?? []).find(component =>
                            component.types.includes('administrative_area_level_3'),
                        );
                        const state = (addressComponents ?? []).find(component =>
                            component.types.includes('administrative_area_level_1'),
                        );
                        // const pincode = (addressComponents ?? []).find(component =>
                        //   component.types.includes('postal_code'),
                        // );

                        let pincode = data?.results?.[0]?.address_components.find(
                            x => x.types[0] === 'postal_code',
                        );
                        const englishTextPin = pincode?.long_name.replace(
                            /\D/g,
                            '',
                        );

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
                        setRegionDetails(prev => ({
                            ...prev,
                            latitude: latlng?.latitude,
                            longitude: latlng?.longitude,
                        }));
                    } else {
                        console.error('Geocoding failed:', data.status);
                    }
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                })
                .finally(() => {


                    setShowMaps(false)
                    return
                });
        },
        [setAddress],
    );


    console.log(address, 'aaaaaaaaaaaaaad')


    return (
        <View style={{ flex: 1, backgroundColor: "#dfdfdf" }}>
            <MyCartContainer
                onPressBack={() => navigation.goBack()}
                navigation={navigation}
                onChangePromo={onChangePromo}
                promoCode={promoCode}
                showPromo={showPromo}
                setShowPromo={setShowPromo}
                cartData={cartData}
                isLoading={isLoading}
                onPressDelete={onPressDelete}
                onPressCheckOut={onPressCheckOut}
                onPressAddQuantity={onPressAddQuantity}
                onPressMinusQuantity={onPressMinusQuantity}
                priceData={priceData}
                priceBookData={priceBookData}
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                onPressConfirmDelete={onPressConfirmDelete}
                onPressShopNow={onPressShopNow}
                showNoCode={showNoCode}
                setShowNoCode={setShowNoCode}
                onPressGoToAddress={onPressGoToAddress}
                appLanguage={appLanguage}
                onPressTermsAndCondition={onPressTermsAndCondition}
                onPressItem={onPressItem}
                StoreCodeDetails={StoreCodeDetails}
                activeTab={activeTab}
                handlePress={handlePress}
                tabData={tabData}
                onPressBook={onPressBook}
                bookingVisible={bookingVisible}
                setBookingVisible={setBookingVisible}
                onPressBookingSuccess={onPressBookingSuccess}
                setPaySuccessVisible={setPaySuccessVisible}
                paySuccessVisible={paySuccessVisible}
                onPressBookNow={onPressBookNow}
                cartFertilizersData={cartFertilizersData}
                setDeliveryType={setDeliveryType}
                deliveryType={deliveryType}
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
                setActiveTab={setActiveTab}
                setAddress={setAddress}
                address={address}
                enablePayment={enablePayment}
                placesRef={placesRef}
                checkBillingAddress={checkBillingAddress}
                setCheckBillAdd={setCheckBillAdd}
                checkBillAdd={checkBillAdd}
                showDeliveryMethodErrro={showDeliveryMethodErrro}


            />
        </View>
    );
};

export default MyCart;
