import { 
    getWeatherAction, 
    getMonthlyWeatherAction,
    setLocationAction,
    getCurrentWeatherAction
} from './action';

export const setLocation = (data) => {
    return setLocationAction(data)
};

export const getWeather = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const weather = await dispatch(getWeatherAction(param));
                const data = weather.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getMonthlyWeather = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const weather = await dispatch(getMonthlyWeatherAction(param));
                const data = weather.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getCurrentWeather = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const weather = await dispatch(getCurrentWeatherAction(param));
                const data = weather.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};
