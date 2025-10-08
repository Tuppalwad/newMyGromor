import { UserType } from './type';

const initialState = {
  userProfile: null,
  appLanguage: [],
  cropsForSelection: [],
  selectedCrops: [],
  getSelectedCrops: [],
  irrigationSource: [],
  irrigationMethod: [],
  soilType: [],
  ownerShipType: [],
  stateList: [],
  districtList: [],
  villageList: [],
  cropList: [],
  farmerIdentity: null,
  appMultiLanguage: [],
  allAppLanguage: [],
  assetsDetails: {},
  previousAddress: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case UserType.appLanguage + '_SUCCESS':
      const dropdownData = action.payload.map(language => {
        return { label: language.name, value: language.language, ...language };
      });
      return { ...state, appLanguage: dropdownData };
    case UserType.appMultiLanguage + '_SUCCESS':
      return { ...state, appMultiLanguage: action.payload };
    case UserType.getStateList + '_SUCCESS':
      return { ...state, stateList: action.payload };
    case UserType.magicDistrictList + '_SUCCESS':
      return { ...state, districtList: action.payload.results };
    case UserType.magicVillageList + '_SUCCESS':
      return { ...state, villageList: action.payload.results };
    case UserType.getAssetsDetails + '_SUCCESS':
      return { ...state, assetsDetails: action.payload };

    case UserType.getUserAddress + '_SUCCESS':
      return { ...state, previousAddress: action.payload };

    default:
      return { ...state };
  }
};
export default userReducer;
