import { deliveryStatusAction, get_sprayServie_prev_address, getProductDetailsFromInvoiceAction, getRecheducleConform, getRecheduleConform, getSprayCharges, getSprayCondition, setdoorDeliverydata } from './action.js';

export const getServicesapi = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const list = await dispatch(deliveryStatusAction(param));
        const serviceslist = list.data;
        resolve(serviceslist);
      } catch (e) {
        reject(e);
      }
    });
  };
};


export const setDoordeliveryService = params => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const list = await dispatch(setdoorDeliverydata(params));
        console.log(list.data, "kkkkkkkkkkkkkk")
        const data = list.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};



export const getProductDetailsFromInvoice = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getProductDetailsFromInvoiceAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};


export const getCondition = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getSprayCondition(param));
        // console.log(user,'kkk')
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getSpryAddressCharges = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getSprayCharges(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
}


export const conformRecheduleDate = (info) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getRecheduleConform(info));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
}


export const get_privious_address_of_spray_service = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(get_sprayServie_prev_address(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};
