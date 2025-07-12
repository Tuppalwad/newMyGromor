import { WeatherType } from './type';
const initialState = {
    hourlyWeather: [],
    weeklyWeather: [],
    monthlyWeather: [],
    currentWeather: null,
    // device location data
    location: null,
};
const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case WeatherType.weather + '_SUCCESS':
            return {
                ...state,
                hourlyWeather: action.payload?.list ?? [],
                weeklyWeather: action.payload?.list ?? []
            };
        case WeatherType.monthlyWeather + '_SUCCESS':
            return {
                ...state,
                monthlyWeather: action.payload ?? [],
            };
        case WeatherType.currentWeather + '_SUCCESS':
            return {
                ...state,
                currentWeather: action.payload ?? null,
            };
        case WeatherType.location:
            return { ...state, location: action.payload }
        default:
            return { ...state };
    }
};
export default weatherReducer;
