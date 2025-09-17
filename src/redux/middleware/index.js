import AsyncStorage from "@react-native-async-storage/async-storage";
import { getHttpClient } from "../../service";
import { HEToast } from '../../components/toast';
import { UserManager } from '../../storage';

const apiMiddleware = (store) => (next) => (action) => {
  if (action && action.request) {
    return new Promise((resolve, reject) => {
      const { request, type } = action;

      if (!type) {
        console.warn("apiMiddleware received an action without type:", action);
        return reject(new Error("Missing action type"));
      }

      // Dispatch request action
      store.dispatch({ type: type + '_REQUEST' });

      getHttpClient(
        request.path,
        request.method,
        request.data,
        request.params,
        request.headers ?? null,
        request.baseUrl
      )
        .then((response) => {
          store.dispatch({
            type: type + '_SUCCESS',
            payload: response.data,
          });

          if (request.offline) {
            AsyncStorage.setItem(type, JSON.stringify(response)).catch(() => { });
          }

          resolve(response);
        })
        .catch((e) => {
          // ✅ Handle 401 Unauthorized
          if (e?.response?.status === 401) {
            // HEToast.show("Session expired. Please login again.");

            // // Clear local storage/session
            // AsyncStorage.clear();
            // UserManager.clear?.();

            // // Dispatch logout or auth failure
            // store.dispatch({ type: "AUTH_LOGOUT" });

            if (UserManager.isLoggedIn) {
              UserManager.logoutDrawer()
              HEToast('Session expired or unauthorized. Please login again.');
              store.dispatch({ type: 'RESET_APP', });
            }
            store.dispatch({ type: action.type + '_FAIL', error: e, payload: e });
            reject(e);
          }

          store.dispatch({
            type: type + '_FAIL',
            error: e,
            payload: e,
          });
          reject(e);
        });
    });
  }

  return next(action);
};

export default apiMiddleware;
