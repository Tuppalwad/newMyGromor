export const PaymentType = {
    transaction: 'product/payment',
    hash: 'product/payment/mobile/hash',
    paymentSuccess: '/product/payment/success',
    paymentUpdate: '/product/payment/update',
    generateCodOrder: "generateCodOrder",
    generatePredpaidOrder: "generatePredpaidOrder",
    //Old_API's - Callmethod>>>>
    clearCart: '/product/delete-cart-items',
    bulkDiscount: 'bulkDiscount',
    sprayServicesPayment: 'sprayServicesPayment',
    sprayServicesSuccessFailed:'sprayServicesSuccessFailed'
    //Old_API's - Callmethod>>>>
};

export const PaymentAPIPath = {
    transaction: '/product/payment/',
    hash: '/product/payment/mobile/hash',
    paymentSuccess: '/product/payment/success',
    paymentUpdate: '/product/payment/update',
    generateCodOrder: "/product/generateCodOrder",
    generatePredpaidOrder: "/product/generatePredpaidOrder",
    //Old_API's - Callmethod>>>>
    clearCart: '/product/delete-cart-items',
    bulkDiscount: '/discount',
    sprayServicesPayment: '/sprayingService/sprayServicePayment/update',
    sprayServicesSuccessFailed: '/sprayingService/sprayServicePayment/payu-success-failure'
    //Old_API's - Callmethod>>>>
};
