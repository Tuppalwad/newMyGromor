import { LANGUAGE_DATA, LANGUAGES, SELECTEDLANGUAGE } from "./type"

export const setLanguagData = (data) => {
    return {
        type: LANGUAGE_DATA,
        payload: data
    }
}

export const setLanguages = (data) => {
    return {
        type: LANGUAGES,
        payload: data
    }
}

export const setSelectedLanguage = (data) => {
    return {
        type: SELECTEDLANGUAGE,
        payload: data
    }
}