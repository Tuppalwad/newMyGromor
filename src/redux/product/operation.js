import {
  getSimilarProductAction,
  getProductDetailsAction,
  getProductCategoryAction,
  getProductBannersAction,
  getProductReviewIndividualAction,
  getTestimonialAction,
  postProducToCartAction,
  updateProducToCartAction,
  postProducToFavAction,
  getFavProductByFarmerIDAction,
  postProducReviewAction,
  getMyCartAction,
  getProductSubCategoryAction,
  deleteCartProductAction,
  deleteFavProductAction,
  productByStoreCodeAction,
  getProductVideoAction,
  categoryProductByStoreAction,
  categoryProductFiltersAction,
  allDealersAddressAction,
  checkReviewAction,
  getSimilarProductsByStoreCodeAction,
  updateProducReviewAction,
  dealerAddressByLocationAction,
  productByStoreCode_TypeAction,
  notifyMeAction,
  bookNowAction,
  getRewardPointsAction,
  getBookingHistoryAction,
  getFilterStatusAction,
  postProducToCartBookingAction,
  getMyCartBookingAction,
  updateProducToCartBookingAction,
  deleteCartBookingProductAction,
  bookNowFromcartAction,
  bookingShipmentDetailsAction,
  getProductDetailsFromInvoiceAction,
} from './action';

export const getSimilarProduct = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getSimilarProductAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getSimilarProductsByStoreCode = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getSimilarProductsByStoreCodeAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getProductDetails = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getProductDetailsAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getProductCategory = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getProductCategoryAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getProductSubCategory = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getProductSubCategoryAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getProductBanners = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getProductBannersAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getProductReviewIndividual = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getProductReviewIndividualAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const gettestimonialIndividual = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getTestimonialAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const postProducToCart = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(postProducToCartAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const postProducToCartBooking = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(postProducToCartBookingAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const postNotifyMe = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(notifyMeAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const bookNow = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(bookNowAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const bookNowFromcart = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(bookNowFromcartAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const updateProducToCart = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(updateProducToCartAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const updateProducToCartBooking = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(updateProducToCartBookingAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const postProducToFav = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(postProducToFavAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const deleteFavProduct = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(deleteFavProductAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getFavProductByFarmerID = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getFavProductByFarmerIDAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const postProducReview = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(postProducReviewAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const updateProducReview = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(updateProducReviewAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getMyCart = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getMyCartAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getMyCartBooking = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getMyCartBookingAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const deleteCartProduct = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(deleteCartProductAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const deleteCartBookingProduct = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(deleteCartBookingProductAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const dealerAddressByLocation = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(dealerAddressByLocationAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const allDealersAddress = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(allDealersAddressAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const productByStoreCode = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(productByStoreCodeAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const productByStoreCode_Type = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(productByStoreCode_TypeAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const categoryProductByStore = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(categoryProductByStoreAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const categoryProductFilters = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(categoryProductFiltersAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getProductVideo = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getProductVideoAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const checkReview = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(checkReviewAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getRewardPoints = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getRewardPointsAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getBookingHistory = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getBookingHistoryAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getFilterStatus = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getFilterStatusAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const bookingShipmentDetails = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(bookingShipmentDetailsAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};


