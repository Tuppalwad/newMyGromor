export const AdvisoryType = {

  cropNewAdvisoryItems: 'cropNewAdvisoryItems',
  getCropsList: 'getCropsList',
  getCropListOFDropdown:'getCropListOFDropdown',
  postQuery: 'postQuery',
  updatePostQuery: 'updatePostQuery',
  deletePostQuery: 'deletePostQuery',
  allPostedQueries: 'allPostedQueries',
  postVideoConsulation: 'postVideoConsulation',
  allVideoQueries: 'allVideoQueries',
  deleteVideoConsulation: 'deleteVideoConsulation',
  updateVideoConsulation: 'updateVideoConsulation',
  postPhysicalConsulation: 'postPhysicalConsulation',
  allPhysicalQueries: 'allPhysicalQueries',
  deletePhysicalConsulation: 'deletePhysicalConsulation',
  updatePhysicalConsulation: 'updatePhysicalConsulation',
  addSoilLeafTest: 'addSoilLeafTest',
  getSoilLeafTest: 'getSoilLeafTest',
  deleteSoilLeafTest: 'deleteSoilLeafTest',
  updateSoilLeafTest: 'updateSoilLeafTest',
  getNutriStateDistrict: 'getNutriStateDistrict',
  getClinicStates: 'getClinicStates',
  getNutriDistrictByState: 'getNutriDistrictByState',
  getNutriByStateDistrict: 'getNutriByStateDistrict',
  myCropList: 'myCropList',
  getMyCropDetails: 'getMyCropDetails',
  updateCropDetails: 'updateCropDetails',
  getNutrientCrops: 'getNutrientCrops',
  getNutrientDeficiency: 'getNutrientDeficiency',
  postFarmlands: "postFarmlands",
  getMyGeoFencing: "getMyGeoFencing",
  deleteMyGeoFencing: "deleteMyGeoFencing",
  getMyGeoFencingDetails: "getMyGeoFencingDetails",

  seasonDropdown: "seasonDropdown",
  irrigationtypeDropdown: "irrigationtypeDropdown",
  soiltypeDropdown: "soiltypeDropdown",
  cropDropdown: "cropDropdown",
  reportLanguageDropdown: "reportLanguageDropdown",
  downloadSummary: "downloadSummary",
  getPlantixSummary: "getPlantixSummary",
  getPlantixCrops: "getPlantixCrops",
  getPlantixCapture: "getPlantixCapture",
  getPlantixDetails:"getPlantixDetails",
  getPlantixDiagnosesReadNames:"/plantix/",
  predictedDiagnose:"predictedDiagnose",
  cropCheck: 'cropCheck',
  getNutriClinicState: 'getNutriClinicState',
  crop: 'crop',
  getHniCrop: 'getHniCrop',
  cropAdvisoryItems: 'cropAdvisoryItems',
  checkIsCropSelected: 'checkIsCropSelected',
  getAllNutriClinics: 'getAllNutriClinics',
  GetRecommendation:'GetRecommendation',

  //Old_API's - Callmethod>>>>

};

export const AdvisoryAPIPath = {

  cropNewAdvisoryItems: '/crop/get-advisory-item-detail',
  getCropsList: '/crop/get-crops',
  getCropDropdownUrl:'/crop/getSprayCropsDropdown',
  /*Post query ***/
  postQuery: '/crop-advisory-query/post-query',
  updatePostQuery: '/crop-advisory-query/update-post-query',
  deletePostQuery: '/crop-advisory-query/delete-post-query-by-id',
  allPostedQueries: '/crop-advisory-query/get-posted-queries',
  /*Video query ****/
  deleteVideoConsulation: '/crop-advisory-query/delete-video-query-by-id',
  updateVideoConsulation: '/crop-advisory-query/update-video-consulation',
  postVideoConsulation: '/crop-advisory-query/video-consulation',
  allVideoQueries: '/crop-advisory-query/get-video-consulation-queries',
  /*Physical query ****/
  postPhysicalConsulation: '/crop-advisory-query/physical-consulation',
  allPhysicalQueries: '/crop-advisory-query/get-physical-consulation-queries',
  updatePhysicalConsulation: '/crop-advisory-query/update-physical-consultation',
  deletePhysicalConsulation: '/crop-advisory-query/delete-physical-consulation-by-id',

  /**soil leaf testing */
  addSoilLeafTest: '/soil-leaf-test/add-soil-leaf-testing',
  getSoilLeafTest: '/soil-leaf-test/get-soil-leaf-testing-by-user',
  deleteSoilLeafTest: '/soil-leaf-test/soil-leaf-testing-by-id',
  updateSoilLeafTest: '/soil-leaf-test/update-soil-leaf-testing',
  downloadSummary: "/Farmlands",

  /* Clinics */

  getNutriStateDistrict: '/nutric-clinic/get-nutric-clinic-state-district',
  getClinicStates: '/nutric-clinic/get-nutriclinic-state',
  getNutriDistrictByState: '/nutric-clinic/get-nutriclinic-district-by-state',
  getNutriByStateDistrict: '/nutric-clinic/get-nutric-clinic-state-district',
  myCropList: '/crop-detail/get-all-crops',
  getMyCropDetails: '/crop-detail/get-crop-by-cropId-farmerId',
  updateCropDetails: '/crop-detail/update-crop',
  getNutrientCrops: '/crop/nutrient-crops',
  getNutrientDeficiency: '/crop/nutrient-deficiency',
  postFarmlands: "/Farmlands",
  getMyGeoFencing: "/Farmlands",
  deleteMyGeoFencing: "/Farmlands",
  getMyGeoFencingDetails: "/Farmlands",

  seasonDropdown: "/farmlands/config/season_dropdown/",
  irrigationtypeDropdown: "/farmlands/config/irrigationtype_dropdown/",
  soiltypeDropdown: "/farmlands/config/soiltype_dropdown/",
  cropDropdown: "/farmlands/config/crop_dropdown/",
  reportLanguageDropdown: "/farmlands/config/report_language_dropdown/",
  getPlantixSummary: "/plantix/summary/",
  getPlantixCrops: "/plantix/cropList/",
  getPlantixCapture: "/plantix/",
  getPlantixDetails: "/plantix/",
  getPlantixDiagnosesReadNames:"/plantix/",

  //Old_API's - Callmethod>>>>

  getNutriClinicState: '/nutric-clinic/get-nutric-clinic-state',
  crop: '/crop/get-non-hni-crops',
  getHniCrop: '/crop/get-hni-crops',
  cropAdvisoryItems: '/crop/crop-advisory-item',
  checkIsCropSelected: '/crop/has-selected-crops',
  getAllNutriClinics: '/nutric-clinic/get-all',
  getProductsRecommend :'/product/getProductsRecommendations',


  //Old_API's - Callmethod>>>>

}
