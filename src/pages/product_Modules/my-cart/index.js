
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Linking, Platform, NativeEventEmitter } from 'react-native';
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
import CustomPopupModal from '../../../components/common/CustomPopupModal';
import { Icon } from '../../../../assets/images';
import { RFValue } from 'react-native-responsive-fontsize';
import { palette } from '../../../theme/color';
import CTText from '../../../components/ctText';
import { BUILD, BuildTypes, Configuration, DEV_BASE_URL, PAYMENT_KEY, PAYMENT_SALT } from '../../../config';
import Indicator from '../../../components/common/Indicator';
import ConfirmationModal from '../../../components/common/ConfirmationModal';
import PayUBizSdk from 'payu-non-seam-less-react';
import SelectLocationScreen from '../../../components/common/SelectLocationScreen';
import { sha512 } from 'js-sha512';
import SuccessScreen from '../components/SuccessScreen';

let PayUBizSdk_Input = {
    key: PAYMENT_KEY,
    success: Configuration.ProductURL + '/product/payment/success',
    failure: Configuration.ProductURL + '/product/payment/failure',
    environment: BUILD === BuildTypes.Production ? '0' : '1',
    primaryColor: palette.titleGreen,
    secondaryColor: palette.white,
    merchantResponseTimeout: 10000,
    surePayCount: 1,
    showExitConfirmationOnCheckoutScreen: true,
    showExitConfirmationOnPaymentScreen: true,
    autoSelectOtp: true,
    showCbToolbar: true,
    autoApprove: true,
    merchantSMSPermission: false,
    merchant_Name: 'MyGromor',
};


let defdelivery_Charge = {
    deliveryCharge: 0,
    deliveryChargeCalc: 0,
    deliveryChargeDiscount: 0,
};

