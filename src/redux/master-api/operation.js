import { 
    getEducationDDListAction,getMyPreferenceDDListAction, getSoilTypesDDListAction,
    getIrrigationMethodsDDListAction,getOwnerShipDDListAction,
} from './action';

export const getEducationDDList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getEducationDDListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getMyPreferenceDDList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getMyPreferenceDDListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const getSoilTypesDDList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getSoilTypesDDListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};



export const getIrrigationMethodsDDList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getIrrigationMethodsDDListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getOwnerShipDDList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getOwnerShipDDListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

