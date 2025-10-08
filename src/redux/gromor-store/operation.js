import { 
    getStoreByLocationAction,getAllStoreAction,
    getRecommenedStoreAction,getUpdateStoreAction
    // getStoreByIdAction,
} from './action';

export const getStoreByLocation = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getStoreByLocationAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getAllStore = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getAllStoreAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getRecommenedStore = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getRecommenedStoreAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};
