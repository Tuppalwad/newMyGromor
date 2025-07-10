import { USERCLISIFICATION, USERDATA } from "./type";

const initialState = {
    userdata: null,
    clasificationData: null
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case USERDATA:
            return {
                ...state,
                userdata: action.payload
            }

        case USERCLISIFICATION:
            return {
                ...state,
                clasificationData: action.payload
            }

        default:
            return state
    }
}