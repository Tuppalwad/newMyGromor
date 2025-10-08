import {
  completedOrderAction,
  orderTrackingDetailsAction,
  deliveryStatusAction,
  orderShipmentDetailsAction,
  downloadinvoiceDetailsAction,
  orderDeliveryDetailsAction,
} from './action';

export const completedOrder = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = await dispatch(completedOrderAction(param));
        const orderList = orders.data;
        resolve(orderList);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const deliveryStatus = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = await dispatch(deliveryStatusAction(param));
        const orderList = orders.data;
        resolve(orderList);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const downloadinvoiceDetails = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = await dispatch(downloadinvoiceDetailsAction(param));
        const orderList = orders.data;
        resolve(orderList);
      } catch (e) {
        reject(e);
      }
    });
  };
};
export const orderShipmentDetails = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = await dispatch(orderShipmentDetailsAction(param));
        resolve(orders);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const orderDeliveryDetails = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = await dispatch(orderDeliveryDetailsAction(param));
        resolve(orders);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const orderTrackingDetails = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = await dispatch(orderTrackingDetailsAction(param));
        const orderList = orders.data;
        resolve(orderList);
      } catch (e) {
        console.log(e, 'orderTrackingDetails');
        reject(e);
      }
    });
  };
};
