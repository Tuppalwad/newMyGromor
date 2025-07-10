import { USERCLISIFICATION, USERDATA } from "./type"

export const setUserData = (data) => {
    return {
        type: USERDATA,
        payload: data
    }
}

export const setClisification = (data) => {
    return {
        type: USERCLISIFICATION,
        payload: data
    }
}