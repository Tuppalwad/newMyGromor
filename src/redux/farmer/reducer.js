import { FarmerType } from './type';
import { Default_Language } from '../../utils/validator';

const initialState = {
  notification: [],
  getGeofencing: [],
  classificationofFarmerArray: [],
  farmerAddressArray: [],
  FarmerLanguageID: Default_Language,
  myPracticeArray: [],
  farmerStoreCodeDetails: {},
  minimumCount: null
};

const farmerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FarmerType.FarmerLanguage:
      return { ...state, FarmerLanguageID: action.payload };
    case FarmerType.getNotification + '_SUCCESS':
      return { ...state, notification: action.payload };
    case FarmerType.farmerAddress + '_SUCCESS':
      return { ...state, farmerAddressArray: action.payload };
    case FarmerType.classificationofFarmer + '_SUCCESS':
      return { ...state, classificationofFarmerArray: action.payload };
    case FarmerType.myPracticeByFarmerId + '_SUCCESS':
      return { ...state, myPracticeArray: action.payload };
    case FarmerType.farmerStoreCode + '_SUCCESS':
      return { ...state, farmerStoreCodeDetails: action.payload };
    case FarmerType.UpdateStore + '_SUCCESS':
      return { ...state, farmerStoreCodeDetails: action.payload };
    case FarmerType.getMinimumCount + '_SUCCESS':
      return { ...state, minimumCount: action.payload };
    case FarmerType.getGeoFencingByFarmer + '_SUCCESS':
      const geoData = action.payload?.map(res => {
        return {
          name: res?.name,
          lat_long: res?.lat_long?.map(val => {
            return {
              latitude: Number(val?.lat),
              longitude: Number(val?.lon),
            };
          }),
        };
      });
      return { ...state, getGeofencing: geoData };
    default:
      return { ...state };
  }
};
export default farmerReducer;
