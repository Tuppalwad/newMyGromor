export const FarmerType = {
  myPracticeByFarmerId: 'myPracticeByFarmerId',
  myPractice: 'myPractice',
  practiceFertilizerDropDown: 'practiceFertilizerDropDown',
  practiceManagementDropDown: 'practiceManagementDropDown',
  updateMyPractice: 'updateMyPractice',
  deleteMyPractice: 'deleteMyPractice',

  farmerAddress: 'farmerAddress',
  getNewDeliveryCharges: 'getNewDeliveryCharges',
  sendEmail: 'sendEmail',
  getNotification: 'getNotification',
  updateNotification: 'updateNotification',
  deleteNotification: 'deleteNotification',
  getGeoFencingByFarmer: 'getGeoFencingByFarmer',
  postGeoFencingByFarmer: 'postGeoFencingByFarmer',
  FarmerpostLogin: 'FarmerpostLogin',
  classificationofFarmer: 'classificationofFarmer',
  classificationofFarmerUpdate: 'classificationofFarmerUpdate',
  farmerCallDetail: 'farmerCallDetail',
  FarmerLanguage: 'FarmerLanguage',
  farmerStoreCode: 'farmerStoreCode',
  farmerclassificationcode: 'farmerclassificationcode',
  UpdateStore: 'UpdateStore',
  AddAddressSpiringServices:'addressSprayingService',

  //Old_API's - Callmethod>>>>
  deleteGeoFencingByFarmer: 'deleteGeoFencingByFarmer',
  editGeoFencingByFarmer: 'editGeoFencingByFarmer',
  getDeliveryCharges: 'getDeliveryCharges',
  myPracticeById: 'myPracticeById',
  getMinimumCount: 'FertilizerMinOrderQty'
  //Old_API's - Callmethod>>>>
};

export const FarmerAPIPath = {
  myPracticeByFarmerId: '/mypractice/get-my-practice-by-farmer',
  myPractice: '/mypractice/add-my-practice',
  practiceFertilizerDropDown: '/mypractice/get-fertilizers-and-product-applied',
  practiceManagementDropDown:
    '/mypractice/get-management-practice-and-crop-protection',
  updateMyPractice: '/mypractice/update-my-practice',
  deleteMyPractice: '/mypractice/delete-my-practice-id',
  farmerCallDetail: '/Farmer/add/farmer-call-detail',
  farmerclassificationcode: '/Farmer/classification-code/',
  farmerAddress: '/Farmer/GetFarmerDetails?mobileNumber=',
  getNewDeliveryCharges: '/delivery-charge/delivery/charge',
  farmerStoreCode: '/Store/storeCode',
  sendEmail: '/Farmer/send-email',
  getNotification: '/notification/notification-by-userid',
  updateNotification: '/notification/update',
  deleteNotification: '/notification/delete-notification',
  FarmerpostLogin: '/Farmer/postLogin',
  getGeoFencingByFarmer: '/Farmer/geofencing',
  postGeoFencingByFarmer: '/Farmer/geofencing',
  UpdateStore: '/Farmer/UpdateStore',
  SpringServicesAddress:'/sprayingService/addSprayingService',
  classificationofFarmer:'/ClassificationofFarmer/get-farmerClassificationDropdown/',
  classificationofFarmerUpdate: '/ClassificationofFarmer/update',
  FarmerLanguage: 'FarmerLanguage',
  //Old_API's - Callmethod>>>>
  deleteGeoFencingByFarmer: '/Farmer/geofencing',
  editGeoFencingByFarmer: '/Farmer/geofencing',
  getDeliveryCharges: '/delivery-charge/deliveryCharge',
  myPracticeById: '/mypractice/my-practice-by-id',
  getMinimumCount: '/delivery-charge/FertilizerMinOrderQty'
  //Old_API's - Callmethod>>>>
};
