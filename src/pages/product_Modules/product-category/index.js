import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserManager } from '../../../storage';
import { useOperation } from '../../../redux/operation';
import { useDispatch, useSelector } from 'react-redux';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { useIsFocused } from '@react-navigation/native';
import { ProductType } from '../../../redux/product/type';
import { UserType } from '../../../redux/user/type';
import ShopScreen from './ShopScreen';
import { isEmpty } from '../../../utils/validator';
import Indicator from '../../../components/common/Indicator';
import { Screen } from '../../../router/screen';
import { HEToast } from '../../../components/toast';

const ProductCategories = ({ navigation }) => {

    UserManager.loadUser();
    const appLanguage = UserManager?.getAppMultiLanguage;
    const operation = useOperation();
    const dispatch = useDispatch();

    const loadingSelector = createLoadingSelector([
        ProductType.productCategory,
        ProductType.myCart,
        ProductType.allDealersAddress,
        ProductType.addFavProduct,
        ProductType.productByStoreCode,
        ProductType.productByStoreCode_type,
        ProductType.dealerAddressByLoc,
        UserType.magicVillageList,
        ProductType.deleteFavProduct,
    ]);

    const isLoading = useSelector(state => loadingSelector(state));
    const isFocussed = useIsFocused();
    const productCategoryData = useSelector(
        state => state.product.productCategory,
    );
    const [searchData, setSearchData] = useState(null);
    const [dealersAddress, setDealersAddress] = useState([]);
    const [newProductData, setNewProductData] = useState([]);
    const [subProductCategory, setSubProductCategory] = useState([]);

    const [popularProductData, setPopularProductData] = useState([]);
    const [newProductResponseData, setNewProductResponseData] = useState(null);
    const [popularProductResponseData, setPopularProductResponseData] =
        useState(null);
    const [showNoCode, setShowNoCode] = useState(false);
    const [categoryMoreStatus, setCategoryMoreStatus] = useState(false);
    const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);
    const farmerLanguage = useSelector(state => state.farmer.FarmerLanguageID);
    const StoreCodeDetails = useSelector(state => state.farmer.farmerStoreCodeDetails);

    const [newProductParams, setNewProductParams] = useState({
        page: 1,
        pageSize: 20,
        storeCode: '',
        language: farmerLanguage,
        isProductBy: 1,
    });
    const [popularProductParams, setPopularProductParams] = useState({
        page: 1,
        pageSize: 20,
        storeCode: '',
        language: farmerLanguage,
        isProductBy: 0,
    });

    useEffect(() => {
        if (isFocussed) {
            setSearchData('');
            let locationInfo = UserManager?.getUserLocation;
            let param = {
                latitude: locationInfo?.latitude,
                longitude: locationInfo?.longitude,
            };
            let Productparam = {
                language: farmerLanguage,
            };
            dispatch(operation.product.getProductCategory(Productparam));
            if (farmerAddress?.isHNI) {
                if (locationInfo?.latitude && locationInfo?.longitude) {
                    getDealerAddress(param);
                } else {
                    getAllDealerAddress();
                }
            }
        }
    }, [isFocussed]);

    useEffect(() => {
        if (farmerAddress && isFocussed) {
            getProductDataByStoreCode(farmerAddress, 1);
            getProductDataByStoreCode(farmerAddress, 0);
        }
    }, [farmerAddress, isFocussed]);


    const getProductDataByStoreCode = (farmerData, type = 0) => {
        if (farmerData) {
            if (farmerData?.storeCode) {
                let params = {
                    storeCode: farmerData?.storeCode,
                    language: farmerLanguage,
                    page: 1,
                    pageSize:
                        type === 1
                            ? newProductParams?.pageSize
                            : popularProductParams?.pageSize,
                    farmerId: farmerAddress?.farmerIdentityId,
                    isProductBy: type,
                };
                if (type === 1) {
                    setNewProductParams(params);
                }
                if (type === 0) {
                    setPopularProductParams(params);
                }
                getProductByStroeCode(params);
            } else if (farmerAddress?.isHNI) {
                setShowNoCode(true);
                setNewProductData([]);
                setPopularProductData([]);
            } else if (
                farmerData?.address?.districtCode &&
                farmerData?.address?.stateCode
            ) {
                let storeParams = {
                    state_code: farmerData?.address?.stateCode,
                    district_code: farmerData?.address?.districtCode,
                };
                dispatch(operation.user.getMagicVillageList(storeParams))
                    .then(res => {
                        if (res?.results.length > 0) {
                            let params = {
                                storeCode: res?.results[0]?.store_code,
                                language: farmerLanguage,
                                page: 1,
                                pageSize:
                                    type === 1
                                        ? newProductParams?.pageSize
                                        : popularProductParams?.pageSize,
                                farmerId: farmerAddress?.farmerIdentityId,
                                isProductBy: type,
                            };
                            if (type === 1) {
                                setNewProductParams(params);
                            }
                            if (type === 0) {
                                setPopularProductParams(params);
                            }
                            getProductByStroeCode(params);
                        }
                    })
                    .catch(err => {
                        if (type === 1) {
                            let product = [...newProductData];
                            setNewProductData(product);
                        }
                        if (type === 0) {
                            let product = [...popularProductData];
                            setPopularProductData(product);
                        }
                        dispatch(
                            operation.user.getErrorHandling(err, 'getMagicVillageList'),
                        );
                    });
            } else if (!farmerAddress?.isHNI) {
                setShowNoCode(true);
                setNewProductData([]);
                setPopularProductData([]);
            } else {
                setNewProductData([]);
                setPopularProductData([]);
            }
        }
    };

    useEffect(() => {
        if (searchData !== null) {
            if (!isEmpty(searchData)) {
                const delayDebounceFn = setTimeout(() => {
                    navigation.navigate(Screen.viewAllProduct, { searchData: searchData });
                }, 1000);
                return () => clearTimeout(delayDebounceFn);
            }
        }
    }, [searchData]);

    const getDealerAddress = param => {

        dispatch(operation.product.dealerAddressByLocation(param))
            .then(res => {
                setDealersAddress(res);
            })
            .catch(err => {
                dispatch(operation.user.getErrorHandling(err, 'getDealerAddress'));
            });
    };

    const getAllDealerAddress = () => {
        dispatch(operation.product.allDealersAddress())
            .then(res => {
                setDealersAddress(res);
            })
            .catch(err => {
                dispatch(operation.user.getErrorHandling(err, 'getAllDealerAddress'));
            });
    };

    const getProductByStroeCode = (param, isEnd = false) => {
        if (param?.isProductBy === 1) {
            dispatch(operation.product.productByStoreCode_Type(param))
                .then(res => {
                    let tempArr = [];
                    if (res?.data) {
                        if (isEnd) {
                            tempArr = [...newProductData, ...res?.data];
                        } else {
                            tempArr = [...res?.data];
                        }
                    } else {
                        if (isEnd) {
                            tempArr = [...newProductData];
                        }
                    }

                    if (tempArr?.length < 1) {
                        if (res?.data?.length < 1 && isEnd) {
                            let param = {
                                storeCode: newProductParams?.storeCode,
                                language: newProductParams?.language,
                                page: newProductParams?.page - 1,
                                pageSize: newProductParams?.pageSize,
                                farmerId: farmerAddress?.farmerIdentityId,
                                isProductBy: 1,
                            };
                            setNewProductParams(param);
                        }
                    }
                    setNewProductData(tempArr);
                    setNewProductResponseData({ totalRecords: res?.totalRecords });
                })
                .catch(err => {
                    dispatch(
                        operation.user.getErrorHandling(err, 'productByStoreCode_Type'),
                    );
                });
        } else if (param?.isProductBy === 0) {
            dispatch(operation.product.productByStoreCode_Type(param))
                .then(res => {
                    let tempArr = [];
                    if (res?.data) {
                        if (isEnd) {
                            tempArr = [...popularProductData, ...res?.data];
                        } else {
                            tempArr = [...res?.data];
                        }
                    } else {
                        if (isEnd) {
                            tempArr = [...popularProductData];
                        }
                    }

                    if (tempArr?.length < 1) {
                        if (res?.data?.length < 1 && isEnd) {
                            let param = {
                                storeCode: popularProductParams?.storeCode,
                                language: popularProductParams?.language,
                                page: popularProductParams?.page - 1,
                                pageSize: popularProductParams?.pageSize,
                                farmerId: farmerAddress?.farmerIdentityId,
                                isProductBy: 0,
                            };
                            setPopularProductParams(param);
                        }
                    }
                    setPopularProductData(tempArr);
                    setPopularProductResponseData({ totalRecords: res?.totalRecords });
                })
                .catch(err => {
                    dispatch(
                        operation.user.getErrorHandling(err, 'productByStoreCode_Type'),
                    );
                });
        }
    };

    const onPressProductItem = (item, type = 0) => {
        navigation.navigate(Screen.productDetails, {
            data: item,
            storeCode:
                type === 1
                    ? newProductParams?.storeCode
                    : popularProductParams?.storeCode,
        });
    };

    const onPressCategory = (item, index) => {
        if (!categoryMoreStatus && item.isMore) {
            setCategoryMoreStatus(!categoryMoreStatus);
        } else {
            setCategoryMoreStatus(false);
            navigation.navigate(Screen.viewAllCategory, {
                type: item?.name,
                data: item,
            });
        }
    };

    const onPressFavourite = (item, index, type = 0) => {

        console.log(item, index, type)
        let param = {
            farmerId: farmerAddress?.farmerIdentityId,
            productCode: item?.itemNumber ?? '',
            productId: item?.id,
        };

        dispatch(operation.product.postProducToFav(param))
            .then(res => {
                if (type === 0) {
                    let productArray = [...newProductData];
                    productArray[index].isFavouriteProduct = true;
                    setNewProductData(productArray);
                } else if (type === 1) {
                    let productArray = [...popularProductData];
                    productArray[index].isFavouriteProduct = true;
                    setPopularProductData(productArray);
                }
                HEToast(
                    appLanguage?.added_to_favourte ?? 'Successfully added to favourites',
                    'success',
                );
            })
            .catch(err => {
                console.log(err, 'kkkkkkkkk')
                dispatch(operation.user.getErrorHandling(err, 'postProducToFav'));
            });
    };

    const onPressSeeAll = type => {
        if (type === 'category') {
            navigation.navigate(Screen.viewAllCategory, { type: 'all', data: null });
        }
        if (type === 'lblSubcategories') {
            // navigation.navigate(Screen.viewAllCategory, { type: 'all', data: null })
        } else if (type === 'dealer') {
            navigation.navigate(Screen.viewAllDealers, { type: 'all', data: null });
        } else if (type === 'popular') {
            navigation.navigate(Screen.viewAllProduct, {
                type: 'all',
                data: popularProductParams,
            });
        } else {
            navigation.navigate(Screen.viewAllProduct, {
                type: 'all',
                data: newProductParams,
            });
        }
    };

    const onEndReached = (type = 0) => {
        if (type === 0) {
            let total = popularProductResponseData?.totalRecords ?? 0;
            let count = popularProductData?.length;
            if (!isLoading && count < total) {
                let param = {
                    storeCode: popularProductParams?.storeCode,
                    language: popularProductParams?.language ?? 1,
                    page: popularProductParams?.page + 1,
                    pageSize: popularProductParams?.pageSize,
                    farmerId: farmerAddress?.farmerIdentityId,
                    isProductBy: 0,
                };
                setPopularProductParams(param);
                getProductByStroeCode(param, true);
            }
        } else if (type === 1) {
            let total = newProductResponseData?.totalRecords ?? 0;
            let count = newProductData?.length;
            if (!isLoading && count < total) {
                let param = {
                    storeCode: newProductParams?.storeCode,
                    language: newProductParams?.language,
                    page: newProductParams?.page + 1,
                    pageSize: newProductParams?.pageSize,
                    farmerId: farmerAddress?.farmerIdentityId,
                    isProductBy: 1,
                };
                setNewProductParams(param);
                getProductByStroeCode(param, true);
            }
        }
    };

    const onPressGoToAddress = () => {
        setShowNoCode(false);
        setTimeout(() => {
            navigation.navigate(Screen.myAccount);
        }, 500);
    };

    const onPressDeleteFav = (item, index, type = 0) => {
        let param = {
            farmerId: farmerAddress?.farmerIdentityId,
            productCode: item?.itemNumber ?? '',
            productId: item?.id,
        };

        dispatch(operation.product.deleteFavProduct(param))
            .then(res => {
                if (type === 0) {
                    let productArray = [...newProductData];
                    productArray[index].isFavouriteProduct = false;
                    setNewProductData(productArray);
                }
                if (type === 1) {
                    let productArray = [...popularProductData];
                    productArray[index].isFavouriteProduct = false;
                    setPopularProductData(productArray);
                }
                HEToast(
                    appLanguage?.removed_from_favourte ??
                    'Successfully removed from favourites',
                    'success',
                );
            })
            .catch(err => {
                dispatch(operation.user.getErrorHandling(err, 'deleteFavProduct'));
            });
    };

    const onPressDoneSearch = (searchData = '') => {
        navigation.navigate(Screen.viewAllProduct, {
            searchData: searchData,
        });
    };

    const onPressCall = phoneNumber => {
        Linking.openURL(`tel:${phoneNumber}`);
    };


    return (
        <View style={{ flex: 1 }}>
            <ShopScreen
                newProductData={newProductData}
                popularProductData={popularProductData}
                onPressProductItem={onPressProductItem}
                onPressFavourite={onPressFavourite}
                onPressDeleteFav={onPressDeleteFav}
            />
        </View>
    );
}

export default ProductCategories

const styles = StyleSheet.create({})