import { Configuration } from "../../config";

export const UserType = {

  appLanguage: 'user/appLanguage',
  generateOTP: 'user/generateOTP',
  verifyOTP: 'user/verifyOTP',
  resendOTP: 'user/resendOTP',
  cropForSelection: 'user/cropForSelection',
  userInfo: '/user/userInfo',
  userInfoClear: "userInfoClear",
  updateUserInfo: '/user/updateUserInfo',
  createCropDetails: 'createCropDetails',
  magicDistrictList: 'crop/magicDistrictList',
  magicVillageList: 'crop/magicVillageList',
  uploadProfileImage: 'uploadProfileImage',
  getFarmerDetails: 'getFarmerDetails',
  updateLanguage: 'updateLanguage',
  getFarmerIdentity: 'getFarmerIdentity',
  deleteCropDetails: 'deleteCropDetails',
  notificationSend: 'notification/usertoken',
  appMultiLanguage: 'appMultiLanguage',
  appPhasetwo: "appPhasetwo",
  versionHistory: "versionHistory",
  deleteAccount: "deleteAccount",
  getStateList: 'getStateList',
  getAssetsDetails:"getAssetsDetails",
  getUserAddress:'getUserAddress',
  //Old_API's - Callmethod>>>>

  postCropDetails: 'postCropDetails',
  cropInstruction: 'cropInstruction',
  selectedCrop: 'user/selectedCrop',
  saveSelectedCrop: 'user/saveSelectedCrop',
  getCropsList: 'crops/getCropsList',
  allAppLanguage: 'user/allAppLanguage',
  getIrrigationSource: '/user/getIrrigationSource',
  getIrrigationMethod: '/user/getIrrigationMethod',
  getSoilType: '/user/getSoilType',
  getOwnerShipType: '/user/getOwnerShipType',
  districtList: 'user/districtList',
  getSelectedCrops: '/user/getSelectedCrops',
  createCrop: 'crops/createCrop',
  stateList: 'user/stateList',

  //Old_API's - Callmethod>>>>
};

export const UserAPIPath = {

  appLanguage: '/language',
  generateOTP: '/auth/otpGenerate',
  verifyOTP: '/auth/login/mobile',
  resendOTP: '/auth/resendOTP',
  cropForSelection: '/crop/byCategory',
  userInfo: '/Farmer/identity',
  userInfoClear: "userInfoClear",
  updateUserInfo: '/Farmer',
  createCropDetails: '/crop-detail',
  magicDistrictList: '/crop/location/districts-by-language',
  magicVillageList: '/crop/location/village-by-language',

  uploadProfileImage: '/Farmer/upload/media',
  getFarmerDetails: '/Farmer/identity',
  updateLanguage: '/Farmer/update-language',
  getFarmerIdentity: '/Farmer/get-farmer-info-by-identityId',
  deleteCropDetails: '/crop-detail/delete-crop',
  notificationSend: '/notification/usertoken',
  appMultiLanguage: '/language/label',
  appPhasetwo: "appPhasetwo",
  versionHistory: "/mygromor-version-history/forceupdate",
  deleteAccount: "/auth/delete-account/",
  stateList: '/crop/location/states',
  getAssetsDetails:"/Farmer/",

  //Old_API's - Callmethod>>>>

  postCropDetails: '/crop/save-selected-crops',
  cropInstruction: '/crop/crop-advisory-item',
  selectedCrop: '/crop/selectedcrops',
  allAppLanguage: '/language/all',
  getIrrigationSource: '/Farmer/irrigationsource/all',
  getIrrigationMethod: '/Farmer/irrigationmethod/all',
  getSoilType: '/Farmer/soiltype/all',
  getOwnerShipType: '/Farmer/ownershiptype/all',
  districtList: '/crop/location/districts',
  cropsList: '/crop',
  getUserAddress:"/shipment-tracker/GetDeliveryAddress/"
  //Old_API's - Callmethod>>>>
};
