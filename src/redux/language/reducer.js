import { LANGUAGE_DATA, LANGUAGES, SELECTEDLANGUAGE } from "./type";

const initialState = {
    language: null,
    languageData: null,
    selectedLanguage: null
}

export const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LANGUAGES:
            return {
                ...state,
                language: action.payload
            }

        case LANGUAGE_DATA:
            return {
                ...state,
                languageData: action.payload
            }
        case SELECTEDLANGUAGE:
            return {
                ...state,
                selectedLanguage: action.payload
            }

        default:
            return state;
    }
}