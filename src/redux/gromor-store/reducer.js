import { StoreType } from './type';

const initialState = {
    allStore: [],
    AllStoreDetails: [],
    RecommenedStoreDetails:[]
};

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case StoreType.storeByLocation + '_SUCCESS':
            return { ...state, allStore: action.payload };
        case StoreType.getAllStore + '_SUCCESS':
            return { ...state, AllStoreDetails: action.payload };
        case StoreType.getRecommenedStore + '_SUCCESS':
            return { ...state,RecommenedStoreDetails: action.payload };

        default:
            return { ...state };
    }
};

export default storeReducer;