import {appendData} from '../order/reducer';
import {ProductType} from './type';
const initialState = {
  newProduct: [],
  popularProduct: [],
  favouriteProduct: [],
  productCategory: [],
  allProducts: [],
  cartData: [],
  notificationData: [],
  videoData: [],
  bannerData: [],
  favProductArray: [],
  testimonialArray: [],
  bookingHistoryArray: [],
  videoArray: [],
  getFilterStatusArray: [],
  cartBookingData: [],
  bookingShipmentArray: [],
  productSubCategory: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductType.productCategory + '_SUCCESS':
      let productCategoryArray = [];
      for (let i = 0; i < action.payload.length; i++) {
        if (action.payload[i].isActive) {
          productCategoryArray.push(action.payload[i]);
        }
      }
      return {...state, productCategory: productCategoryArray};
    case ProductType.allProducts + '_SUCCESS':
      return {...state, allProducts: action.payload};
    case ProductType.myCart + '_SUCCESS':
      return {...state, cartData: action.payload};
    case ProductType.MyCartBooking + '_SUCCESS':
      return {...state, cartBookingData: action.payload};

    case ProductType.productSubCategory + '_SUCCESS':
      return {...state, productSubCategory: action.payload};

    case ProductType.productBanners + '_SUCCESS':
      return {...state, bannerData: action.payload};
    case ProductType.favProductByFarmerId + '_SUCCESS':
      return {...state, favProductArray: action.payload};
    case ProductType.testimonialIndividual + '_SUCCESS':
      return {...state, testimonialArray: action.payload};
    case ProductType.bookingHistory + '_SUCCESS':
      const completedList = appendData(
        state.bookingHistoryArray,
        action.payload,
      );
      return {...state, bookingHistoryArray: completedList};
    case ProductType.video + '_SUCCESS':
      return {...state, videoArray: action.payload};
    case ProductType.getFilterStatus + '_SUCCESS':
      return {...state, getFilterStatusArray: action.payload};
    case ProductType.bookingShipmentDetails + '_SUCCESS':
      return {...state, bookingShipmentArray: action.payload};
    default:
      return {...state};
  }
};
export default productReducer;
