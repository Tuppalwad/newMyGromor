import axios from 'axios';
import qs from 'qs';
import {Configuration} from '../config';
import {UserManager} from '../storage';

// // `data` is the data to be sent as the request body
// // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
// export async function getHttpClient(
//   path: string,
//   method: string,
//   data: Object,
//   params: Object = null,
//   headers: Object = null,
//   baseUrl = null,
// ) {
//   const query =
//     params !== null ? '?' + qs.stringify(params, {allowDots: true}) : '';
//   const urlPath = path + query;
//   const Final_baseURL =
//     baseUrl !== null && baseUrl !== undefined
//       ? baseUrl + urlPath
//       : Configuration.FarmerURL + urlPath;
//   UserManager.loadUser();

//   // console.log('****FINAL_DATA', { Final_baseURL });

//   const client = axios.create({
//     baseURL: Final_baseURL,
//     method: method,
//     timeout: 60 * 1000,
//     headers: headers || {},
//   });

//   // console.log('\n\n ** DATA IS **', data);

//   if (baseUrl === null) {
//     //  console.log('\n\n ** BASE URL IS REQUIRED **');
//   } else {
//     //  console.log('\n\n ** BASE URL IS **', baseUrl);
//   }
//   // Add a request interceptor
//   client.interceptors.request.use(
//     function (config) {
//       //  console.log("Config is");
//       console.log('Bearer ' + UserManager.getAccessToken);
//       if (UserManager.isLoggedIn) {
//         config.headers.Authorization = 'Bearer ' + UserManager.getAccessToken;
//       }
//       // dummy checking purpose
//       // config.headers.Authorization = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmOWMzODNlZC03YTQxLTQyZjgtYTRjYS1jNzBlNzAyNWQwNTUiLCJ1bmlxdWVfbmFtZSI6Ijk2Mjk0MjA5OTEiLCJqdGkiOiJjMWU1OWU5MS1mZjIwLTQxY2QtOGVlNS0xYjU0ZjQ5ZTdhOTAiLCJleHAiOjE2NDU2OTIzMzEsImlzcyI6Imh0dHBzOi8vbXlncm9tb3IyMGRldi5jb3JvbWFuZGVsLmJpei9pZGVudGl0eS5hcGkiLCJhdWQiOiJodHRwczovL215Z3JvbW9yMjBkZXYuY29yb21hbmRlbC5iaXovaWRlbnRpdHkuYXBpIn0.nt_a2yjgJE8_MmKuiKZte2jFjkWG8KHkwD-6xd4PAqg'

//       //weather api headers
//       if (baseUrl == Configuration.WeatherURL) {
//         delete config.headers.Authorization;
//         delete config.headers['X-API-KEY'];
//         config.headers['content-type'] = 'application/json';
//       }

//       if (headers !== null && headers !== undefined) {
//         // console.log('headers', config.headers);
//         config.headers = {...config.headers, ...headers};
//       }
//       // if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded'){
//       //   data = qs.stringify({ 'bar': 123 });
//       // }
//       config.data = data;
//       // Do something before request is sent
//       // console.log(config,"configconfig");
//       return config;
//     },
//     function (error) {
//       // Do something with request error
//       return Promise.reject(error);
//     },
//   );
//   //
//   // // Add a response interceptor
//   client.interceptors.response.use(
//     async function (response) {
//       // console.log('interceptors response', response.data);
//       // Any status code that lie within the range of 2xx cause this function to trigger
//       // Do something with response data
//       return response;
//     },
//     async function (error) {
//       // eslint-disable-next-line no-shadow
//       let data = error.response || {};
//       if (data.hasOwnProperty('data')) {
//         data = data.data;
//       }

//       // console.log('interceptors error', data);

//       if (Object.keys(data).length === 0) {
//         data = error;
//         console.log('raw error', error);
//       }

//       console.log(error + 'Final_baseURL :' + Final_baseURL, 'errorerrorerror');

//       // Any status codes that falls outside the range of 2xx cause this function to trigger
//       // Do something with response error
//       return Promise.reject(data);
//     },
//   );
//   //
//   //     const instance = axios.create();
//   //
//   // // Override timeout default for the library
//   // // Now all requests using this instance will wait 2.5 seconds before timing out
//   //     instance.defaults.timeout = 2500;
//   //
//   //
//   //     return instance.get('http://172.16.0.14:4549/api/language', {
//   //         timeout: 5000
//   //     });
//   return client.request();
// }



export async function getHttpClient(
  path: string,
  method: string,
  data: Object,
  params: Object = null,
  headers: Object = null,
  baseUrl = null,
) {
  const query =
    params !== null ? '?' + qs.stringify(params, { allowDots: true }) : '';
  const urlPath = path + query;
  const Final_baseURL =
    baseUrl !== null && baseUrl !== undefined
      ? baseUrl + urlPath
      : Configuration.FarmerURL + urlPath;
  UserManager.loadUser();

  const client = axios.create({
    baseURL: Final_baseURL,
    method: method,
    timeout: 60 * 1000,
    headers: headers || {},
  });

  client.interceptors.request.use(
    function (config) {
      config.metadata = { startTime: new Date().getTime() }; // Start time
      if (UserManager.isLoggedIn) {
        config.headers.Authorization = 'Bearer ' + UserManager.getAccessToken;
      }
      if (baseUrl == Configuration.WeatherURL) {
        delete config.headers.Authorization;
        delete config.headers['X-API-KEY'];
        config.headers['content-type'] = 'application/json';
      }
      if (headers) {
        config.headers = { ...config.headers, ...headers };
      }
      config.data = data;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    async function (response) {
      const endTime = new Date().getTime();
      const startTime = response.config.metadata.startTime;
      console.log(`API Call to ${Final_baseURL} took ${endTime - startTime} ms`);
      return response;
    },
    async function (error) {
      const endTime = new Date().getTime();
      const startTime = error.config?.metadata?.startTime || endTime;
      console.log(`API Call to ${Final_baseURL} failed and took ${endTime - startTime} ms`);
      return Promise.reject(error.response || error);
    }
  );

  return client.request();
}
