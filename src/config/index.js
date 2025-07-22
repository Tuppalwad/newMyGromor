/* Dev Endpoint
export const Configuration = {
  FarmerURL: 'http://172.16.0.14:4549/api/',
  IdentityURL: 'http://172.16.0.14:4546/api/'
};
*/

export const BuildTypes = {
  Production: 'Production',
  Development: 'Development',
  Staging: 'Staging',
  PreProduction: 'PreProduction',
};

// export const BUILD = BuildTypes.Production;
export const BUILD = BuildTypes.Development;


export const DEV_BASE_URL = 'https://mygromor20uatazure.coromandel.biz';
export const PROD_BASE_URL = 'https://mygromor.coromandel.biz';

// export const DEV_BASE_URL = 'https://mygromor20uat.coromandel.biz'
// export const PROD_BASE_URL = 'https://mygromor.coromandel.biz'

export const PREPROD_BASE_URL = 'https://mygromor.coromandel.biz';
export const STG_BASE_URL = 'http://172.16.0.14';

// testing payment params
export const PAYMENT_KEY =
  BUILD === BuildTypes.Production ? 'B49p0D' : 'oZ7oo9';
export const PAYMENT_SALT =
  BUILD === BuildTypes.Production ? 'QjOW5Iqh' : 'UkojH5TS';

// export const PAYMENT_KEY =  "oZ7oo9";
// export const PAYMENT_SALT =  "UkojH5TS";
// production payment params
// export const PAYMENT_KEY = "B49p0D";
// export const PAYMENT_SALT = "QjOW5Iqh";
// Weather URL Version, Change this if any update from the 3rd party provider version\

export const WEATHER_VERSION = '2.5';
export const WEATHER_APP_KEY = '70b89900c420a15c1e0d59123470db2c';
export const G_Tracker_ID = 'G-SVW9GDNK6T';
export const App_Current_VERSION = '.1';

export const Configuration = {
  ...getURL(),
};

