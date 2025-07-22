import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductDetailContainer from './ProductDetailContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useOperation } from '../../../redux/operation';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { ProductType } from '../../../redux/product/type';
import { useIsFocused } from '@react-navigation/native';
import { isEmpty } from '../../../utils/validator';
import { calculateOffer } from '../../../utils/utils';
import { UserManager } from '../../../storage';

const ProductDetails = ({ navigation, route }) => {

  UserManager.loadUser();
  const appLanguage = UserManager?.getAppMultiLanguage;
  const dispatch = useDispatch();
  const operation = useOperation();
  const loadingSelector = createLoadingSelector([
    ProductType.productDetail,
    ProductType.similarProducts,
    ProductType.addFavProduct,
    ProductType.deleteFavProduct,
    ProductType.productReview,
    ProductType.bookNow,
    ProductType.productReviewIndividual,
    ProductType.NotifyMe,
    ProductType.productCart,
    ProductType.myCart,
    ProductType.productCartBooking,
    ProductType.MyCartBooking,
  ]);
  const isLoading = useSelector(state => loadingSelector(state));
  const isFocussed = useIsFocused();
  const productDetails = route?.params?.data;
  const [productData, setProducData] = useState(null);
  const [offer, setOffer] = useState(null);
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [specificationData, setSpecificationData] = useState({
    title: [
      appLanguage?.how_to_use ?? 'How to use',
      appLanguage?.advantages ?? 'Advantages',
      appLanguage?.dosage ?? 'Dosage',
    ],
    content: [],
  });
  const [selecetdQuantity, setSelecetdQuantity] = useState(null);
  const [selecetdQuantityData, setSelecetdQuantityData] = useState(null);
  const [dropDownData, setDropDownData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [similarProducts, setSimilarProducts] = useState(null);
  const [isAddedTocart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const cartBookingDataArray = useSelector(
    state => state.product.cartBookingData,
  );
  const [isUpdateCart, setIsUpdateCart] = useState({});
  const [showNoCode, setShowNoCode] = useState({
    visible: false,
    title: '',
    description: '',
  });
  const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);
  const farmerLanguage = useSelector(state => state.farmer.FarmerLanguageID);
  const [showNoDetails, setshowNoDetails] = useState(false);

  const [similarProductsParams, setSimilarProductsParams] = useState({
    categoryId: route?.params?.data?.categoryId,
    language: farmerLanguage,
    farmerId: farmerAddress?.farmerIdentityId,
    storeCode: route?.params?.storeCode,
    pageNo: 1,
    pageSize: 20,
  });

  useEffect(() => {
    if (isFocussed) {
      let param = {
        categoryId: route?.params?.data?.categoryId,
        language: farmerLanguage,
        farmerId: farmerAddress?.farmerIdentityId,
        storeCode: route?.params?.storeCode,
        productId: productDetails?.id,
        pageNo: 1,
        pageSize: 20,
        costingId: route?.params?.data.costingId,
      };
      getProductDetails_Method(param);
      getSimilarProducts(param);
      getProductReview({ productId: param?.productId });
      setIsAddedToCart(false);
      setIsUpdateCart({});
    }
  }, [isFocussed]);

  useEffect(() => {
    if (!isEmpty(cartBookingDataArray)) {
      for (let i = 0; i < cartBookingDataArray.length; i++) {
        if (
          parseInt(cartBookingDataArray[i].productId) ===
          parseInt(productDetails?.id)
        ) {
          setIsAddedToCart(true);
          setQuantity(cartBookingDataArray[i].quantity ?? 1);
          setIsUpdateCart(cartBookingDataArray[i]);
        }
      }
    }
  }, [cartBookingDataArray, isFocussed]);

  const getProductDetails_Method = param => {
    getProductDetails({
      productId: param?.productId,
      language: param?.language,
      farmerId: param?.farmerId,
      storeCode: param?.storeCode,
      costingId: param?.costingId,
    });
  };

  useEffect(() => {
    if (productData) {
      if (productData?.isFavouriteProduct) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }

      if (productData?.productType != 'F') {
        if (productData?.cartCount > 0) {
          setQuantity(productData?.cartCount);
        } else {
          setQuantity(1);
        }
      }
    }
  }, [productData]);

  useEffect(() => {
    if (selecetdQuantityData) {
      let offer = calculateOffer(
        selecetdQuantityData?.sellingPrice ?? 0,
        selecetdQuantityData?.mrp ?? 0,
      );
      setOffer(offer);
    }
  }, [selecetdQuantityData, productData]);

  const getProductDetails = param => {
    dispatch(operation.product.getProductDetails(param))
      .then(res => {
        setProducData(res);
        var specdata = [];
        specdata.push(res?.controls?.usage ?? '-');
        specdata.push(res?.highlights?.expectedResults ?? '-');
        specdata.push(res?.highlights?.dosage ?? '-');
        setSpecificationData({ ...specificationData, content: specdata });
        let offer = calculateOffer(
          res?.costings[0]?.sellingPrice ?? 0,
          res?.costings[0]?.mrp ?? 0,
        );
        setOffer(offer);
        let tempDropdown = [];
        res?.costings.map((item, index) => {
          let itemValue = {
            label: item?.size,
            value: item?.size,
            index: index,
            ...item,
          };
          if (item?.id === param.costingId) {
            setSelecetdQuantityData(itemValue);
          }
          tempDropdown.push(itemValue);
        });
        setDropDownData(tempDropdown);
      })
      .catch(err => {
        setshowNoDetails(true);
        dispatch(operation.user.getErrorHandling(err, 'getProductDetails'));
      });
  };

  const getProductReview = param => {
    dispatch(operation.product.getProductReviewIndividual(param))
      .then(res => {
        setReviewData(res);
      })
      .catch(err => {
        dispatch(
          operation.user.getErrorHandling(err, 'getProductReviewIndividual'),
        );
      });
  };

  const getSimilarProducts = (param, isEnd = false) => {
    setSimilarProductsParams(param);
    dispatch(operation.product.getSimilarProductsByStoreCode(param)).then(
      res => {
        let tempArr = [];
        if (res) {
          if (isEnd) {
            tempArr = [...similarProducts, ...res?.data];
          } else {
            tempArr = [...res?.data];
          }
        } else {
          if (isEnd) {
            tempArr = [...similarProducts];
          }
        }
        setSimilarProducts(tempArr);
      },
    );
  };

  const onPressItem = item => {
    navigation.push(Screen.productDetails, {
      data: item,
      storeCode: similarProductsParams?.storeCode,
    });
  };

  const onPressFavourite = (item, index, isSimilar = false) => {
    let param = {
      farmerId: farmerAddress?.farmerIdentityId,
      productCode: selecetdQuantityData?.itemNumber,
      productId: item?.id,
    };
    dispatch(operation.product.postProducToFav(param))
      .then(res => {
        if (isSimilar) {
          let page = 0;
          let min = 0;
          let max = 20;
          let foundPage = false;
          while (!foundPage) {
            if (index + 1 >= min && index + 1 <= max) {
              foundPage = true;
              page += 1;
            } else {
              page += 1;
              min += 20;
              max += 20;
            }
          }
          let param = {
            categoryId: similarProductsParams?.categoryId,
            language: similarProductsParams?.language,
            farmerId: similarProductsParams?.farmerId,
            storeCode: similarProductsParams?.storeCode,
            productId: similarProductsParams?.productId,
            pageNo: page,
            pageSize: similarProductsParams?.pageSize,
          };
          getSimilarProducts(param);
        } else {
          setIsFav(true);
        }
        HEToast(
          appLanguage?.added_to_favourte ?? 'Successfully added to favourites',
          'success',
        );
      })
      .catch(err => {
        console.log(err)
        dispatch(operation.user.getErrorHandling(err, 'postProducToFav'));
      });
  };

  const onPressNotifyMe = () => {
    let param = {
      farmerId: farmerAddress?.farmerIdentityId,
      itemCode: selecetdQuantityData?.itemNumber,
      storeCode: farmerAddress?.storeCode,
    };
    dispatch(operation.product.postNotifyMe(param))
      .then(res => {
        HEToast(
          appLanguage?.lblWillnotifyonce ??
          'Will notify once the product available',
          'success',
        );
        let tempparam = {
          language: farmerLanguage,
          farmerId: param?.farmerId,
          storeCode: param?.storeCode,
          productId: selecetdQuantityData?.productId,
          costingId: selecetdQuantityData.id,
        };
        getProductDetails_Method(tempparam);
      })
      .catch(err => {
        dispatch(operation.user.getErrorHandling(err, 'postNotifyMe'));
      });
  };

  const onPressAddToCart = (type = 'ADD') => {
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

    let type_ID = productData?.productType == 'F' ? 'Booking' : 'Cart';

    if (isAddedTocart) {
      navigation.navigate(Screen.myCart, { cartTypeData: type_ID });
    } else {
      let param = {
        farmerId: farmerAddress?.farmerIdentityId,
        id: 0,
        itemCode: selecetdQuantityData?.itemNumber,
        quantity: quantity,
        productId: productDetails?.id ?? 0,
      };
      if (productData?.productType == 'F') {
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
                farmerId: param.farmerId,
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
    }
  };

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

  const onPressSeeAll = type => {
    let tempSimilar = {
      categoryId: productData.categoryId,
      productId: selecetdQuantityData.productId,
      costingId: selecetdQuantityData.id,
    };
    navigation.navigate(Screen.similarProduct, { data: tempSimilar });
  };

  const onPressRateProduct = () => {
    navigation.navigate(Screen.reviewProduct, { data: productData });
  };

  const onPressBuy = item => {
    if (isEmpty(farmerAddress?.storeCode)) {
      HEToast(
        appLanguage?.not_available_in_this_location ??
        'Sorry, currently we are not available in your location.',
      );
      return;
    }
    navigation.navigate(Screen.myCart, { data: item, type: 'BUY' });
  };

  const onPressShare = () => {
    let refMsg = `Check this item \n\n ${Isplatform_Android ? constants.android : constants.ios
      }`;
    Share.share({
      message: refMsg,
    });
  };

  const onPressAdd = () => {
    setQuantity(quantity + 1);
    setIsAddedToCart(false);
  };

  const onPressMinus = () => {
    setQuantity(quantity - 1);
    setIsAddedToCart(false);
  };

  const onPressDeleteFav = (item, index, isSimilar = false) => {
    let param = {
      farmerId: farmerAddress?.farmerIdentityId,
      productCode: selecetdQuantityData?.itemNumber,
      productId: item?.id,
    };

    dispatch(operation.product.deleteFavProduct(param))
      .then(res => {
        if (isSimilar) {
          let page = 0;
          let min = 0;
          let max = 20;
          let foundPage = false;

          while (!foundPage) {
            if (index + 1 >= min && index + 1 <= max) {
              foundPage = true;
              page += 1;
            } else {
              page += 1;
              min += 20;
              max += 20;
            }
          }
          let param = {
            categoryId: similarProductsParams?.categoryId,
            language: similarProductsParams?.language,
            farmerId: similarProductsParams?.farmerId,
            storeCode: similarProductsParams?.storeCode,
            productId: similarProductsParams?.productId,
            pageNo: page,
            pageSize: similarProductsParams?.pageSize,
          };
          getSimilarProducts(param);
        } else {
          setIsFav(false);
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

  const onEndReached = () => {
    let total = similarProducts?.totalRecords ?? 0;
    let count = similarProducts?.data?.length;
    if (!isLoading && count < total) {
      let param = {
        categoryId: similarProductsParams?.categoryId,
        language: similarProductsParams?.language,
        farmerId: similarProductsParams?.farmerId,
        storeCode: similarProductsParams?.storeCode,
        productId: similarProductsParams?.productId,
        pageNo: similarProductsParams?.pageNo + 1,
        pageSize: similarProductsParams?.pageSize,
      };
      getSimilarProducts(param, true);
    }
  };

  const onPressGoToAddress = () => {
    setShowNoCode({ visible: false, title: '', description: '' });
    navigation.navigate(Screen.myAccount);
  };

  console.log(specificationData, 'kkkkkkkkkk')

  return (
    <View style={{ flex: 1 }}>
      <ProductDetailContainer
        navigation={navigation}
        onPressback={() => {
          navigation.goBack();
        }}
        isLoading={isLoading}
        setSegmentIndex={setSegmentIndex}
        segmentIndex={segmentIndex}
        similarProductData={similarProducts ?? []}
        productData={productData}
        onPressItem={onPressItem}
        specificationData={specificationData}
        dropDownData={dropDownData}
        onPressFavourite={onPressFavourite}
        onPressAddToCart={onPressAddToCart}
        onPressNotifyMe={onPressNotifyMe}
        selecetdQuantity={selecetdQuantity}
        setSelecetdQuantity={setSelecetdQuantity}
        reviewData={reviewData}
        onPressSeeAll={onPressSeeAll}
        onPressRateProduct={onPressRateProduct}
        offer={offer}
        onPressBuy={onPressBuy}
        onPressShare={onPressShare}
        setSelecetdQuantityData={setSelecetdQuantityData}
        isAddedTocart={isAddedTocart}
        selecetdQuantityData={selecetdQuantityData}
        onPressAdd={onPressAdd}
        onPressMinus={onPressMinus}
        quantity={quantity}
        onPressViewAllReview={() => {
          navigation.navigate(Screen.viewAllReview, { data: productData });
        }}
        onPressTestimonial={() => {
          navigation.navigate(Screen.testimonial, { data: productData });
        }}
        isFav={isFav}
        onPressDeleteFav={onPressDeleteFav}
        onEndReached={onEndReached}
        setIsAddedToCart={setIsAddedToCart}
        showNoCode={showNoCode}
        setShowNoCode={setShowNoCode}
        onPressGoToAddress={onPressGoToAddress}
        appLanguage={appLanguage}
        showNoDetails={showNoDetails}

      />
    </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create({})