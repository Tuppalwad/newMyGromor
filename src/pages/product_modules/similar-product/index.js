import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useOperation } from "../../../redux/operation";
import { Screen } from "../../../router/screen";
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { ProductType } from '../../../redux/product/type';
import { UserManager } from '../../../storage';
import { HEToast } from '../../../components/toast';
import { isEmpty } from '../../../utils/validator';
import SimilarProudctContainer from './SimilarProudctContainer';

const SimilarProudct = ({ navigation, route, }) => {
    UserManager.loadUser()
    const appLanguage = UserManager?.getAppMultiLanguage
    const operation = useOperation();
    const dispatch = useDispatch();
    const loadingSelector = createLoadingSelector([
        ProductType.addFavProduct, ProductType.searchProduct,
        ProductType.similarProductsByStoreCode,
        ProductType.favProductByFarmerId, ProductType.deleteFavProduct
    ]);
    const productDetails = route?.params?.data
    const isLoading = useSelector(state => loadingSelector(state));
    const [searchData, setSearchData] = useState(null)
    const [productData, setProductData] = useState([])
    const [showNoCode, setShowNoCode] = useState(false)
    const [productResponseData, setProductResponseData] = useState(null)
    const farmerAddress = useSelector((state) => state.farmer.farmerAddressArray);
    const farmerLanguage = useSelector((state) => state.farmer.FarmerLanguageID);
    const [productParams, setProductParams] = useState({
        pageSize: 50, pageNo: 1,
        storeCode: farmerAddress?.storeCode,
        language: farmerLanguage,
        categoryId: productDetails?.categoryId,
        productId: productDetails.productId,
        costingId: productDetails?.costingId,
        farmerId: farmerAddress?.farmerIdentityId,
    })

    useEffect(() => {
        if (farmerAddress) {
            if (route?.params?.searchData) {
                let params = {
                    storeCode: farmerAddress?.storeCode,
                    language: farmerLanguage,
                    pageNo: productParams?.pageNo,
                    pageSize: productParams?.pageSize,
                    categoryId: productDetails?.categoryId,
                    productId: productDetails.productId,
                    costingId: productDetails?.costingId,
                    farmerId: farmerAddress?.farmerIdentityId,
                }
                setProductParams(params)
                setSearchData(route?.params?.searchData)
            } else {
                getProductDataByStoreCode(farmerAddress, true)
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
                    farmerId: farmerData?.farmerIdentityId,
                    pageNo: productParams?.pageNo,
                    pageSize: productParams?.pageSize,
                    categoryId: productDetails?.categoryId,
                    productId: productDetails.productId,
                    costingId: productDetails?.costingId,
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
                            farmerId: farmerData?.farmerIdentityId,
                            pageNo: productParams?.pageNo,
                            pageSize: productParams?.pageSize,
                            categoryId: productDetails?.categoryId,
                            productId: productDetails.productId,
                            costingId: productDetails?.costingId,
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

    const getProductByStroeCode = (param, isLoading = false, isEnd = false) => {
        dispatch(operation.product.getSimilarProductsByStoreCode(param)).then((res) => {
            let tempArr = []
            if (res?.data) {
                if (isEnd) {
                    tempArr = [...productData,
                    ...res?.data]
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
            dispatch(operation.user.getErrorHandling(err, "getSimilarProductsByStoreCode"));
        })
    }

    const onEndReached = () => {
        let total = productResponseData?.totalRecords ?? 0
        let count = productData?.length
        if (!isLoading && (count < total)) {
            let param = {
                storeCode: productParams?.storeCode,
                language: productParams?.language,
                pageNo: productParams?.pageNo + 1,
                pageSize: productParams?.pageSize,
                farmerId: farmerAddress?.farmerIdentityId,
                categoryId: productDetails?.categoryId,
                productId: productDetails.productId,
                costingId: productDetails?.costingId,
            };
            setProductParams(param)
            getProductByStroeCode(param, false, true)
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
            dispatch(operation.user.getErrorHandling(err, "onPressDeleteFav"));
        })
    }

    return (
        <SimilarProudctContainer
            data={productData ?? []}
            onPressProductItem={onPressProductItem}
            onPressFavourite={onPressFavourite}
            setSearchData={setSearchData}
            searchData={searchData}
            isLoading={isLoading}
            onEndReached={onEndReached}
            appLanguage={appLanguage}
            showNoCode={showNoCode}
            onPressGoToAddress={onPressGoToAddress}
            onPressDeleteFav={onPressDeleteFav}
        />
    );
};

export default SimilarProudct;
