import { FarmerType, FarmerAPIPath } from './type';
import { Configuration } from '../../config';

//Please define base URL for all,

export const callMethodAction = param => {
  return {
    type: FarmerType.farmerCallDetail,
    request: {
      path: FarmerAPIPath.farmerCallDetail,
      method: 'POST',
      data: param,
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const postMyPracticeAction = params => {
  return {
    type: FarmerType.myPractice,
    request: {
      path: FarmerAPIPath.myPractice,
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

export const deleteMyPracticeAction = params => {
  return {
    type: FarmerType.deleteMyPractice,
    request: {
      path: FarmerAPIPath.deleteMyPractice + `/${params?.id}`,
      method: 'DELETE',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const updateMyPracticeAction = params => {
  return {
    type: FarmerType.updateMyPractice,
    request: {
      path: FarmerAPIPath.updateMyPractice,
      method: 'PUT',
      baseUrl: Configuration.FarmerURL,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: '*/*',
      },
    },
  };
};

export const getMyPracticeFertilizeDDListAction = params => {
  return {
    type: FarmerType.practiceFertilizerDropDown,
    request: {
      path: FarmerAPIPath.practiceFertilizerDropDown + `/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const getfarmerTypeAction = params => {
  return {
    type: FarmerType.farmerclassificationcode,
    request: {
      path: FarmerAPIPath.farmerclassificationcode + `${params}`,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const getMyPracticeManagementDDListAction = params => {
  return {
    type: FarmerType.practiceManagementDropDown,
    request: {
      path: FarmerAPIPath.practiceManagementDropDown + `/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const getMyPracticeListAction = params => {
  return {
    type: FarmerType.myPracticeByFarmerId,
    request: {
      path:
        FarmerAPIPath.myPracticeByFarmerId +
        `/${params?.farmerId}/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
      params: { sortBy: params?.sortBy },
    },
  };
};

export const getFarmerAddressAction = params => {
  return {
    type: FarmerType.farmerAddress,
    request: {
      path: FarmerAPIPath.farmerAddress + `${params?.mobileNumber}`,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const getFarmerStoreCodeAction = params => {
  return {
    type: FarmerType.farmerStoreCode,
    request: {
      path: FarmerAPIPath.farmerStoreCode + `/${params}`,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const getFarmerpostLoginAction = params => {
  return {
    type: FarmerType.FarmerpostLogin,
    request: {
      path: FarmerAPIPath.FarmerpostLogin,
      method: 'POST',
      baseUrl: Configuration.FarmerURL,
      data: params,
    },
  };
};

export const getNewDeliveryChargesAction = params => {
  return {
    type: FarmerType.getNewDeliveryCharges,
    request: {
      path: FarmerAPIPath.getNewDeliveryCharges,
      baseUrl: Configuration.FarmerURL,
      params: params,
      method: 'GET',
    },
  };
};

export const getclassificationofFarmerAction = params => {
  return {
    type: FarmerType.classificationofFarmer,
    request: {
      path: FarmerAPIPath.classificationofFarmer + params,
      baseUrl: Configuration.FarmerURL,
      //params: params,
      method: 'GET',
    },
  };
};

export const getclassificationofFarmerUpdateAction = params => {
  return {
    type: FarmerType.classificationofFarmerUpdate,
    request: {
      path: FarmerAPIPath.classificationofFarmerUpdate,
      baseUrl: Configuration.FarmerURL,
      data: params,
      method: 'POST',
    },
  };
};

export const sendEmailAction = params => {
  return {
    type: FarmerType.sendEmail,
    request: {
      path: FarmerAPIPath.sendEmail,
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

export const getNotificationAction = params => {
  return {
    type: FarmerType.getNotification,
    request: {
      path: FarmerAPIPath.getNotification,
      baseUrl: Configuration.NotificationURL,
      params: params,
      method: 'GET',
    },
  };
};

export const getMiniumCountAction = () => {
  return {
    type: FarmerType.getMinimumCount,
    request: {
      path: FarmerAPIPath.getMinimumCount,
      baseUrl: Configuration.FarmerURL,
      method: 'GET',
    },
  };
}

export const updateNotificationAction = params => {
  return {
    type: FarmerType.updateNotification,
    request: {
      path: FarmerAPIPath.updateNotification,
      baseUrl: Configuration.NotificationURL,
      params: params,
      method: 'PUT',
    },
  };
};
export const deleteNotificationAction = params => {
  return {
    type: FarmerType.deleteNotification,
    request: {
      path: FarmerAPIPath.deleteNotification,
      method: 'DELETE',
      baseUrl: Configuration.NotificationURL,
      params: params,
    },
  };
};

export const getGeofencingAction = params => {
  return {
    type: FarmerType.getGeoFencingByFarmer,
    request: {
      path: FarmerAPIPath.getGeoFencingByFarmer + `/${params}`,
      baseUrl: Configuration.FarmerURL,
      method: 'GET',
    },
  };
};

export const postGeofencingAction = params => {
  return {
    type: FarmerType.postGeoFencingByFarmer,
    request: {
      path: FarmerAPIPath.postGeoFencingByFarmer,
      method: 'POST',
      baseUrl: Configuration.FarmerURL,
      data: params,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      //   accept: '*/*',
      // },
    },
  };
};

export const getUpdateStoreAction = param => {
  return {
    type: FarmerType.UpdateStore,
    request: {
      path: FarmerAPIPath.UpdateStore,
      method: 'PUT',
      baseUrl: Configuration.FarmerURL,
      data: param,
    },
  };
};

export const getFarmerLanguageAction = data => {
  return {
    type: FarmerType.FarmerLanguage,
    payload: data,
  };
};

export const setSpringServicesAddress = (data) => {
  return {
    type: FarmerType.AddAddressSpiringServices,
    request: {
      path: FarmerAPIPath.SpringServicesAddress,
      method: 'POST',
      baseUrl: Configuration.ProductURL,
      data: data,
    },
  };
}




