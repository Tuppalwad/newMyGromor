import {ProductType, ProductAPIPath} from './type';
import {Configuration} from '../../config';

//Please define base URL for all,

export const getSimilarProductAction = params => {
  return {
    type: ProductType.similarProducts,
    request: {
      path:
        ProductAPIPath.similarProducts +
        `/${params?.categoryId}/${params?.language}/${params?.farmerId}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};
export const getSimilarProductsByStoreCodeAction = params => {
  return {
    type: ProductType.similarProductsByStoreCode,
    request: {
      path: ProductAPIPath.similarProductsByStoreCode,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
      params: params,
    },
  };
};

export const getProductDetailsAction = params => {
  return {
    type: ProductType.productDetail,
    request: {
      path:
        ProductAPIPath.productDetail +
        `/${params?.productId}/${params?.language}/${params?.farmerId}/${params?.storeCode}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getProductCategoryAction = params => {
  return {
    type: ProductType.productCategory,
    request: {
      path: ProductAPIPath.productCategory + `/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getProductSubCategoryAction = params => {
  return {
    type: ProductType.productSubCategory,
    request: {
      path: ProductAPIPath.productSubCategory + `/${params?.categoryID}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getProductBannersAction = params => {
  return {
    type: ProductType.productBanners,
    request: {
      path: ProductAPIPath.productBanners,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getAllProductsAction = params => {
  return {
    type: ProductType.allProducts,
    request: {
      path: ProductAPIPath.allProducts + `/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getProductByCategoryAction = params => {
  return {
    type: ProductType.productByCategory,
    request: {
      path: ProductAPIPath.productByCategory + `/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getProductReviewIndividualAction = params => {
  return {
    type: ProductType.productReviewIndividual,
    request: {
      path: ProductAPIPath.productReviewIndividual + `/${params?.productId}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getTestimonialAction = params => {
  return {
    type: ProductType.testimonialIndividual,
    request: {
      path: ProductAPIPath.testimonialIndividual + `/${params?.productId}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const postProducToCartAction = params => {
  return {
    type: ProductType.productCart,
    request: {
      path: ProductAPIPath.productCart,
      method: 'POST',
      data: params,
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const postProducToCartBookingAction = params => {
  return {
    type: ProductType.productCartBooking,
    request: {
      path: ProductAPIPath.productCartBooking,
      method: 'POST',
      data: params,
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const updateProducToCartAction = params => {
  return {
    type: ProductType.productCart,
    request: {
      path: ProductAPIPath.productCart,
      method: 'PUT',
      data: params,
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const updateProducToCartBookingAction = params => {
  return {
    type: ProductType.productCartBooking,
    request: {
      path: ProductAPIPath.productCartBooking,
      method: 'PUT',
      data: params,
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const postProducToFavAction = params => {
  return {
    type: ProductType.addFavProduct,
    request: {
      path: ProductAPIPath.addFavProduct,
      method: 'POST',
      data: params,
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const deleteFavProductAction = params => {
  return {
    type: ProductType.deleteFavProduct,
    request: {
      path:
        ProductAPIPath.addFavProduct +
        `/${params?.farmerId}/${params?.productCode}/${params?.productId}`,
      method: 'DELETE',
      data: params,
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getFavProductByFarmerIDAction = params => {
  return {
    type: ProductType.favProductByFarmerId,
    request: {
      path:
        ProductAPIPath.favProductByFarmerId +
        `/${params?.farmerId}/${params?.language}/${params?.storeCode}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const postProducReviewAction = params => {
  return {
    type: ProductType.productReview,
    request: {
      path: ProductAPIPath.productReview,
      method: 'POST',
      data: params,
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const notifyMeAction = param => {
  return {
    type: ProductType.NotifyMe,
    request: {
      path: ProductAPIPath.NotifyMe,
      method: 'POST',
      data: param,
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const bookNowAction = param => {
  return {
    type: ProductType.bookNow,
    request: {
      path: ProductAPIPath.bookNow,
      method: 'POST',
      data: param,
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const bookNowFromcartAction = params => {
  return {
    type: ProductType.bookNowFromcartAction,
    request: {
      path:
        ProductAPIPath.bookNowFromcartAction ,
      method: 'POST',
      data: params,
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const updateProducReviewAction = params => {
  return {
    type: ProductType.productReview,
    request: {
      path: ProductAPIPath.productReview,
      method: 'PUT',
      data: params,
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getMyCartAction = params => {
  return {
    type: ProductType.myCart,
    request: {
      path: ProductAPIPath.myCart + `/${params?.farmerId}/${1}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getMyCartBookingAction = params => {
  return {
    type: ProductType.MyCartBooking,
    request: {
      path:
        ProductAPIPath.MyCartBooking +
        `/${params?.farmerId}/${params?.language ?? 1}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const deleteCartProductAction = params => {
  return {
    type: ProductType.deleteCartProduct,
    request: {
      path: ProductAPIPath.deleteCartProduct + `/${params?.cartId}`,
      method: 'DELETE',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const deleteCartBookingProductAction = params => {
  return {
    type: ProductType.deleteCartBookingProduct,
    request: {
      path: ProductAPIPath.deleteCartBookingProduct + `/${params?.cartId}`,
      method: 'DELETE',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const dealerAddressByLocationAction = params => {
  return {
    type: ProductType.dealerAddressByLoc,
    request: {
      path: ProductAPIPath.dealerAddressByLoc,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
      params: params,
    },
  };
};

export const allDealersAddressAction = params => {
  return {
    type: ProductType.allDealersAddress,
    request: {
      path: ProductAPIPath.allDealersAddress,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const productByStoreCodeAction = params => {
  return {
    type: ProductType.productByStoreCode,
    request: {
      path:
        ProductAPIPath.productByStoreCode +
        `/${params?.storeCode}/${params?.language}/${params?.farmerId}/${params?.page}/${params?.pageSize}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const productByStoreCode_TypeAction = params => {
  return {
    type: ProductType.productByStoreCode_type,
    request: {
      path:
        ProductAPIPath.productByStoreCode_type +
        `/${params?.storeCode}/${params?.language}/${params?.farmerId}/${
          params?.page
        }/${params?.pageSize}/${params?.isProductBy === 1 ? true : false}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const categoryProductByStoreAction = params => {
  return {
    type: ProductType.categoryProductByStore,
    request: {
      path:
        ProductAPIPath.categoryProductByStore +
        `/${params?.categoryId}/${params?.storeCode}/${params?.language}/${params?.farmerId}/${params?.page}/${params?.pageSize}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
      params: {isParentCategory: params?.isParentCategory},
    },
  };
};

export const categoryProductFiltersAction = params => {
  return {
    type: ProductType.categoryProductFilters,
    request: {
      path: ProductAPIPath.categoryProductFilters,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
      params: params,
    },
  };
};

export const getProductVideoAction = params => {
  return {
    type: ProductType.video,
    request: {
      path: ProductAPIPath.video + `/${params?.page}/${params?.pageSize}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const checkReviewAction = param => {
  return {
    type: ProductType.checkReview,
    request: {
      path:
        ProductAPIPath.checkReview +
        `/${param?.userId}/${param?.id}/${param?.language}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

// loyalty points api
export const getRewardPointsAction = params => {
  return {
    type: ProductType.rewardPoints,
    request: {
      path: ProductAPIPath.rewardPoints + `/${params?.farmerId}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getBookingHistoryAction = params => {
  let tempParam = {
    pageNo: params?.pageNo ?? 1,
    pageSize: params?.pageSize ?? 10,
  };

  return {
    type: ProductType.bookingHistory,
    request: {
      path: ProductAPIPath.bookingHistory + `/${params?.farmerId}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
      params: tempParam,
    },
  };
};

export const getFilterStatusAction = params => {
  return {
    type: ProductType.getFilterStatus,
    request: {
      path: ProductAPIPath.getFilterStatus + `/${params}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const bookingShipmentDetailsAction = params => {
  return {
    type: ProductType.bookingShipmentDetails,
    request: {
      path: ProductAPIPath.bookingShipmentDetails + `/${params}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

