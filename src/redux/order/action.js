import {OrderAPIPath, OrderType} from './type';
import {Configuration} from '../../config';
import UserManager from '../../storage/user-manager';

//Please define base URL for all

export const completedOrderAction = param => {
  let tempData = {
    Status: param.Status,
    pageNo: param.pageNo,
    pageSize: param.pageSize,
  };
  return {
    type: OrderType.completedOrder,
    request: {
      path:
        OrderAPIPath.completedOrder +
        '/' +
        param.farmerIdentityId +
        '/' +
        param.language,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
      params: tempData,
    },
  };
};

export const deliveryStatusAction = param => {
  return {
    type: OrderType.deliveryStatus,
    request: {
      path: OrderAPIPath.deliveryStatus,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
      params: param,
    },
  };
};

export const downloadinvoiceDetailsAction = params => {
  return {
    type: OrderType.downloadinvoiceDetails,
    request: {
      path: OrderAPIPath.downloadinvoiceDetails + `${params}`,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
      // baseUrl: "https://mygromor.coromandel.biz/product.api/api"
    },
  };
};

export const orderShipmentDetailsAction = param => {
  return {
    type: OrderType.orderShipmentDetails,
    request: {
      path: OrderAPIPath.orderShipmentDetails + param.transactionId,
      method: 'GET',
      baseUrl: Configuration.DeliveryURL,
    },
  };
};

export const orderDeliveryDetailsAction = param => {
  return {
    type: OrderType.orderShipmentDetails,
    request: {
      path:
        OrderAPIPath.orderDeliveryDetails +
        param.transactionId +
        '/' +
        param.farmerLanguage,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const orderTrackingDetailsAction = param => {
  return {
    type: OrderType.orderTrackingDetails,
    request: {
      path: OrderAPIPath.orderTrackingDetails + param.transactionId,
      method: 'GET',
      baseUrl: Configuration.DeliveryURL,
    },
  };
};
