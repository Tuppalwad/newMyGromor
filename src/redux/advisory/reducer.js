import { isEmpty } from '../../utils/validator';
import { AdvisoryType } from './type';

const initialState = {
    myCropList: [],
    HNICropList: [],
    MyGeoFencingList: [],
    MyGeoFencingListDetails: {},

    seasonDropdownArray: [],
    irrigationtypeDropdownArray: [],
    soiltypeDropdownArray: [],
    cropDropdownArray: [],
    reportLanguageDropdownArray: [],

    plantixSummary: [],
    plantixCropsArray: [],
    plantixDetails: {},
    predictedDiagnose: {},
    recommndationData: []
};

const advisoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case AdvisoryType.myCropList + '_SUCCESS':
            return { ...state, myCropList: action.payload };
        case AdvisoryType.getCropsList + '_SUCCESS':
            return { ...state, HNICropList: action.payload };
        case AdvisoryType.getMyGeoFencing + '_SUCCESS':
            return { ...state, MyGeoFencingList: action.payload };
        case AdvisoryType.getMyGeoFencingDetails + '_SUCCESS':
            return { ...state, MyGeoFencingListDetails: action.payload };

        case AdvisoryType.seasonDropdown + '_SUCCESS':
            return { ...state, seasonDropdownArray: action.payload };
        case AdvisoryType.irrigationtypeDropdown + '_SUCCESS':
            return { ...state, irrigationtypeDropdownArray: action.payload };
        case AdvisoryType.soiltypeDropdown + '_SUCCESS':
            return { ...state, soiltypeDropdownArray: action.payload };
        case AdvisoryType.cropDropdown + '_SUCCESS':
            return { ...state, cropDropdownArray: action.payload };
        case AdvisoryType.reportLanguageDropdown + '_SUCCESS':
            return { ...state, reportLanguageDropdownArray: action.payload };

        case AdvisoryType.getPlantixCrops + '_SUCCESS':
            return { ...state, plantixCropsArray: action.payload };
        case AdvisoryType.getPlantixSummary + '_SUCCESS':
            const plantixSummaryList = appendData(state.plantixSummary, action.payload);
            return { ...state, plantixSummary: plantixSummaryList };
        case AdvisoryType.getPlantixDetails + '_SUCCESS':
            return { ...state, plantixDetails: action.payload };
        case AdvisoryType.predictedDiagnose:
            return { ...state, predictedDiagnose: action.payload }

        case AdvisoryType.GetRecommendation:
            return { ...state, recommndationData: action.payload }
        default:
            return { ...state };
    }
};

export default advisoryReducer;


const appendData = (oldData, newData) => {
    if (oldData === null) {
        return newData;
    }
    if (oldData?.pageNo === newData?.pageNo) {
        return newData;
    }

    if (isEmpty(oldData)) {
        let tempData = {
            ...newData,
            data: newData?.data
        };
        return tempData;
    } else {
        let tempData = {
            ...newData,
            data: [...oldData?.data, ...newData?.data],
        };
        return tempData;
    }
};
