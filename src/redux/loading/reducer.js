import { LOADING } from "./type";

const initialState = {
    isloading: false
}


export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                isloading: action.payload
            }

        default:
            return state;
    }
}