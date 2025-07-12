import {
  paymentHashAction,
  paymentSuccessAction,
  paymentUpdateAction,
  generateCodOrderAction,
  generatePredpaidOrderAction,
  paymentUpdateActionSpringService,
  sprayServicePaymentSuccessAction,
} from './action';

export const paymentHash = data => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('Payment hash data :>> ', data);
        const payment = await dispatch(paymentHashAction(data));
        console.log('api response payment :>> ', payment);
        const transaction = payment.data;
        console.log('transaction :>> ', transaction);
        resolve(transaction);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const paymentSuccess = data => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const payment = await dispatch(paymentSuccessAction(data));
        const transaction = payment.data;
        resolve(transaction);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const sprayServicePaymentSuccessFaild = data => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const payment = await dispatch(sprayServicePaymentSuccessAction(data));
        const transaction = payment.data;
        resolve(transaction);
      } catch (e) {
        reject(e);
      }
    });
  };
};


export const paymentUpdate = data => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const payment = await dispatch(paymentUpdateAction(data));
        // console.log(payment,"datadatadataASnasfnlsaf")
        const transaction = payment.data;
        resolve(transaction);
      } catch (e) {
        // console.log(e,"ASnasfnlsaf")
        reject(e);
      }
    });
  };
};

export const paymentUpdateSprayServices  = data => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const payment = await dispatch(paymentUpdateActionSpringService(data));
        // console.log(payment,"datadatadataASnasfnlsaf")
        const transaction = payment.data;
        resolve(transaction);
      } catch (e) {
        // console.log(e,"ASnasfnlsaf")
        reject(e);
      }
    });
  };
};

export const generateCodOrder = data => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const payment = await dispatch(generateCodOrderAction(data));
        // console.log(payment,"datadatadataASnasfnlsaf")
        const transaction = payment.data;
        resolve(transaction);
      } catch (e) {
        // console.log(e,"ASnasfnlsaf")
        reject(e);
      }
    });
  };
};

export const generatePredpaidOrder = data => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const payment = await dispatch(generatePredpaidOrderAction(data));
        // console.log(payment,"datadatadataASnasfnlsaf")
        const transaction = payment.data;
        resolve(transaction);
      } catch (e) {
        // console.log(e,"ASnasfnlsaf")
        reject(e);
      }
    });
  };
};
