import { MasterType, MasterAPIPath } from './type';
import { Configuration } from '../../config';

//Please define base URL for all,  

export const getEducationDDListAction = (params) => {
  return {
    type: MasterType.educationDropDown,
    request: {
      path: MasterAPIPath.educationDropDown,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
      params: params
    },
  };
};
export const getMyPreferenceDDListAction = (params) => {
  return {
    type: MasterType.myPreferenceDropdown,
    request: {
      path: MasterAPIPath.myPreferenceDropdown,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
      params: params
    },
  };
};

export const getSoilTypesDDListAction = (params) => {
  return {
    type: MasterType.soilTypesDropDown,
    request: {
      path: MasterAPIPath.soilTypesDropDown,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
      params: params
    },
  };
};


export const getIrrigationMethodsDDListAction = (params) => {
  return {
    type: MasterType.irrigationMethodsDropDown,
    request: {
      path: MasterAPIPath.irrigationMethodsDropDown,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
      params: params
    },
  };
};

export const getOwnerShipDDListAction = (params) => {
  return {
    type: MasterType.ownerShipDropDown,
    request: {
      path: MasterAPIPath.ownerShipDropDown,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
      params: params
    },
  };
};

