import { Configuration } from "../../config";

export const WeatherType = {
    weather:'WeatherType/weather',
    monthlyWeather:'monthlyWeather',
    currentWeather:'currentWeather',

    location: 'WeatherType/location'
};

export const WeatherAPIPath = {
    weather: '/forecast/',
    monthlyWeather: '/forecast/climate',
    currentWeather:'/weather'
};
