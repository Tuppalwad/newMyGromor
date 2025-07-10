import { APImethod, APIPath } from "../../config/apiRoutes"
import { setLanguagData, setLanguages } from "../../redux/language/action"
import { makeApiRequest } from "../rest-api"


export const getLanguage = () => async (dispatch) => {

    try {
        const res = await makeApiRequest({ method: APImethod.GET, url: APIPath.appLanguage })
        if (res.status == 200) {
            dispatch(setLanguages(res.data))
            return res.data
        }
        else {
            dispatch(setLanguages(null))
        }
    } catch (error) {
        console.log(error)
    }

}

export const getLanguageData = (data) => async (dispatch) => {

    try {
        const res = await makeApiRequest({ method: APImethod.GET, url: `${APIPath.appMultiLanguage}/${data}` })

        if (res.status == 200) {
            dispatch(setLanguagData(res.data))
            return res
        }
        else {
            dispatch(setLanguagData(null))
        }
    } catch (error) {
        console.log(error)
    }

}