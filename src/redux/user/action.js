import {UserAPIPath, UserType} from './type';
import {Configuration} from '../../config';

//Please define base URL for all

export const getAppLanguageAction = () => {
  return {
    type: UserType.appLanguage,
    request: {
      path: UserAPIPath.appLanguage,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const generateOTPAction = param => {
  return {
    type: UserType.generateOTP,
    request: {
      path: UserAPIPath.generateOTP,
      method: 'POST',
      params: param,
      baseUrl: Configuration.IdentityURL,
    },
  };
};

export const verifyOTPAction = data => {
  return {
    type: UserType.verifyOTP,
    request: {
      path: UserAPIPath.verifyOTP,
      method: 'POST',
      data: data,
      baseUrl: Configuration.IdentityURL,
    },
  };
};

export const resendOTPAction = param => {
  return {
    type: UserType.resendOTP,
    request: {
      path: UserAPIPath.resendOTP,
      method: 'POST',
      params: param,
      baseUrl: Configuration.IdentityURL,
    },
  };
};

export const userDetailsUpdateAction = (data, id) => {
  return {
    type: UserType.updateUserInfo,
    request: {
      path: UserAPIPath.updateUserInfo + '/' + id + '/master-data',
      method: 'PUT',
      data: data,
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const updateAssetsDetailsAction = (data, farmerId) => {
  return {
    type: UserType.getAssetsDetails,
    request: {
      path: UserAPIPath.getAssetsDetails + farmerId + '/assets',
      method: 'PUT',
      data: data,
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const getAssetsDetailsAction = farmerId => {
  return {
    type: UserType.getAssetsDetails,
    request: {
      path: UserAPIPath.getAssetsDetails + farmerId + '/assets',
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const deleteCropDetailsAction = params => {
  return {
    type: UserType.deleteCropDetails,
    request: {
      path: UserAPIPath.deleteCropDetails + '/' + params?.id,
      method: 'DELETE',
      // data: data,
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const createCropDetailsAction = param => {
  return {
    type: UserType.createCropDetails,
    request: {
      path: UserAPIPath.createCropDetails,
      method: 'POST',
      data: param,
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const getMagicStateListAction = params => {
  return {
    type: UserType.getStateList,
    request: {
      path: UserAPIPath.stateList,
      method: 'GET',
      params: params,
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getMagicDistrictListAction = params => {
  return {
    type: UserType.magicDistrictList,
    request: {
      path: UserAPIPath.magicDistrictList,
      method: 'GET',
      params: params,
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getMagicVillageListAction = params => {
  return {
    type: UserType.magicVillageList,
    request: {
      path: UserAPIPath.magicVillageList,
      method: 'GET',
      params: params,
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getFarmerDetailsAction = params => {
  return {
    type: UserType.getFarmerDetails,
    request: {
      path: UserAPIPath.getFarmerDetails + `/${params?.farmerIdentityId}`,
      method: 'GET',
      // params: params,
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const uploadProfileImageAction = params => {
  return {
    type: UserType.uploadProfileImage,
    request: {
      path: UserAPIPath.uploadProfileImage,
      method: 'POST',
      baseUrl: Configuration.FarmerURL,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: '*/*',
      },
    },
  };
};

export const userLaguageUpdateAction = param => {
  return {
    type: UserType.updateLanguage,
    request: {
      path: UserAPIPath.updateLanguage + `/${param?.id}/${param?.language}`,
      method: 'PUT',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const notificationSendAction = data => {
  return {
    type: UserType.notificationSend,
    request: {
      path: UserAPIPath.notificationSend,
      method: 'POST',
      data: data,
      baseUrl: Configuration.IdentityURL,
    },
  };
};

export const getAppMultiLanguageAction = params => {
  return {
    type: UserType.appMultiLanguage,
    request: {
      path: UserAPIPath.appMultiLanguage + `/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const getVersionHistoryAction = params => {
  return {
    type: UserType.versionHistory,
    request: {
      path: UserAPIPath.versionHistory,
      method: 'GET',
      params: params,
      baseUrl: Configuration.IdentityURL,
    },
  };
};

export const getdeleteAccountAction = params => {
  return {
    type: UserType.deleteAccount,
    request: {
      path: UserAPIPath.deleteAccount + `${params}`,
      method: 'PUT',
      // params: params,
      baseUrl: Configuration.IdentityURL,
    },
  };
};

export const getUserAddress = params => {
  return {
    type: UserType.getUserAddress,
    request: {
      path: UserAPIPath.getUserAddress + `${params}`,
      method: 'GET',
      // params: params,
      baseUrl: Configuration.DeliveryURL,
    },
  };
};
