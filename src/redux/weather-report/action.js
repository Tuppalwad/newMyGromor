import { WeatherAPIPath, WeatherType } from './type';
import { Configuration } from '../../config';

//Please define base URL for all 

export const getWeatherAction = (param) => {

  const path = param.activeTab == 1 ? "hourly" : "daily"

  const newParms =
  {
    units: param.units,
    appid: param.appid,
    lat: param.lat,
    lon: param.lon,
    cnt: param.cnt,
  };

  return {
    type: WeatherType.weather,
    request: {
      path: WeatherAPIPath.weather + path,
      method: 'GET',
      baseUrl: Configuration.WeatherURL,
      params: newParms
    },
  };
};

export const getMonthlyWeatherAction = (param) => {
  return {
    type: WeatherType.monthlyWeather,
    request: {
      path: WeatherAPIPath.monthlyWeather,
      method: 'GET',
      baseUrl: Configuration.ProWeatherURL,
      params: param
    },
  };
};

export const getCurrentWeatherAction = (param) => {
  return {
    type: WeatherType.currentWeather,
    request: {
      path: WeatherAPIPath.currentWeather,
      method: 'GET',
      baseUrl: Configuration.WeatherURL,
      params: param
    },
  };
};


export const setLocationAction = (data) => {
  return {
    type: WeatherType.location,
    payload: data
  }
}