import { APImethod, APIPath, FarmerAPIPath } from "../../config/apiRoutes"
import { setClisification, setUserData } from "../../redux/auth/action"
import { setLanguagData, setLanguages } from "../../redux/language/action"
import { makeApiRequest } from "../rest-api"


export const getOtp = (data) => async (dispatch) => {

    try {
        const res = await makeApiRequest({ method: APImethod.POST, url: APIPath.generateOTP, params: data })
        if (res.status == 200) {
            return res
        }

    } catch (error) {
        console.log(error)
    }

}


export const getClasification = (data) => async (dispatch) => {

    try {
        const res = await makeApiRequest({ method: APImethod.GET, url: FarmerAPIPath.classificationofFarmer + data })


        if (res.status == 200) {
            dispatch(setClisification(res.data))
            return res.data
        }

    } catch (error) {
        console.log(error)
    }

}


export const resendOTP = (data) => async (dispatch) => {

    try {
        const res = await makeApiRequest({ method: APImethod.POST, url: APIPath.resendOTP, params: data })
        if (res.status == 200) {
            return res
        }

    } catch (error) {
        console.log(error)
    }

}


export const verify = (data) => async (dispatch) => {

    const headers = {
        'Content-Type': 'application/json', // ✅ make sure this is correct
        Accept: 'application/json',
    }
    try {
        const res = await makeApiRequest({ method: APImethod.POST, url: APIPath.verifyOTP, data: data })

        if (res.status == 200) {
            dispatch(setUserData(res.data))
            return res
        }
        else {
            dispatch(setUserData(null))

        }
    } catch (error) {
        console.log(error)
    }

}



export const getFarmerCode = (data) => async (dispatch) => {

    try {
        const res = await makeApiRequest({ method: APImethod.GET, url: FarmerAPIPath.farmerclassificationcode + data })
        if (res.status) {
            dispatch(setLanguages(res.data))
        }
        else {
            dispatch(setLanguages(null))
        }
    } catch (error) {
        console.log(error)
    }

}


export const postLogin = (data) => async (dispatch) => {

    try {
        const res = await makeApiRequest({ method: APImethod.POST, url: FarmerAPIPath.FarmerpostLogin, data: data })
        if (res.status == 200) {
            return res
        }

    } catch (error) {
        console.log(error)
    }

}
