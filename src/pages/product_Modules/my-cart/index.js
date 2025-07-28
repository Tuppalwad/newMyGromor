
import React, { useEffect, useState } from 'react';
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
    const [deliveryType, setDeliveryType] = useState('');
    const [activeCategory, setActiveCategory] = useState('non-fertilizers');

    const isLoading = useSelector(state => loadingSelector(state));
    const appLanguage = UserManager?.getAppMultiLanguage;
    const isFocussed = useIsFocused();
    const [promoCode, setPromoCode] = useState('');
    const [showPromo, setShowPromo] = useState(false);
    const [cartData, setCartData] = useState([]);
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

    console.log(showDelete, 'kkkkkkkkkkkk')

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
                // latitude: addressData.latlng.latitude,
                // longitude: addressData.latlng.longitude,
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
            if (deliveryType.type == (appLanguage?.pick_up ?? "Pick Up")) {
                setEnablePayment(true);
                return
            }


            // if ((addressData.addressLine1 || addressData.addressLine2) && addressData.city && addressData.pinCode && addressData.state && addressData.latlng.latitude && addressData.latlng.longitude) {
            //     // setEnablePayment(true);
            //     getDeliveryCharges(tempParams)
            // } else {
            //     setEnablePayment(false);
            //     return;
            // }
            // if (deliveryType.type != (appLanguage?.pick_up ?? "Pick Up")) {
            //     getDeliveryCharges(tempParams)
            // }


        }
    }, [Card_ArrayData, activeTab.id]);

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
                    setTransdeliverCharges(res);
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

            />
        </View>
    );
};

export default MyCart;
