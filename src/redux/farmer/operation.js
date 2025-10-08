import {
  postMyPracticeAction,
  getMyPracticeFertilizeDDListAction,
  getMyPracticeManagementDDListAction,
  getMyPracticeListAction,
  updateMyPracticeAction,
  deleteMyPracticeAction,
  getFarmerAddressAction,
  sendEmailAction,
  getFarmerpostLoginAction,
  getNotificationAction,
  deleteNotificationAction,
  getGeofencingAction,
  postGeofencingAction,
  updateNotificationAction,
  getNewDeliveryChargesAction,
  callMethodAction,
  getFarmerLanguageAction,
  getclassificationofFarmerAction,
  getclassificationofFarmerUpdateAction,
  getFarmerStoreCodeAction,
  getfarmerTypeAction,
  getUpdateStoreAction,
  getMiniumCountAction,
  setSpringServicesAddress,
  getProductsRecommendations,
} from './action';

import UserManager from '../../storage/user-manager';
import {useOperation} from '../../redux/operation';
import {isEmpty} from '../../utils/validator';

export const postCallMethod = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(callMethodAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getMyPracticeList = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getMyPracticeListAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const submitMyPractice = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(postMyPracticeAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};
export const deleteMyPractice = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(deleteMyPracticeAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const updateMyPractice = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(updateMyPracticeAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getMyPracticeFertilizeDDList = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getMyPracticeFertilizeDDListAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getMyPracticeManagementDDList = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getMyPracticeManagementDDListAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getFarmerpostLogin = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getFarmerpostLoginAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getFarmerAddress = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getFarmerAddressAction(param));
        const data = user.data;
        if (!isEmpty(data.storeCode)) {
          dispatch(getFarmerStoreCode(data.storeCode));

          dispatch(
            useOperation().product.getMyCart({
              farmerId: data.farmerIdentityId,
              language: UserManager.getUserLanguage,
            }),
          );
          dispatch(
            useOperation().product.getMyCartBooking({
            language: UserManager.getUserLanguage,
            farmerId: data.farmerIdentityId,
          })
        )
        }
        resolve(data);
        UserManager.loadUser();
        let userData = {...UserManager.user, address: data};
        UserManager.saveUser(userData)
          .then(() => {
            resolve(user);
          })
          .catch(err => {
            dispatch(useOperation().user.getErrorHandling(err, 'saveUser'));
          });
      } catch (e) {
        reject(e);
        dispatch(useOperation().user.getErrorHandling(e, 'getFarmerAddress'));
      }
    });
  };
};

export const getFarmerStoreCode = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getFarmerStoreCodeAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getNewDeliveryCharges = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getNewDeliveryChargesAction(param));
        // console.log(user, 'usersssssssssss');
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const sendEmailList = params => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(sendEmailAction(params));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getNotification = params => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getNotificationAction(params));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};


export const getMinimumCount = () =>{
  return dispatch =>{
    return new Promise(async(resolve,reject)=>{
      try {
        const user = await dispatch(getMiniumCountAction());
        const data = user.data;
        resolve(data);
      } catch (error) {
        reject(error)
      }
    })
  }
}

export const updateNotification = params => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(updateNotificationAction(params));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const deleteNotification = params => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(deleteNotificationAction(params));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getGeofencing = params => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getGeofencingAction(params));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const postGeofencing = params => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(postGeofencingAction(params));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const classificationofFarmerAction = params => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getclassificationofFarmerAction(params));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const farmerTypeAction = params => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getfarmerTypeAction(params));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const classificationofFarmerUpdateAction = params => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(
          getclassificationofFarmerUpdateAction(params),
        );
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getUpdateStore = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getUpdateStoreAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};



export const getFarmerLanguage = data => {
  return getFarmerLanguageAction(data);
};


export const setSpringAddress = param => {
  console.log(param)
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(setSpringServicesAddress(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};