function getURL() {
  if (BUILD === BuildTypes.Production) {
    const BASE_URL = PROD_BASE_URL;
    return {
      FarmerURL: BASE_URL + '/farmer.api/api',
      CommunityURL: BASE_URL + '/community.api/api',
      IdentityURL: BASE_URL + '/identity.api/api',
      ProductURL: BASE_URL + '/product.api/api',
      AdvisoryURL: BASE_URL + '/advisory.api/api',
      ChatURL: BASE_URL + '/chat.api/api',
      NotificationURL: BASE_URL + '/notification.api/api',
      DeliveryURL: BASE_URL + '/delivery.api/api',
      // Weather API
      WeatherURL: 'https://api.openweathermap.org/data/' + WEATHER_VERSION,
      ProWeatherURL: 'https://pro.openweathermap.org/data/' + WEATHER_VERSION,
      ImageURL:
        'https://cilmygromorsa.blob.core.windows.net/gromor-media-prod/',
      feedImageID: 'feeds/',
      tollfreenumber: '1800 425 2828',
      tollfreenumber_Linking: '18004252828',
      version: 'Version',
      buildNo: '',
      contact_Info:
        'We are not operational in your area. Stay tuned; for more information, contact customer service. ',
    };
  } else if (BUILD === BuildTypes.PreProduction) {
    // https://mygromor20uat.coromandel.biz/identity-api-prod/
    // https://mygromor20uat.coromandel.biz/productprod.api/

    const BASE_URL = PREPROD_BASE_URL;
    return {
      FarmerURL: BASE_URL + '/farmer.api/api',
      CommunityURL: BASE_URL + '/community.api/api',
      // IdentityURL: BASE_URL + '/identity-api-prod/api',
      // ProductURL: BASE_URL + '/productprod.api/api', // production payement testing url
      IdentityURL: BASE_URL + '/identity.api/api',
      ProductURL: BASE_URL + '/product.api/api', // uat payement testing url
      AdvisoryURL: BASE_URL + '/advisory.api/api',
      ChatURL: BASE_URL + '/chat.api/api',
      NotificationURL: BASE_URL + '/notification.api/api',
      DeliveryURL: BASE_URL + '/delivery.api/api',
      // Weather API
      WeatherURL: 'https://api.openweathermap.org/data/' + WEATHER_VERSION,
      ProWeatherURL: 'https://pro.openweathermap.org/data/' + WEATHER_VERSION,
      ImageURL: 'https://cilmygromorsa.blob.core.windows.net/gromor-media/',
      feedImageID: 'feeds/',
      tollfreenumber: '1800 425 2828',
      tollfreenumber_Linking: '18004252828',
      version: 'Pre-Prod_Version',
      buildNo: '',
      contact_Info:
        'We are not operational in your area. Stay tuned; for more information, contact customer service. ',
    };
  } else if (BUILD === BuildTypes.Development) {
    const BASE_URL = DEV_BASE_URL;
    return {
      FarmerURL: BASE_URL + '/farmer.api/api',
      CommunityURL: BASE_URL + '/community.api/api',
      IdentityURL: BASE_URL + '/identity.api/api',
      ProductURL: BASE_URL + '/product.api/api', // uat payement testing url
      // ProductURL: BASE_URL + '/productprod.api/api', // production payement testing url
      AdvisoryURL: BASE_URL + '/advisory.api/api',
      ChatURL: BASE_URL + '/chat.api/api',
      NotificationURL: BASE_URL + '/notification.api/api',
      DeliveryURL: BASE_URL + '/delivery.api/api',
      // Weather API
      WeatherURL: 'https://api.openweathermap.org/data/' + WEATHER_VERSION,
      ProWeatherURL: 'https://pro.openweathermap.org/data/' + WEATHER_VERSION,
      ImageURL: 'https://cilmygromorsa.blob.core.windows.net/gromor-media/',
      feedImageID: 'feeds/',
      tollfreenumber: '1800 425 2828',
      tollfreenumber_Linking: '18004252828',
      version: 'UAT_Version',
      buildNo: App_Current_VERSION,
      contact_Info:
        'We are not operational in your area. Stay tuned; for more information, contact customer service. ',
    };
  } else if (BUILD === BuildTypes.Staging) {
    const BASE_URL = STG_BASE_URL;
    return {
      FarmerURL: BASE_URL + ':4549/api',
      CommunityURL: BASE_URL + ':4546/api',
      IdentityURL: BASE_URL + ':4546/api',
      ProductURL: BASE_URL + ':4547/api',
      AdvisoryURL: BASE_URL + ':4550/api',
      ChatURL: BASE_URL + ':4548/api',
      NotificationURL: BASE_URL + ':4548/api',
      DeliveryURL: BASE_URL + '/delivery.api/api',
      // Weather API
      WeatherURL: 'https://api.openweathermap.org/data/' + WEATHER_VERSION,
      ProWeatherURL: 'https://pro.openweathermap.org/data/' + WEATHER_VERSION,
      ImageURL: 'https://cilmygromorsa.blob.core.windows.net/gromor-media/',
      feedImageID: 'feeds/',
      tollfreenumber: '1800 425 2828',
      tollfreenumber_Linking: '18004252828',
      version: 'UAT_Version',
      buildNo: App_Current_VERSION,
      contact_Info:
        'We are not operational in your area. Stay tuned; for more information, contact customer service. ',
    };
  }
}

// // Stg Endpoint
// export const Configuration = {
//   FarmerURL: 'https://mygromor20uat.coromandel.biz/farmer.api/api',
//   IdentityURL: 'https://mygromor20uat.coromandel.biz/identity.api/api',
//   ProductURL: 'https://mygromor20uat.coromandel.biz/product.api/api',

//   // Weather API

//   WeatherURL: 'https://api.openweathermap.org/'
// };
