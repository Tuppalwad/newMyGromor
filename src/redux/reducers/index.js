import { combineReducers } from 'redux';
import { RESET_STATE } from '../type';
import { loadingReducer } from '../loading/reducer';
import { languageReducer } from '../language/reducer';
import { authReducer } from '../auth/reducder';


const appReducer = combineReducers({
    loading: loadingReducer,
    language: languageReducer,
    auth: authReducer
});

const rootReducer = (state, action) => {
    if (action.type === RESET_STATE) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
