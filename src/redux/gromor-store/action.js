import { StoreType, StoreAPIPath } from './type';
import { Configuration } from '../../config';

//Please define base URL for all,  

export const getStoreByLocationAction = (param) => {
  return {
    type: StoreType.storeByLocation,
    request: {
      path: StoreAPIPath.storeByLocation,
      method: 'GET',
      params: param,
      baseUrl: Configuration.FarmerURL,
    },
  };
};


export const getAllStoreAction = (params) => {
  return {
    type: StoreType.getAllStore,
    request: {
      path: StoreAPIPath.getAllStore,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const getRecommenedStoreAction = (param) => {
  return {
    type: StoreType.getRecommenedStore,
    request: {
      path: StoreAPIPath.getRecommenedStore,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
      params: param,
    },
  };
};
