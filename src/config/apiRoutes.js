export const APIPath = {
    appLanguage: '/farmer.api/api/language',
    generateOTP: '/identity.api/api/auth/otpGenerate',
    verifyOTP: '/identity.api/api/auth/login/mobile',
    resendOTP: '/identity.api/api/auth/resendOTP',
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
    appMultiLanguage: '/farmer.api/api/language/label',
    appPhasetwo: "appPhasetwo",
    versionHistory: "/mygromor-version-history/forceupdate",
    deleteAccount: "/auth/delete-account/",
    stateList: '/crop/location/states',
    getAssetsDetails: "/Farmer/",

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
    getUserAddress: "/shipment-tracker/GetDeliveryAddress/"
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
    farmerclassificationcode: '/farmer.api/api/Farmer/classification-code/',
    farmerAddress: '/Farmer/GetFarmerDetails?mobileNumber=',
    getNewDeliveryCharges: '/delivery-charge/delivery/charge',
    farmerStoreCode: '/Store/storeCode',
    sendEmail: '/Farmer/send-email',
    getNotification: '/notification/notification-by-userid',
    updateNotification: '/notification/update',
    deleteNotification: '/notification/delete-notification',
    FarmerpostLogin: '/farmer.api/api/Farmer/postLogin',
    getGeoFencingByFarmer: '/Farmer/geofencing',
    postGeoFencingByFarmer: '/Farmer/geofencing',
    UpdateStore: '/Farmer/UpdateStore',
    SpringServicesAddress: '/sprayingService/addSprayingService',
    classificationofFarmer: '/farmer.api/api/ClassificationofFarmer/get-farmerClassificationDropdown/',
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

export const APImethod = {
    POST: "POST",
    GET: 'GET',
    PUT: "PUT",
    UPDATE: "UPDATE",
    DELETE: "DELETE"
}