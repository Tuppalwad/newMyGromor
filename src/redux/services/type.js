export const servicetype = {
    setServiceslist: 'setServiceslist',
    setDoorDelivery: 'setDoorDelivery',
    productFromInvoice: 'productFromInvoice',
    SprayCondation: 'SprayCondation',
    SprayChargesType:'SprayChargesType',
    spreayItemDataset:'spreayItemDataset',
    reschduleDateConform:'reschduleDateConform',
    privious_address : 'previous_address',
    doorDeliveryProduct:'doorDeliveryProduct'
};

export const servicesPath = {
    getServiceslist: '/sprayingService/getSprayingServiceById',
    setdoorDeliverydata: '/product/generateDoorDeliveryOrder',
    productFromInvoice: '/orders/doorDelivery',
    coverageSettings: '/sprayingService/coverage-settings',
    sprayChargesapi:'/delivery-charge/droneservice/charge',
    conformRecheduleDate:'/sprayingService/ConfirmReschedulingOrCancelByFarmer',
    get_privious_address_service_api:'/sprayingService/GetSprayServiceAddress/'
}