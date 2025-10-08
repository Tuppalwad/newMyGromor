export const OrderType = {
  completedOrder: 'product/get-completed-orders',
  deliveryStatus: 'deliveryStatus',
  orderShipmentDetails: 'orderShipmentDetails',
  orderTrackingDetails: 'orderTrackingDetails',
  downloadinvoiceDetails: 'downloadinvoiceDetails',

  //Old_API's - Callmethod>>>>
  ongoingOrder: 'product/get-in-progress-orders',
  cancelledOrder: 'product/get-failed-orders',
  //Old_API's - Callmethod>>>>
};

export const OrderAPIPath = {
  completedOrder: '/orders/farmer',
  deliveryStatus: '/product/order-history',
  orderShipmentDetails: '/shipment-tracker/getShipmentDetails/',
  orderDeliveryDetails: '/orders/details/',
  orderTrackingDetails: '/shipment-tracker/shipment-status/',
  downloadinvoiceDetails: '/product/invoice-list/',

  //Old_API's - Callmethod>>>>
  ongoingOrder: '/product/get-in-progress-orders',
  cancelledOrder: '/product/get-failed-orders',
  //Old_API's - Callmethod>>>>
};
