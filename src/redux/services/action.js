import { Configuration } from '../../config/index.js';
import { servicetype, servicesPath } from './type.js';

export const deliveryStatusAction = param => {
  return {
    type: servicetype.setServiceslist,
    request: {
      path: servicesPath.getServiceslist + "/" + param.farmerIdentityId,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
      // params: param,
    },
  };
};


export const setdoorDeliverydata = param => {
  return {
    type: servicetype.setDoorDelivery,
    request: {
      path: servicesPath.setdoorDeliverydata,
      method: 'POST',
      baseUrl: Configuration.ProductURL,
      data: param,
    },
  };
};



export const getProductDetailsFromInvoiceAction = params => {
  return {
    type: servicetype.doorDeliveryProduct,
    request: {
      path:
        servicesPath.productFromInvoice +
        `/${params?.invoiceNumber}/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getSprayCondition = params => {
  return {
    type: servicetype.productFromInvoice,
    request: {
      path: servicesPath.coverageSettings,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const getSprayCharges = params => {
  return {
    type: servicetype.SprayChargesType,
    request: {
      path: servicesPath.sprayChargesapi,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
      params: params,

    },
  };
};


export const getRecheduleConform = data => {
  return {
    type: servicetype.reschduleDateConform,
    request: {
      path: servicesPath.conformRecheduleDate,
      method: 'PUT',
      baseUrl: Configuration.ProductURL,
      data: data,

    },
  };
};


export const get_sprayServie_prev_address = params => {
  return {
    type: servicetype.privious_address,
    request: {
      path: servicesPath.get_privious_address_service_api + params.farmid,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
      params: params,
    },
  };
};