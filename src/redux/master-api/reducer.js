import { MasterType } from './type';
const initialState = {
    cropDropdownList: [],
    cropAdvisoryDropdownList: [],
    educationDropDown: [],
    myPreferenceDropdown: [],
    gadgetsDropDown: [],

    soilTypesDropDown: [],
    irrigationMethodsDropDown: [],
    irrigationSourceDropDown: [],
    ownershipDropDown: []
};
const masterReducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {

        case MasterType.educationDropDown + '_SUCCESS':
            return { ...state, educationDropDown: action.payload };
        case MasterType.myPreferenceDropdown + '_SUCCESS':
            return { ...state, myPreferenceDropdown: action.payload };

        case MasterType.irrigationMethodsDropDown + '_SUCCESS':
            var irregationMethodData = [];
            for (let i = 0; i < action.payload.length; i++) {
                irregationMethodData.push({
                    "value": action.payload[i].id,
                    "label": action.payload[i].name
                })
            }
            return { ...state, irrigationMethodsDropDown: irregationMethodData };

        case MasterType.soilTypesDropDown + '_SUCCESS':
            var soilType = [];
            for (let i = 0; i < action.payload.length; i++) {
                soilType.push({
                    "value": action.payload[i].id,
                    "label": action.payload[i].name
                })
            }
            return { ...state, soilTypesDropDown: soilType };

        case MasterType.ownerShipDropDown + '_SUCCESS':
            var ownerType = [];
            for (let i = 0; i < action.payload.length; i++) {
                ownerType.push({
                    "value": action.payload[i].id,
                    "label": action.payload[i].name
                })
            }
            return { ...state, ownershipDropDown: ownerType };

        default:
            return { ...state };
    }
};
export default masterReducer;