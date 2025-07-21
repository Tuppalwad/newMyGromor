import { isUndefined } from 'lodash';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getHttpClient } from "../../service";
import { HEToast } from '../../components/toast';
import { UserManager } from '../../storage';

const apiMiddleware = (store) => (next) => (action) => {
  if (action?.hasOwnProperty('request')) {
    return new Promise((resolve, reject) => {
      const { request } = action;
      let params = request.params;
      const param = action;
      delete param.request;
      let headerData = request?.headers ?? null;
      if (action?.upload === true) {
        // headerData = {'Content-Type': 'multipart/form-data'};
      }
      store.dispatch({ ...param, type: param.type + '_REQUEST' });
      getHttpClient(
        request.path,
        request.method,
        request.data,
        params,
        headerData,
        request?.baseUrl
      ).then((response) => {

        store.dispatch({ type: action.type + '_SUCCESS', payload: response.data, });
        /* offline save data */
        if (request.offline) {
          AsyncStorage.setItem(action.type, JSON.stringify(response))
            .then(() => { })
            .catch(() => { });
        }
        resolve(response);
        // next(action);
      }).catch((e) => {
        const { message, detail } = e;
        /*if status is undefined network unreachable or no internet connect*/
        if (request.offline && isUndefined(e.status)) {
          AsyncStorage.getItem(action.type).then(d => {
            store.dispatch({ type: action.type + '_SUCCESS', response: JSON.parse(d) });
          }).catch(e => { });
          reject(e);
        } else if (message?.includes('401')) {
          if (UserManager.isLoggedIn) {
            UserManager.logoutDrawer()
            HEToast('Session expired or unauthorized. Please login again.');
            store.dispatch({ type: 'RESET_APP', });
          }
          store.dispatch({ type: action.type + '_FAIL', error: e, payload: e });
          reject(e);
        } else {
          store.dispatch({ type: action.type + '_FAIL', error: e, payload: e, });

          console.log(e,'eeeeeeeeeeee')
          reject(e);
        }
      });
    });
  } else {
    next(action);
  }
};

export default apiMiddleware;
