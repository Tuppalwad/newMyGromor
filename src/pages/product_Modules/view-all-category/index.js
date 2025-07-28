import React, {
    createRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useOperation } from '../../../redux/operation';
// import { Screen } from '../../../router/screen';
import { createLoadingSelector } from '../../../redux/loading-reducer';
// import ViewAllCategoryContainer from './view-all-category.screen';
import { ProductType } from '../../../redux/product/type';
import { UserType } from '../../../redux/user/type';

import { UserManager } from '../../../storage';
import { HEToast } from '../../../components/toast';
import { isEmpty } from '../../../utils/validator';
import debounce from 'lodash.debounce';
import { Screen } from '../../../router/screen';
import ViewAllCategoryContainer from './ViewAllCategoryContainer';
import { capitalizeAll } from '../../../utils/utils';

const ViewAllCategoryData = ({ navigation, route }) => {

    UserManager.loadUser();
    const appLanguage = UserManager?.getAppMultiLanguage;
    const operation = useOperation();
    const dispatch = useDispatch();
    const loadingSelector = createLoadingSelector([
        ProductType.productCategory,
        UserType.magicVillageList,
        ProductType.deleteFavProduct,
        ProductType.similarProducts,
        ProductType.categoryProductFilters,
        ProductType.categoryProductByStore,
        ProductType.addFavProduct,
        ProductType.productSubCategory,
    ]);
    const isLoading = useSelector(state => loadingSelector(state));
    const isFocussed = useIsFocused();
    const [productData, setProductData] = useState([]);
    const [tabData, setTabData] = useState([])
    const [activeTab, setActiveTab] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const [activeSubTab, setActiveSubTab] = useState(null);
    const onEndReachedCalledDuringMomentum = useRef(false);

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10000);
    const [low, setLow] = useState(min);
    const [high, setHigh] = useState(max);

    const categorySelected = route?.params?.data ?? null;

    const [storeParams, setStoreParams] = useState({ page: 1, pageSize: 50 });
    const [isResetFilter, setIsRestFilter] = useState(false);
    const [filterCategory, setFilterCategory] = useState([]);
    const [showNoCode, setShowNoCode] = useState(false);
    const [searchData, setSearchData] = useState(null);
    const [productResponseData, setProductResponseData] = useState(null);
    const [ProductNoData, setProductNoData] = useState(false);
    const [isParentCategory, setIsParentCategory] = useState(true);
    const hasScrolled = useRef(false); // Tracks if the user has started scrolling

    const productCategoryData = useSelector(
        state => state.product.productCategory,
    );
    const subCategoryData = useSelector(
        state => state.product.productSubCategory,
    );
    const StoreCodeDetails = useSelector(
        state => state.farmer.farmerStoreCodeDetails,
    );
    const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);
    const farmerLanguage = useSelector(state => state.farmer.FarmerLanguageID);

    useEffect(() => {
        if (!isEmpty(productCategoryData)) {
            setFilterCategory(productCategoryData);
        }
    }, [productCategoryData]);

    useEffect(() => {
        if (!isEmpty(categorySelected?.id)) {
            console.log('88');
            if (activeTab === null) {
                onEndReachedCalledDuringMomentum.current = false;
                setActiveTab(categorySelected);
                setActiveSubTab(categorySelected);
            }
        } else {
            console.log('999');
            if (productCategoryData?.length > 0) {
                setActiveTab(productCategoryData[0]);
                setActiveSubTab(productCategoryData[0]);
                onEndReachedCalledDuringMomentum.current = false;
            }
        }
    }, [categorySelected, productCategoryData]);

    useEffect(() => {
        if (farmerAddress && activeTab?.id && !productData.length) {
            getProduct(farmerAddress);
            let param = {
                categoryID: activeTab?.id ?? 1,
            };
            dispatch(operation.product.getProductSubCategory(param));
        }
    }, [activeTab?.id]);

    const handleSearch = text => {
        // Replace this with your API call
        if (!isEmpty(text)) {
            let param = {
                language: farmerLanguage,
                categoryId: activeSubTab?.id,
                minimumPrice: 0,
                maximumPrice: 0,
                sortColumn: '',
                pageNo: 1,
                pageSize: 50,
                storeCode: storeParams?.storeCode,
                searchValue: text,
                isParentCategory: isParentCategory,
                farmerId: farmerAddress?.farmerIdentityId,
            };
            dispatch(operation.product.categoryProductFilters(param))
                .then(res => {
                    console.log('res', res);
                    if (res?.data && res?.data?.length > 0) {
                        setProductData(res?.data);
                        setProductNoData(false);
                    } else {
                        setProductData([]);
                        setProductNoData(true);
                    }
                })
                .catch(err => {
                    setProductNoData(true);
                    setProductData([]);
                    dispatch(
                        operation.user.getErrorHandling(err, 'categoryProductFilters'),
                    );
                });
        } else {
            getProduct(farmerAddress);
        }
    };

    const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

    const getProduct = farmerData => {
        if (farmerData?.storeCode) {
            let paramsData = {
                categoryId: activeSubTab?.id,
                storeCode: farmerData?.storeCode,
                language: farmerLanguage,
                farmerId: farmerData?.farmerIdentityId,
                page: 1,
                isParentCategory: isParentCategory,
                pageSize: storeParams?.pageSize,
            };
            console.log('111');
            setStoreParams(paramsData);
            getProductByStoreCode(paramsData);
        } else if (
            farmerData?.address?.districtCode &&
            farmerData?.address?.stateCode
        ) {
            let storeParam = {
                state_code: farmerData?.address?.stateCode,
                district_code: farmerData?.address?.districtCode,
            };
            console.log('222');
            dispatch(operation.user.getMagicVillageList(storeParam))
                .then(res => {
                    if (res?.results.length > 0) {
                        let paramsData = {
                            categoryId: activeSubTab?.id,
                            storeCode: res?.results[0]?.store_code,
                            language: farmerLanguage,
                            farmerId: farmerData?.farmerIdentityId,
                            page: 1,
                            isParentCategory: isParentCategory,
                            pageSize: storeParams?.pageSize,
                        };
                        setStoreParams(paramsData);
                        getProductByStoreCode(paramsData);
                    }
                })
                .catch(err => {
                    let product = [...productData];
                    setProductData(product);
                    dispatch(operation.user.getErrorHandling(err, 'getMagicVillageList'));
                });
        } else {
            console.log('333');
            setProductData([]);
            setProductNoData(true);
        }
    };

    const getProductByStoreCode = (param, isEnd = false) => {

        if (!isEmpty(param.categoryId)) {
            dispatch(operation.product.categoryProductByStore(param))
                .then(res => {
                    let tempArr = [];
                    if (res?.data?.length != 0) {
                        const incomingData = Array.isArray(res?.data) ? res.data : [];

                        if (isEnd) {
                            tempArr = [...productData, ...incomingData];
                        } else {
                            tempArr = [...incomingData];
                        }

                        if (tempArr.length > 0) {
                            setProductData(tempArr);
                            setProductNoData(false);
                        } else {
                            setProductData([]);
                            setProductNoData(true);
                        }

                        if (res?.totalRecords !== undefined) {
                            setProductResponseData({
                                totalRecords: res.totalRecords,
                                data: res?.data,
                            });
                        }
                    }
                    else {
                        setProductData([]);

                    }
                    setShowFilter(false);
                })
                .catch(err => {
                    setProductData([]);
                    setProductNoData(true);
                    dispatch(
                        operation.user.getErrorHandling(err, 'categoryProductByStore'),
                    );
                });
        }
    };

    const fetchDataonSubcategory = (item, isEnd = false) => {

        let param = {
            categoryId: item?.id,
            storeCode: farmerAddress?.storeCode,
            language: farmerLanguage,
            farmerId: farmerAddress?.farmerIdentityId,
            page: 1,
            isParentCategory: item?.id === activeTab.id ? true : false,
            pageSize: storeParams?.pageSize,
        };

        if (!isEmpty(param.categoryId)) {
            dispatch(operation.product.categoryProductByStore(param))
                .then(res => {
                    let tempArr = [];
                    if (res?.data?.length != 0) {
                        const incomingData = Array.isArray(res?.data) ? res.data : [];

                        if (isEnd) {
                            tempArr = [...productData, ...incomingData];
                        } else {
                            tempArr = [...incomingData];
                        }

                        if (tempArr.length > 0) {
                            setProductData(tempArr);
                            setProductNoData(false);
                        } else {
                            setProductData([]);
                            setProductNoData(true);
                        }

                        if (res?.totalRecords !== undefined) {
                            setProductResponseData({
                                totalRecords: res.totalRecords,
                                data: res?.data,
                            });
                        }
                    }
                    else {
                        setProductData([]);
                        setShowFilter(false);
                    }
                })
                .catch(err => {
                    setProductData([]);
                    setProductNoData(true);
                    dispatch(
                        operation.user.getErrorHandling(err, 'categoryProductByStore'),
                    );
                });
        }
    };


    const handlePress = id => {
        let selectedData = productCategoryData?.filter(e => e.id === id);
        if (selectedData != null && selectedData.length > 0) {
            setActiveTab(selectedData[0]);
            setActiveSubTab(selectedData[0]);
            onEndReachedCalledDuringMomentum.current = false;
            hasScrolled.current = false;
            setProductData([]);
            setFilterCategory([]);
        }
        setTimeout(() => setSearchData(''), 100); // Defer to next tick
    };

    const onPressProductItem = item => {
        navigation.navigate(Screen.productDetails, {
            data: item,
            storeCode: storeParams?.storeCode,
        });
    };

    const onPressFavourite = (item, index) => {
        let param = {
            farmerId: farmerAddress?.farmerIdentityId,
            productCode: item?.itemNumber ?? '',
            productId: item?.id,
        };
        dispatch(operation.product.postProducToFav(param))
            .then(res => {
                let productArray = [...productData];
                productArray[index].isFavouriteProduct = true;
                setProductData(productArray);
                HEToast(
                    appLanguage?.added_to_favourte ?? 'Successfully added to favourites',
                    'success',
                );
            })
            .catch(err => {
                dispatch(operation.user.getErrorHandling(err, 'postProducToFav'));
            });
    };

    const handleValueChange = (low, high) => {
        if (parseInt(high) > 99) {
            setLow(low);
            setHigh(high);
            if ((low !== min || high !== max) && isResetFilter) {
                setIsRestFilter(false);
            }
        }
    };

    const onPressFilterCategory = (categoryItem, status) => {
        let productCategoryDataArr = status
            ? [...filterCategory]
            : [...subCategoryData];
        // productCategoryDataArr?.map((tabItem, indx) => {
        //     if (item?.id === tabItem?.id) {
        //         tabItem.isSelected = true
        //     } else {
        //         tabItem.isSelected = false
        //     }
        // })
        const updatedList = productCategoryDataArr.map(item =>
            item.id === categoryItem.id
                ? { ...item, isSelected: !item.isSelected } // ✅ immutable update
                : item,
        );
        setFilterCategory(updatedList);
        setIsRestFilter(false);
    };

    const onPressResetFilter = () => {
        setIsRestFilter(true);
        setLow(min);
        setHigh(max);
        const updatedCategory = filterCategory.map(tabItem => ({
            ...tabItem, // copy the object
            isSelected: tabItem.id === activeTab?.id, // immutably set the flag
        }));

        setFilterCategory(updatedCategory);
    };

    const onMomentumScrollBegin = () => {
        onEndReachedCalledDuringMomentum.current = false; // Reset during momentum scroll
    };

    const onScrollBeginDrag = () => {
        hasScrolled.current = true; // User has started scrolling
    };

    const onEndReached = () => {
        let total = productResponseData?.totalRecords ?? 0;
        let count = productData?.length ?? 0;

        if (
            !onEndReachedCalledDuringMomentum.current && // Prevent double calls during momentum
            hasScrolled.current && // Ensure the user has scrolled
            productData?.length < total && // Check if we have more data to load
            !isLoading &&
            productResponseData?.data?.length !== 0
        ) {
            let param = {
                categoryId: activeSubTab?.id,
                storeCode: farmerAddress?.storeCode,
                language: farmerLanguage,
                farmerId: farmerAddress?.farmerIdentityId,
                page: storeParams?.page + 1,
                pageSize: storeParams?.pageSize,
                isParentCategory: isParentCategory,
            };

            setStoreParams(param);
            getProductByStoreCode(param, true);
        }
    };

    const onPressSubmitFilter = () => {
        if (isResetFilter) {
            let param = {
                categoryId: activeSubTab?.id,
                storeCode: farmerAddress?.storeCode,
                language: farmerLanguage,
                farmerId: farmerAddress?.farmerIdentityId,
                page: 1,
                isParentCategory: isParentCategory,
                pageSize: storeParams?.pageSize,
                searchValue: searchData ?? '',
                sortColumn: '',
            };
            setStoreParams(param);
            getProductByStoreCode(param);
            setActiveTab(activeTab);
            setActiveSubTab(activeTab);
        } else {
            setShowFilter(false);
            let param = {
                storeCode: farmerAddress?.storeCode,
                language: farmerLanguage,
                farmerId: farmerAddress?.farmerIdentityId,
                searchValue: searchData ?? '',
                categoryId: activeSubTab?.id,
                minimumPrice: low,
                maximumPrice: high,
                sortColumn: '',
                pageNo: 1,
                pageSize: 50,
            };
            dispatch(operation.product.categoryProductFilters(param))
                .then(res => {
                    if (res?.data && res?.data?.length > 0) {
                        setProductData(res?.data);
                    } else {
                        setProductData([]);
                        setProductNoData(true);
                    }
                    setActiveTab(activeTab);
                    setActiveSubTab(activeTab);
                })
                .catch(err => {
                    setProductNoData(true);
                    setProductData([]);
                    dispatch(
                        operation.user.getErrorHandling(err, 'categoryProductFilters'),
                    );
                });
        }
    };

    const onPressFilter = () => {
        console.log('cccccckkkkkkkk')
        setShowFilter(true);
        let productCategoryDataArr = [...filterCategory];
        productCategoryDataArr?.map((tabItem, indx) => {
            if (activeTab?.id === tabItem?.id) {
                tabItem.isSelected = true;
            } else {
                tabItem.isSelected = false;
            }
        });
        setFilterCategory(productCategoryDataArr);
    };

    const onPressGoToAddress = () => {
        setShowNoCode(false);
        navigation.navigate(Screen.myAccount);
    };

    const onPressDeleteFav = (item, index) => {
        let param = {
            farmerId: farmerAddress?.farmerIdentityId,
            productCode: item?.itemNumber ?? '',
            productId: item?.id,
        };
        dispatch(operation.product.deleteFavProduct(param))
            .then(res => {
                let productArray = [...productData];
                productArray[index].isFavouriteProduct = false;
                setProductData(productArray);
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

    const handleSubCategory = item => {

        let paramsData = {
            categoryId: item?.id,
            storeCode: farmerAddress?.storeCode,
            language: farmerLanguage,
            farmerId: farmerAddress?.farmerIdentityId,
            page: 1,
            isParentCategory: item?.id === activeTab.id ? true : false,
            pageSize: storeParams?.pageSize,
        };

        if (item?.id === activeTab.id) {
            setIsParentCategory(true);
        } else {
            setIsParentCategory(false);
        }
        setStoreParams(paramsData);
        setActiveSubTab(item);
        onEndReachedCalledDuringMomentum.current = false;
        hasScrolled.current = false;
        getProductByStoreCode(paramsData);

    };

    return (
        <ViewAllCategoryContainer
            data={productData ?? []}
            handlePress={handlePress}
            tabData={productCategoryData}
            activeTab={activeTab}
            subCategoryData={subCategoryData}
            onPressFilter={onPressFilter}
            onPressClose={() => setShowFilter(false)}
            showFilter={showFilter}
            onPressProductItem={onPressProductItem}
            handleValueChange={handleValueChange}
            low={low}
            high={high}
            min={min}
            max={max}
            isLoading={isLoading}
            activeSubTab={activeSubTab}
            handleSubCategory={handleSubCategory}
            onPressFilterCategory={onPressFilterCategory}
            onPressResetFilter={onPressResetFilter}
            onPressFavourite={onPressFavourite}
            onEndReached={onEndReached}
            onPressSubmitFilter={onPressSubmitFilter}
            filterCategory={filterCategory}
            showNoCode={showNoCode}
            setSearchData={setSearchData}
            searchData={searchData}
            onPressGoToAddress={onPressGoToAddress}
            onPressDeleteFav={onPressDeleteFav}
            appLanguage={appLanguage}
            ProductNoData={ProductNoData}
            categorySelected={categorySelected}
            StoreCodeDetails={StoreCodeDetails}
            getProduct={getProduct}
            farmerAddress={farmerAddress}
            debouncedSearch={debouncedSearch}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollBeginDrag={onScrollBeginDrag}
            type={capitalizeAll(categorySelected.code)}
            setActiveSubTab={setActiveSubTab}
            fetchDataonSubcategory={fetchDataonSubcategory}
            handleSearch={handleSearch}

        />
    );
};

export default ViewAllCategoryData;
