import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
// import CustomHeader from '../common/CustomHeader';
// import SearchBar from '../../common/SearchBar';
import ProductCard from './ProductCard';
import FilterModal from './FilterModal';
import product1 from '../../../assets/images/shop/product1.png'
import SearchBar from '../../../components/common/SearchBar';
import CustomHeader from '../../../components/common/CustomHeader';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { UserManager } from '../../../storage';
import { useOperation } from '../../../redux/operation';
import { useDispatch, useSelector } from 'react-redux';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { ProductType } from '../../../redux/product/type';
import { isEmpty } from '../../../utils/validator';
import Indicator from '../../../components/common/Indicator';
import { Screen } from '../../../router/screen';


const ViewAllProduct = () => {
    const [filterVisible, setFilterVisible] = useState(false);
    const navigation = useNavigation();
    const route = useRoute()

    UserManager.loadUser()
    const appLanguage = UserManager?.getAppMultiLanguage
    const operation = useOperation();
    const dispatch = useDispatch();
    const loadingSelector = createLoadingSelector([
        ProductType.addFavProduct,
        ProductType.searchProduct,
        ProductType.productByStoreCode,
        ProductType.favProductByFarmerId,
        ProductType.deleteFavProduct, ProductType.productByStoreCode_type
    ]);
    const isLoading = useSelector(state => loadingSelector(state));
    const isFocussed = useIsFocused();
    const [searchData, setSearchData] = useState(null)
    const [productData, setProductData] = useState([])
    const productDetails = route?.params?.data

    const [showNoCode, setShowNoCode] = useState(false)
    const [showProducts, setShowProducts] = useState(false)

    const [productResponseData, setProductResponseData] = useState(null)
    const farmerAddress = useSelector((state) => state.farmer.farmerAddressArray);
    const farmerLanguage = useSelector((state) => state.farmer.FarmerLanguageID);
    const [productParams, setProductParams] = useState({
        page: 1, pageSize: 50,
        storeCode: '', language: farmerLanguage,
    })

    useEffect(() => {
        if (farmerAddress) {
            if (!isEmpty(productDetails)) {
                let params = {
                    storeCode: farmerAddress?.storeCode,
                    language: farmerLanguage,
                    page: 1,
                    pageSize: 50,
                    farmerId: farmerAddress?.farmerIdentityId,
                    isProductBy: productDetails.isProductBy
                }
                setShowProducts(true)
                getProductNewCode(params, true)
            } else {
                setShowProducts(false)
                if (route?.params?.searchData) {
                    let params = {
                        storeCode: farmerAddress?.storeCode,
                        language: farmerLanguage,
                        page: 1,
                        pageSize: productParams?.pageSize,
                        farmerId: farmerAddress?.farmerIdentityId,
                    }
                    setProductParams(params)
                    setSearchData(route?.params?.searchData)
                } else {
                    getProductDataByStoreCode(farmerAddress, true)
                }
            }
        }
    }, [farmerAddress, productDetails])

    useEffect(() => {
        if (searchData !== null) {
            if (!isEmpty(searchData)) {
                const delayDebounceFn = setTimeout(() => {
                    let param = {
                        language: farmerLanguage, categoryId: 0, minimumPrice: 0,
                        maximumPrice: 0, sortColumn: '', pageNo: 1, pageSize: 50,
                        storeCode: productParams?.storeCode,
                        searchValue: searchData, farmerId: farmerAddress?.farmerIdentityId,
                    }
                    dispatch(operation.product.categoryProductFilters(param)).then((res) => {
                        if (res?.data && res?.data?.length > 0) {
                            setProductData(res?.data)
                        } else {
                            setProductData([])
                        }
                    }).catch((err) => {
                        dispatch(operation.user.getErrorHandling(err, "categoryProductFilters"));
                    })
                }, 500)
                return () => clearTimeout(delayDebounceFn)
            } else {
                getProductDataByStoreCode(farmerAddress, false)
            }
        }
    }, [searchData])



    const onPressProductItem = (item) => {
        navigation.navigate(Screen.productDetails, {
            data: item,
            storeCode: productParams?.storeCode
        })
    }

    const onPressFavourite = (item, index) => {
        let param = {
            farmerId: farmerAddress?.farmerIdentityId,
            productCode: item?.itemNumber ?? '',
            productId: item?.id,
        }
        dispatch(operation.product.postProducToFav(param)).then((res) => {
            let productArray = [...productData]
            productArray[index].isFavouriteProduct = true
            setProductData(productArray)
            HEToast(appLanguage?.added_to_favourte ?? 'Successfully added to favourites', 'success')
        }).catch((err) => {
            dispatch(operation.user.getErrorHandling(err, "postProducToFav"));
        })
    }

    const getProductDataByStoreCode = (farmerData) => {

        if (farmerData) {
            if (farmerData?.storeCode) {
                let params = {
                    storeCode: farmerData?.storeCode,
                    language: farmerLanguage,
                    page: 1,
                    pageSize: productParams?.pageSize,
                    farmerId: farmerAddress?.farmerIdentityId,
                }
                getProductByStroeCode(params, true)
                setProductParams(params)
            } else if (farmerAddress?.isHNI) {
                setProductData([])
            } else if (farmerData?.address?.districtCode && farmerData?.address?.stateCode) {
                let storeParams = {
                    state_code: farmerData?.address?.stateCode,
                    district_code: farmerData?.address?.districtCode
                }
                dispatch(operation.user.getMagicVillageList(storeParams)).then((res) => {
                    if (res?.results.length > 0) {
                        let params = {
                            storeCode: res?.results[0]?.store_code,
                            language: farmerLanguage,
                            page: 1,
                            pageSize: productParams?.pageSize,
                            farmerId: farmerAddress?.farmerIdentityId,
                        }
                        getProductByStroeCode(params, true)
                        setProductParams(params)
                    }
                }).catch((err) => {
                    let product = [...productData]
                    setProductData(product)
                    dispatch(operation.user.getErrorHandling(err, "getMagicVillageList"));
                })
            } else if (!farmerAddress?.isHNI) {
                setShowNoCode(true)
                setProductData([])
            } else {
                setProductData([])
            }
        }
    }

    const getProductNewCode = (param, isLoading = false, isEnd = false) => {
        dispatch(operation.product.productByStoreCode_Type(param)).then((res) => {
            let tempArr = []
            if (res?.data) {
                if (isEnd) {
                    tempArr = [...productData, ...res?.data]
                } else {
                    tempArr = [...res?.data]
                }
            } else {
                if (isEnd) {
                    tempArr = [...productData]
                }
            }
            setProductData(tempArr)
            setProductResponseData({ totalRecords: res?.totalRecords })
        }).catch((err) => {
            dispatch(operation.user.getErrorHandling(err, "productByStoreCode_Type"));
        })
    }

    const getProductByStroeCode = (param, isLoading = false, isEnd = false) => {
        dispatch(operation.product.productByStoreCode(param)).then((res) => {
            let tempArr = []
            if (res?.data) {
                if (isEnd) {
                    tempArr = [...productData, ...res?.data]
                } else {
                    tempArr = [...res?.data]
                }
            } else {
                if (isEnd) {
                    tempArr = [...productData]
                }
            }
            setProductData(tempArr)
            setProductResponseData({ totalRecords: res?.totalRecords })
        }).catch((err) => {
            dispatch(operation.user.getErrorHandling(err, "productByStoreCode"));
        })
    }

    const onEndReached = () => {
        let total = productResponseData?.totalRecords ?? 0
        let count = productData?.length

        console.log(productResponseData, "productResponseData", count, total)

        if (!isLoading && (count < total)) {
            if (showProducts) {

            } else {
                let param = {
                    storeCode: productParams?.storeCode,
                    language: productParams?.language,
                    page: productParams?.page + 1,
                    pageSize: productParams?.pageSize,
                    farmerId: farmerAddress?.farmerIdentityId,
                }
                setProductParams(param)
                getProductByStroeCode(param, false, true)
            }
        }
    };

    const onPressGoToAddress = () => {
        setShowNoCode(false)
        navigation.navigate(Screen.myAccount, {
            // type: 'Address'
        })
    }

    const onPressDeleteFav = (item, index) => {
        let param = {
            farmerId: farmerAddress?.farmerIdentityId,
            productCode: item?.itemNumber ?? '',
            productId: item?.id,
        }
        dispatch(operation.product.deleteFavProduct(param)).then((res) => {
            let productArray = [...productData]
            productArray[index].isFavouriteProduct = false
            setProductData(productArray)
            HEToast(appLanguage?.removed_from_favourte ?? 'Successfully removed from favourites', 'success')
        }).catch((err) => {
            dispatch(operation.user.getErrorHandling(err, "deleteFavProduct"));
        })
    }

    // const renderProduct = ({ item }) => <ProductCard item={item} />;
    const renderProduct = ({ item, index, isSimilar }) => <ProductCard item={item} index={index} onPressProductItem={onPressProductItem} onPressFavourite={onPressFavourite} onPressDeleteFav={onPressDeleteFav} type={isSimilar} />;


    console.log(productData, 'ddddddddd')

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader
                type="shop"
                topTitle="All"
                subtitle="Store Code: S0584 | Mana Gromor Centre Akola"
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />
            <SearchBar onChangeText={(text) => console.log('Search:', text)} />

            <Text style={styles.itemCount}>{productData.length} items</Text>

            <FlatList
                data={productData || []}
                keyExtractor={(item) => item?.id}
                // renderItem={renderProduct}
                renderItem={({ item, index }) => renderProduct({ item, index, isSimilar: true })}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 80 }}
            />

            {/* Bottom Bar with CustomButton */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => console.log('Sort pressed')}>
                    <Text style={styles.bottomIcon}>⇅</Text>
                    <Text style={styles.bottomText}>Sort by</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.bottomButton} onPress={() => setFilterVisible(true)}>
                    <Text style={styles.bottomIcon}>≡</Text>
                    <Text style={styles.bottomText}>Filters</Text>
                    <View style={styles.dot} />
                </TouchableOpacity>
            </View>

            <FilterModal visible={filterVisible} onClose={() => setFilterVisible(false)} />

            <Indicator Indicator={!isLoading} />

        </SafeAreaView>
    );
};

export default ViewAllProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#F9FAFB',
    },
    itemCount: {
        fontSize: 14,
        color: '#333',
        marginHorizontal: 16,
        marginVertical: 8,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0A8F43', // fallback for gradient
        paddingHorizontal: 16,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderColor: '#ddd',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },

    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 8,
    },

    bottomIcon: {
        fontSize: 16,
        color: '#fff',
        marginRight: 8,
        lineHeight: 15
    },

    bottomText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },

    divider: {
        width: 1,
        height: '80%',
        backgroundColor: '#fff',
        opacity: 0.3,
    },

    dot: {
        width: 4,
        height: 4,
        borderRadius: 6,
        backgroundColor: '#FFD700',
        marginLeft: 6,
    },

});
