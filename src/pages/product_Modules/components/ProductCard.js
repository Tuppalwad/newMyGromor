import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { CommonActions, useIsFocused, useNavigation } from "@react-navigation/native";
import CustomButton from "../../../components/common/CustomButton";
import { defConfigImageURL } from "../../dashboard_modules/tabs/home/index.service";
import { useDispatch, useSelector } from "react-redux";
import HartIcon from '../../../assets/drawer/favourite.png'
import LikeIcon from '../../../assets/images/common/LikeIcon.png'
import CustomPopupModal from "../../../components/common/CustomPopupModal";
import CTText from "../../../components/ctText";
import { Screen } from "../../../router/screen";
import { palette } from "../../../theme/color";
import { UserManager } from "../../../storage";
import { useOperation } from "../../../redux/operation";
import { Icon } from "../../../../assets/images";
import { HEToast } from "../../../components/toast";
import { isEmpty } from "../../../utils/validator";

const ProductCard = ({ showRemove = false, item, onPressProductItem, index, onPressFavourite, type, onPressDeleteFav, onpressRemove = null }) => {

    const isFocussed = useIsFocused();
    const weightOptions = ['30 Kg', '50 Kg', '100 Kg']
    const [selectedWeight, setSelectedWeight] = useState(item?.size);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const BannerData = useSelector(state => state.product.bannerData);
    const productCategoryData = useSelector(state => state.product.productCategory);
    const appLanguage = UserManager?.getAppMultiLanguage;
    const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);
    const farmerLanguage = useSelector(state => state.farmer.FarmerLanguageID);
    const [isUpdateCart, setIsUpdateCart] = useState({});
    const [isAddedTocart, setIsAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const productType = productCategoryData?.filter((id) => id.id == item?.categoryId)[0]?.code;
    const cartBookingDataArray = useSelector(
        state => state.product.cartBookingData,
    );

    const cartDataArray = useSelector(state => state.product.cartData);

    // useEffect(() => {
    //     if (!isEmpty(cartBookingDataArray)) {
    //         for (let i = 0; i < cartBookingDataArray.length; i++) {
    //             if (
    //                 parseInt(cartBookingDataArray[i].productId) ===
    //                 parseInt(item?.id)
    //             ) {
    //                 setIsAddedToCart(true);
    //                 setQuantity(cartBookingDataArray[i].quantity ?? 1);
    //                 setIsUpdateCart(cartBookingDataArray[i]);
    //             }
    //         }
    //     }
    // }, [cartBookingDataArray, isFocussed]);

    const [showNoCode, setShowNoCode] = useState({
        visible: false,
        title: '',
        description: '',
    });

    const onPressGoToAddress = () => {
        setShowNoCode({ visible: false, title: '', description: '' });
        navigation.navigate(Screen.myAccount);
    };

    const operation = useOperation();


    const onPressCartValidation = (type, type_ID) => {
        if (type === 'BUY') {
            navigation.navigate(Screen.myCart, { cartTypeData: type_ID });
        } else {
            HEToast(
                appLanguage?.added_to_cart ?? 'Successfully added to cart',
                'success',
            );
            setIsAddedToCart(true);
        }
    };


    const onPressAddToCart = (type = 'ADD') => {


        const checkItem = cartDataArray.filter(data => data?.productId == item.id);
        console.log(checkItem, 'kkkkkk')

        if (checkItem.length > 0) {
            HEToast(
                'Already added to cart',
                'info',
            );
            return
        }


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
                title: appLanguage?.lblcontactcoromandel ?? 'Contact Coromandel',
                description:
                    appLanguage?.lblNoStoreCodeDecs ??
                    'No store code mapped for the provided address, Please contact Coromandel',
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
            });
            return;
        }

        let type_ID = item?.productType == 'F' ? 'Booking' : 'Cart';

        //   navigation.navigate(Screen.myCart, {cartTypeData: type_ID});

        let param = {
            farmerId: farmerAddress?.farmerIdentityId,
            id: 0,
            itemCode: item?.itemNumber,
            quantity: 1,
            productId: item?.id ?? 0,
        };

        if (item?.productType == 'F') {
            if (!isEmpty(isUpdateCart)) {
                let tempParam = {
                    farmerId: farmerAddress?.farmerIdentityId,
                    id: isUpdateCart.cartId ?? 0,
                    itemCode: selecetdQuantityData?.itemNumber,
                    quantity: quantity,
                    productId: productDetails?.id ?? 0,
                };
                dispatch(operation.product.updateProducToCartBooking(tempParam))
                    .then(res => {
                        dispatch(
                            operation.product.getMyCartBooking({
                                farmerId: farmerAddress.farmerIdentityId,
                                language: farmerLanguage,
                            }),
                        );
                        onPressCartValidation(type, type_ID);
                    })
                    .catch(err => {
                        const { message, title } = err;
                        if (message?.includes('401')) {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [{ name: Screen.welcome }],
                                }),
                            );
                        } else {
                            dispatch(
                                operation.user.getErrorHandling(
                                    err,
                                    'updateProducToCartBooking',
                                ),
                            );
                        }
                    });
            } else {
                dispatch(operation.product.postProducToCartBooking(param))
                    .then(res => {
                        dispatch(
                            operation.product.getMyCartBooking({
                                farmerId: param.farmerId,
                                language: farmerLanguage,
                            }),
                        );
                        onPressCartValidation(type, type_ID);
                    })
                    .catch(err => {
                        const { message, title } = err;
                        if (message?.includes('401')) {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [{ name: Screen.welcome }],
                                }),
                            );
                        } else {
                            dispatch(
                                operation.user.getErrorHandling(
                                    err,
                                    'postProducToCartBooking',
                                ),
                            );
                        }
                    });
            }
        } else {
            dispatch(operation.product.postProducToCart(param))
                .then(res => {
                    dispatch(
                        operation.product.getMyCart({
                            farmerId: farmerAddress?.farmerIdentityId,
                            language: farmerLanguage,
                        }),
                    );
                    onPressCartValidation(type);
                })
                .catch(err => {
                    const { message, title } = err;
                    if (message?.includes('401')) {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [{ name: Screen.welcome }],
                            }),
                        );
                    } else {
                        dispatch(
                            operation.user.getErrorHandling(err, 'postProducToCart'),
                        );
                    }
                });
        }
    };

    console.log(type, 'llllllll')

    return (
        <View style={styles.card}>
            <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{item?.brand}</Text>
                {type !== "isfovourite" && <TouchableOpacity
                    onPress={() => { item?.isFavouriteProduct ? onPressDeleteFav(item, index, type) : onPressFavourite(item, index, type) }}
                >
                    {item?.isFavouriteProduct ? <Image
                        source={LikeIcon}
                        style={{
                            width: 20, height: 20,
                            tintColor: 'green'
                        }}
                        resizeMode="contain"
                    /> :
                        <Image
                            source={HartIcon}
                            style={{
                                width: 16, height: 16,
                                tintColor: 'green'
                            }}
                            resizeMode="contain"
                        />
                    }

                </TouchableOpacity>}
            </View>

            <TouchableOpacity
                onPress={() => onPressProductItem(item)}
            >
                <Image source={{ uri: defConfigImageURL(BannerData.imageBaseURL, item?.side1) }} style={styles.productImage} resizeMode={'contain'} />

                <Text style={styles.type}>{productType}</Text>
                <Text style={styles.cropType}>{item?.cropType}</Text>
                <Text style={styles.productName}>{item?.productName}</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 20 }}>
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                        onPress={() => setShowDropdown(!showDropdown)}
                        style={styles.dropdownButton}
                    >
                        <Text style={styles.dropdownText}>{selectedWeight}</Text>
                    </TouchableOpacity>

                    {showDropdown && (
                        <ScrollView style={styles.dropdown}>
                            {weightOptions.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setSelectedWeight(option);
                                        setShowDropdown(false);
                                    }}
                                    style={styles.dropdownItem}
                                >
                                    <Text>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>
            </View>


            <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{item?.sellingPrice}</Text>
                <Text style={styles.originalPrice}>₹{item?.mrp}</Text>
            </View>

            {/* <View style={styles.addButton}> */}
            {
                type == "isfovourite" ?
                    <CustomButton title={"Move to Cart"} show={false} onPress={() => onPressAddToCart()} />
                    :
                    <CustomButton title={"Add to Cart"} onPress={() => onPressAddToCart()} />}
            {/* </View> */}

            {showRemove && <View style={{ paddingVertical: 10 }}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => onpressRemove(item)}>
                    <Text style={styles.cancelText}>Remove</Text>
                </TouchableOpacity>
            </View>}

            <CustomPopupModal
                visible={showNoCode?.visible}
                icon={Icon.warning}
                isRed={true}
                title={showNoCode?.title}
                buttonText={appLanguage?.is_done ?? 'Done'}
                BottomPopupStatus={true}
                onPressDone={() => { onPressGoToAddress() }}>
                <CTText
                    text={showNoCode?.description}
                    semiBold
                    textColor={palette.grey}
                    style={{ textAlign: 'center' }}
                />
            </CustomPopupModal>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        width: 200,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eee',
        padding: 9,
        marginRight: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    badgeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    badgeText: {
        backgroundColor: '#FFD700',
        color: '#000',
        fontSize: 10,
        paddingHorizontal: 5,
        paddingVertical: 4,
        borderRadius: 4,
        borderTopRightRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    heart: {
        fontSize: 14,
        color: '#888',
        lineHeight: 10,
    },
    productImage: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    type: {
        fontSize: 10,
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    cropType: {
        fontSize: 10,
        color: '#1E8153',
        marginBottom: 8,
    },
    productName: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 4,
        lineHeight: 10,
    },
    dropdownContainer: {
        position: 'relative',
        zIndex: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        backgroundColor: '#fff',
        // height:300
    },

    dropdownButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },

    dropdownText: {
        fontSize: 14,
    },

    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 6,
        marginTop: 4,
        // elevation: 5, // for Android shadow
        shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 4,

        zIndex: 999,
    },

    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    priceContainer: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        lineHeight: 20,
    },
    originalPrice: {
        fontSize: 12,
        color: '#f52f2f',
        textDecorationLine: 'line-through',
        lineHeight: 10,
    },
    addButton: {
        borderRadius: 6,
        alignItems: 'center',
    },

    cancelButton: {
        borderWidth: 1,
        borderColor: '#F36D45',
        borderRadius: 8,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
        color: '#F36D45',
        fontWeight: '600',
    },
});