var txnid = '';
var hashCode = '';

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
    const [transId, setTransId] = useState({ orderId: '', transactionId: '' });
    const [showSuccess, setShowSuccess] = useState(false)
    const [showMap, setShowMap] = useState(false);
    const [deliverCharges, setDeliverCharges] = useState(defdelivery_Charge);
    const [deliveryType, setDeliveryType] = useState('');
    const [activeCategory, setActiveCategory] = useState('non-fertilizers');
    const [enablePayment, setEnablePayment] = useState(false);
    const isLoading = useSelector(state => loadingSelector(state));
    const { previousAddress } = useSelector(state => state.user);
    const [checkBillAdd, setCheckBillAdd] = useState(true);
    const [allowTerm, setAllowTerm] = useState(false)
    const appLanguage = UserManager?.getAppMultiLanguage;
    const isFocussed = useIsFocused();
    const [promoCode, setPromoCode] = useState('');
    const [showPromo, setShowPromo] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    const [distance, setDistance] = useState();
    const [loading, setLoading] = useState(false)
    const [CodVisible, setCODVisible] = useState(false);
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

    const [CODSuccessVisible, setCODSuccessVisible] = useState({
        visible: false,
        transId: '',
    });

    const addressString = useMemo(
        () =>
            Object.entries(address)
                .map(([key, value]) => value)
                .join(', '),
        [address],
    );

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

    const [payFailureVisible, setPayFailureVisible] = useState({
        visible: false,
        title: '',
        description: '',
        type: '',
        buttonText: '',
    });

    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(PayUBizSdk);

        const payUOnPaymentSuccess = eventEmitter.addListener(
            'onPaymentSuccess',
            onPaymentSuccess,
        );
        const payUOnPaymentFailure = eventEmitter.addListener(
            'onPaymentFailure',
            onPaymentFailure,
        );
        const payUOnPaymentCancel = eventEmitter.addListener(
            'onPaymentCancel',
            onPaymentCancel,
        );
        const payUOnError = eventEmitter.addListener('onError', onError);
        const payUGenerateHash = eventEmitter.addListener('generateHash', generateHash);

        return () => {
            payUOnPaymentSuccess.remove();
            payUOnPaymentFailure.remove();
            payUOnPaymentCancel.remove();
            payUOnError.remove();
            payUGenerateHash.remove();
        };
    }, []);


    useEffect(() => {
        getAddress()
        checkBillingAddress()
    }, [previousAddress, checkBillAdd])


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


            if (deliveryType == 1 && activeTab.id === 2) {
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


            if ((address.address1 || address.address2) && address.city && address.state && address.latitude && address.longitude) {
                getDeliveryCharges(tempParams)
                setEnablePayment(true);
            } else {
                setEnablePayment(false);
                return;
            }

        }
    }, [Card_ArrayData, activeTab.id, address.latitude, address.longitude, checkBillAdd,]);


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
    //     const eventEmitter = new NativeEventEmitter(PayUBizSdk);

    //     const payUOnPaymentSuccess = eventEmitter.addListener(
    //         'onPaymentSuccess',
    //         onPaymentSuccess,
    //     );
    //     const payUOnPaymentFailure = eventEmitter.addListener(
    //         'onPaymentFailure',
    //         onPaymentFailure,
    //     );
    //     const payUOnPaymentCancel = eventEmitter.addListener(
    //         'onPaymentCancel',
    //         onPaymentCancel,
    //     );
    //     const payUOnError = eventEmitter.addListener(
    //         'onError',
    //         onError,
    //     );
    //     const payUGenerateHash = eventEmitter.addListener(
    //         'generateHash',
    //         generateHash,
    //     );

    //     return () => {
    //         payUOnPaymentSuccess.remove();
    //         payUOnPaymentFailure.remove();
    //         payUOnPaymentCancel.remove();
    //         payUOnError.remove();
    //         payUGenerateHash.remove();
    //     };
    // }, []);


    const onPaymentSuccess = e => {
        const paymentData = JSON.parse(e?.payuResponse);
        const paymentId = JSON.parse(e?.payuResponse)?.id;
        setTransId(paymentId);
        if (paymentData?.bank_ref_no) {
            let params = {
                transactionId: txnid,
                mobileNumber: farmerAddress?.mobileNumber,
                paymentStatus: 'success',
                paymentReference: paymentData?.bank_ref_no,
                storeCode: farmerAddress?.storeCode,
                villageCode: farmerAddress?.villageCode,
                name: farmerAddress?.name ?? 'Gromor',
                farmerId: farmerAddress?.farmerIdentityId,
                paymentCode: 4,
                tenderCode: 2,
                paymentMode: paymentData?.mode,
                paymentGatewayResponse: paymentData,
            };

            if (paymentData?.mihpayid) {
                params.mihpayid = paymentData?.mihpayid;
            } else {
                params.mihpayid = paymentData?.id;
            }
            dispatch(operation.payment.paymentUpdate(params))
                .then(res => {

                    if (!isEmpty(res)) {
                        setShowSuccess(true)
                        setCODSuccessVisible({ visible: true, transId: txnid });
                        getMyCart({ farmerId: farmerAddress?.farmerIdentityId });
                        getNotification();
                        setPaySuccessVisible(true);
                    } else {
                        setPayFailureVisible({
                            visible: true,
                            title: appLanguage?.warning ?? 'Warning!',
                            buttonText: appLanguage?.okay ?? 'Okay',
                            description: `${appLanguage?.lblPaymentreceived ??
                                'Payment received unable to generate order now so please check after sometime in MY ORDER HISTORY, use the below Id for your reference'
                                } \n${appLanguage?.order_no ?? 'Order Id:'} #${txnid}`,
                        });
                    }
                })
                .catch(err => {
                    setPayFailureVisible({
                        visible: true,
                        title: err.description ?? '',
                        buttonText: appLanguage?.okay ?? 'Okay',
                        description: `${appLanguage?.lblPaymentreceived ??
                            'Payment received unable to generate order now so please check after sometime in MY ORDER HISTORY, use the below Id for your reference'
                            } \n${appLanguage?.order_no ?? 'Order Id:'} #${txnid}`,
                    });
                    dispatch(operation.user.getErrorHandling(err, 'paymentUpdate'));
                });
        } else {
            paymentUpdate_Method(
                appLanguage?.lblBankreferencenumber ?? 'Bank reference number is empty',
            );
            setPayFailureVisible({
                visible: true,
                title: appLanguage?.lblorderfailed ?? 'Order Failed!',
                buttonText: appLanguage?.lblTryagain ?? 'Try again',
                description:
                    appLanguage?.lblSorryBankreference ??
                    'Sorry,Bank reference number is empty',
            });
        }
    };


    const onPaymentFailure = e => {
        paymentUpdate_Method(appLanguage?.lblpaymentfailed ?? 'Payment Failed!');
        setPayFailureVisible({
            visible: true,
            title: appLanguage?.lblpaymentfailed ?? 'Payment Failed!',
            buttonText: appLanguage?.lblTryagain ?? 'Try again',
            description:
                appLanguage?.lblSorryyourorderhasfailed ??
                'Sorry, your payment has been failed.',
        });
    };

    const onError = e => {
        console.log('onError', e);
        paymentUpdate_Method(appLanguage?.['lblPaymentError!'] ?? 'Payment Error');
        setPayFailureVisible({
            visible: true,
            title: appLanguage?.['lblPaymentError!'] ?? 'Payment Error',
            buttonText: appLanguage?.lblTryagain ?? 'Try again',
            description:
                appLanguage?.lblSorryyourorderhasfailed ??
                'Sorry, your order has been failed.',
        });
    };

    const onPaymentCancel = e => {
        console.log('onPaymentCancel', e);
        paymentUpdate_Method('Payment Cancelled');
        setPayFailureVisible({
            visible: true,
            title: appLanguage?.lblordercancelled ?? 'Order Cancelled!',
            buttonText: appLanguage?.lblTryagain ?? 'Try again',
            description:
                appLanguage?.lblyourordercancelled ??
                'Sorry, your order has been cancelled.',
        });
    };

    const paymentUpdate_Method = Error_Name => {
        let params = {
            transactionId: txnid,
            mobileNumber: farmerAddress?.mobileNumber,
            paymentStatus: Error_Name,
            storeCode: farmerAddress?.storeCode,
            villageCode: farmerAddress?.villageCode,
            name: farmerAddress?.name ?? 'Gromor',
            farmerId: farmerAddress?.farmerIdentityId,
            paymentCode: 4,
            tenderCode: 2,
        };
        dispatch(operation.payment.paymentUpdate(params));
    };

    let generateHash = e => {
        var hashName = e.hashName;
        var result = { [hashName]: hashCode };
        sendBackHash(e.hashName, e.hashString + PAYMENT_SALT);
    };

    const sendBackHash = (hashName, hashData) => {
        // dispatch(operation.payment.paymentHash(hashData)).then(response => {
        const response = calculateHash(hashData);
        var result = { [hashName]: response };
        console.log('hash result :>> ', result);
        PayUBizSdk.hashGenerated(result);
        // });
    };

    const calculateHash = data => {
        console.log('Hash -- data', data);
        const result = sha512(data);
        console.log(result);
        return result;
    };

    const createPaymentParams = data => {
        try {
            txnid = data.transactionid;
            let payUPaymentParams = {
                key: PayUBizSdk_Input.key,
                transactionId: txnid,
                amount: data.amount.toString(),
                productInfo: data.productinfo,
                firstName: data.firstname,
                email: data.email,
                phone: data.phone,
                ios_surl: PayUBizSdk_Input.success,
                ios_furl: PayUBizSdk_Input.failure,
                android_surl: PayUBizSdk_Input.success,
                android_furl: PayUBizSdk_Input.failure,
                environment: PayUBizSdk_Input.environment,
                userCredential: farmerAddress?.farmerIdentityId,
                additionalParam: {
                    udf1: data.udf1,
                    udf2: data.udf2,
                    udf3: data.udf3,
                },
            };

            let payUCheckoutProConfig = {
                primaryColor: PayUBizSdk_Input.primaryColor,
                secondaryColor: PayUBizSdk_Input.secondaryColor,
                merchantName: PayUBizSdk_Input.merchant_Name,
                // showExitConfirmationOnCheckoutScreen: PayUBizSdk_Input.showExitConfirmationOnCheckoutScreen,
                // showExitConfirmationOnPaymentScreen: PayUBizSdk_Input.showExitConfirmationOnPaymentScreen,
                // surePayCount: PayUBizSdk_Input.surePayCount,
                // merchantResponseTimeout: PayUBizSdk_Input.merchantResponseTimeout,
                // autoSelectOtp: PayUBizSdk_Input.autoSelectOtp,
                // autoApprove: PayUBizSdk_Input.autoApprove,
                // merchantSMSPermission: PayUBizSdk_Input.merchantSMSPermission,
                // showCbToolbar: PayUBizSdk_Input.showCbToolbar,
            };

            return {
                payUPaymentParams: payUPaymentParams,
                payUCheckoutProConfig: payUCheckoutProConfig,
            };
        } catch (e) { }
    };


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


    const onPressCheckOut = (type = 'COD') => {

        try {
            setCODVisible(false);
            hashCode = '';
            let outOfStock = false;
            cartData.length > 0 && cartData?.map((item, index) => {
                if (!item?.inStock || item?.inStock === 'false') {
                    outOfStock = true;
                    return;
                }
            });

            cartBookingDataArray.length > 0 && cartBookingDataArray?.map((item, index) => {
                if (!item?.inStock || item?.inStock === 'false') {
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
                        'Please remove out of stock products before making payment',
                    type: 'NORMAL',
                });
                return;
            }
            if (
                isEmpty(farmerAddress?.address?.addressLine1) ||
                isEmpty(addressString) && deliveryType == 1
            ) {
                setShowNoCode({
                    visible: true,
                    title: appLanguage?.check_your_address ?? 'Check Your Address',
                    description:
                        appLanguage?.lblCheckAddressDecs ??
                        'Please provide your address to make payment.',
                    type: 'ADDRESS',
                });
                return;
            }

            if (isEmpty(addressString) && deliveryType == 1) {
                setShowNoCode({
                    visible: true,
                    title: appLanguage?.check_your_address ?? 'Check Your Address',
                    description:
                        appLanguage?.lblCheckAddressDecs ??
                        'Please provide your address to make payment.',
                    type: 'ADDRESS',
                });
                return;
            }

            if (isEmpty(farmerAddress?.storeCode)) {
                setShowNoCode({
                    visible: true,
                    title: appLanguage?.lblcontactcoromandel ?? 'Contact Coromandel',
                    description:
                        appLanguage?.lblNoStoreCodeDecs ??
                        'No store code mapped for the provided address, Please contact Coromandel',
                    type: 'ADDRESS',
                });
                return;
            }
            if (isEmpty(farmerAddress?.villageCode)) {
                setShowNoCode({
                    visible: true,
                    title: appLanguage?.lblcontactcoromandel ?? 'Contact Coromandel',
                    description:
                        appLanguage?.lblNoVillageCodeDecs ??
                        'No village code mapped for the provided address, Please contact Coromandel',
                    type: 'ADDRESS',
                });
                return;
            }
            getOrderPlacedmethod(type);
        } catch (e) {
            console.log(e)
        }
    };


    const getOrderPlacedmethod = async (type) => {

        if (deliveryType == "") {
            setShowDeliveryMethodErrro(true)
            return
        }
        setLoading(true)

        try {
            let tempOrderData = [];

            if (activeTab.id === 2) {
                cartBookingDataArray.forEach(data => {
                    tempOrderData.push({
                        itemNumber: data.itemNumber,
                        costingId: data.costingId,
                        quantity: data.quantity,
                        actualPrice: data.actualPrice,
                        priceAfterDiscount: data.sellingPrice,
                        productInfo: data.nameToShowOnSite,
                    });
                });
            }
            else {
                cartData.forEach(data => {
                    tempOrderData.push({
                        itemNumber: data.itemNumber,
                        costingId: data.costingId,
                        quantity: data.quantity,
                        actualPrice: data.actualPrice,
                        priceAfterDiscount: data.sellingPrice,
                        productInfo: data.nameToShowOnSite,
                    });
                });

            }

            let tempData = {
                farmerId: farmerAddress.farmerIdentityId,
                devicePlatform: Platform.OS,
                environment: PayUBizSdk_Input.environment,
                deliveryType:
                    deliveryType == 2 ? 1 : 2,
                deliveryCharge:
                    deliveryType !== 2
                        ? deliverCharges?.deliveryCharge ?? 0
                        : 0,
                deliveryChargeDiscount:
                    deliveryType !== 2
                        ? deliverCharges?.deliveryChargeDiscount
                        : 0,
                deliveryChargeCalc:
                    deliveryType !== 2
                        ? deliverCharges?.deliveryChargeCalc
                        : 0,
                storeCode: farmerAddress?.storeCode,
                orderItems: tempOrderData,
            };

            if (type === 'COD') {
                const COD_payload = {
                    ...tempData,
                    deliveryAddress: addressString,
                    latitude: address.latitude,
                    longitude: address.longitude,
                };
                dispatch(operation.payment.generateCodOrder(COD_payload))
                    .then(res => {
                        if (res.errors == null || res.errors.length === 0) {
                            getMyCart({ farmerId: farmerAddress?.farmerIdentityId });
                            getNotification();
                            // navigation.navigate(Screen.SuccessScreen)
                            setCODSuccessVisible({ visible: true, transId: res });
                            setShowSuccess(true)

                        } else {

                            dispatch(operation.user.getErrorHandling(res, 'createTransaction'));
                        }
                        setLoading(false)
                    })
                    .catch(err => {
                        setLoading(false)

                        const { message, title } = err;
                        if (message?.includes('401')) {
                            navigation.dispatch(
                                CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                            );
                        } else {
                            dispatch(operation.user.getErrorHandling(err, 'createTransaction'));
                        }
                    });

            } else if (type === 'Predpaid') {
                dispatch(operation.payment.generatePredpaidOrder(tempData))
                    .then(res => {
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
                                        priceData.totalCost + deliverCharges?.deliveryCharge,
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

                                PayUBizSdk.openCheckoutScreen(preparedData);

                            } else {
                                dispatch(
                                    operation.user.getErrorHandling(res, 'createTransaction'),
                                );

                            }
                            setLoading(false)
                        } else {
                            dispatch(operation.user.getErrorHandling(res, 'createTransaction'));
                            setLoading(false)

                        }
                    })
                    .catch(err => {
                        console.log('err', err);
                        setLoading(false)

                        const { message, title } = err;
                        if (message?.includes('401')) {
                            navigation.dispatch(
                                CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                            );
                        } else {
                            dispatch(operation.user.getErrorHandling(err, 'createTransaction'));
                        }
                    });
            } else if (type === 'Booking') {
                let bookingPayload = {
                    deliveryType:
                        deliveryType == 2 ? 1 : 2,
                    deliveryCharge:
                        deliveryType !== 2
                            ? deliverCharges?.deliveryCharge ?? 0
                            : 0,
                    deliveryChargeDiscount:
                        deliveryType !== 2
                            ? deliverCharges?.deliveryChargeDiscount
                            : "",
                    deliveryChargeCalc:
                        deliveryType !== 2
                            ? deliverCharges?.deliveryChargeCalc
                            : "",
                    storeCode: farmerAddress?.storeCode,
                    deliveryAddress: addressString,
                    latitude: address.latitude,
                    longitude: address.longitude,
                    farmerId: farmerAddress.farmerIdentityId,
                    language: farmerLanguage
                };

                dispatch(operation.product.bookNowFromcart(bookingPayload))
                    .then(async res => {
                        if (res?.bookingId && res?.bookingId?.length != 0) {
                            setBookingSuccessVisible({ visible: true, transId: res });
                            const parms = {
                                farmerId: farmerAddress?.farmerIdentityId,
                                language: farmerLanguage,
                            }
                            await dispatch(operation.product.getMyCart(parms))
                            await dispatch(operation.product.getMyCartBooking(parms))

                            // navigation.navigate(Screen.SuccessScreen)
                            setShowSuccess(true)


                        } else {
                            dispatch(operation.user.getErrorHandling(res, 'bookNow'));
                        }
                        setLoading(false)

                    })
                    .catch(err => {
                        const { message, title } = err;
                        setLoading(false)

                        if (message?.includes('401')) {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [{ name: Screen.welcome }],
                                }),
                            );
                        } else {
                            dispatch(operation.user.getErrorHandling(err, 'bookNowFromcart'));
                        }
                    });
            } else {
                setLoading(false)

                HEToast(appLanguage?.something_went_wrong_try ?? 'Something went wrong', 'error');
            }
        } catch (error) {
            console.log(error, 'e')
            setLoading(false)

        }


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
                    HEToast(err?.message, 'error');
                    setEnablePayment(false);
                }
            });
    };


    const checkBillingAddress = () => {

        if (!checkBillAdd) {
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
        [saveAddress, deliveryType],
    );


    const saveAddress = useCallback(

        async address => {
            const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8`;

            fetch(geocodeURL)
                .then(response => response.json())
                .then(data => {

                    if (data.status === 'OK' && data.results?.length > 0) {

                        const { lat, lng } = data.results[0].geometry.location;

                        setAddress(prev => ({
                            ...prev,
                            latitude: lat,
                            longitude: lng
                        }));
                        // placesRef.current?.clear();
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
                    return false
                });
        },
        [
            address.latitude,
            address.longitude
        ],
    );

    const getNotification = () => {
        let param = {
            userId: farmerAddress?.farmerIdentityId,
            hasRead: 1,
        };
        dispatch(operation.farmer.getNotification(param));
    };

    return (
        <>
            {showMap ? <SelectLocationScreen address={address} setAddress={setAddress} setShowMap={setShowMap} /> :
                showSuccess ? <SuccessScreen
                    setShowSuccess={setShowSuccess}
                    title={payFailureVisible.visible ? "Payment failed" : activeTab?.id == 1 ? "Ordered Successfully!" : " Booked Successfully!"}
                    subtitle={
                        payFailureVisible.visible ? payFailureVisible?.description :
                            activeTab?.id == 1 ? `${appLanguage?.lblyourordersuccessfull ??
                                'Your order has been placed successfully, use the below Id for your reference'
                                }\n${appLanguage?.order_no ?? 'Order Id:'} #${CODSuccessVisible.transId ?? ''
                                }` : `${appLanguage?.lblyourordersuccessfull ??
                                'Your order has been placed successfully, use the below Id for your reference'
                                }\n${appLanguage?.order_no ?? 'Order Id:'} #${BookingSuccessVisible.transId?.bookingId ?? ''
                            }`
                    }
                    state={activeTab?.id == 1 ? "purchases" : "bookings"}
                    path={Screen.MyOrder}
                />
                    :
                    <View style={{ flex: 1, backgroundColor: "#dfdfdf" }}>
                        <MyCartContainer
                            onPressBack={() => navigation.goBack()}
                            navigation={navigation}
                            onChangePromo={onChangePromo}
                            promoCode={promoCode}
                            setShowMap={setShowMap}
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
                            allowTerm={allowTerm}
                            setAllowTerm={setAllowTerm}
                            setCODVisible={setCODVisible}
                            CodVisible={CodVisible}
                            setShowDeliveryMethodErrro={setShowDeliveryMethodErrro}
                            saveAddress={saveAddress}
                        />
                        <ConfirmationModal
                            visible={CodVisible ?? false}
                            title="Confirm"
                            subtitle={"Are you sure you want to place the order with Cash on Delivery?"}
                            onCancel={() => setCODVisible(false)}
                            onConfirm={() => { onPressCheckOut('COD') }}
                            position="bottom"
                        />

                        <Indicator show={loading} />

                    </View>
            }
        </>


    );
};

export default MyCart;
