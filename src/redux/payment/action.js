import { PaymentAPIPath, PaymentType } from './type';
import { Configuration } from '../../config';

export const paymentHashAction = data => {
  return {
    type: PaymentType.hash,
    request: {
      path: PaymentAPIPath.hash + '?data=' + data,
      method: 'POST',
      baseUrl: Configuration.ProductURL,
    },
  };
};
export const paymentSuccessAction = data => {
  return {
    type: PaymentType.paymentSuccess,
    request: {
      path: PaymentAPIPath.paymentSuccess,
      method: 'POST',
      data: data,
      baseUrl: Configuration.ProductURL,
    },
  };
};



export const sprayServicePaymentSuccessAction = data => {
  return {
    type: PaymentType.sprayServicesSuccessFailed,
    request: {
      path: PaymentAPIPath.sprayServicesSuccessFailed,
      method: 'POST',
      data: data,
      baseUrl: Configuration.ProductURL,
    },
  };
};


export const paymentUpdateAction = data => {
  return {
    type: PaymentType.paymentUpdate,
    request: {
      path: PaymentAPIPath.paymentUpdate,
      method: 'POST',
      data: data,
      baseUrl: Configuration.ProductURL,
    },
  };
};


export const paymentUpdateActionSpringService = data => {
  return {
    type: PaymentType.sprayServicesPayment,
    request: {
      path: PaymentAPIPath.sprayServicesPayment,
      method: 'POST',
      data: data,
      baseUrl: Configuration.ProductURL,
    },
  }
}


export const generateCodOrderAction = data => {
  return {
    type: PaymentType.generateCodOrder,
    request: {
      path: PaymentAPIPath.generateCodOrder,
      method: 'POST',
      data: data,
      baseUrl: Configuration.ProductURL,
    },
  };
};

export const generatePredpaidOrderAction = data => {
  return {
    type: PaymentType.generatePredpaidOrder,
    request: {
      path: PaymentAPIPath.generatePredpaidOrder,
      method: 'POST',
      data: data,
      baseUrl: Configuration.ProductURL,
    },
  };
};
