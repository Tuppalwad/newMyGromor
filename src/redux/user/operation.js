import {
  generateOTPAction,
  getAppLanguageAction,
  resendOTPAction,
  userDetailsUpdateAction,
  verifyOTPAction,
  createCropDetailsAction,
  getMagicStateListAction,
  getMagicDistrictListAction,
  getMagicVillageListAction,
  uploadProfileImageAction,
  getFarmerDetailsAction,
  userLaguageUpdateAction,
  deleteCropDetailsAction,
  notificationSendAction,
  getAppMultiLanguageAction,
  getdeleteAccountAction,
  getVersionHistoryAction,
  updateAssetsDetailsAction,
  getAssetsDetailsAction,
  getUserAddress,
} from './action';

import UserManager from '../../storage/user-manager';
import { HEToast } from '../../components/toast';
import { isEmpty } from '../../utils/validator';

export const generateOTP = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(generateOTPAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const verifyOTP = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(verifyOTPAction(param));
        const data = user.data;
        UserManager.loadUser();
        let userData = {
          ...data,
          language: param?.selectedLanguage?.language ?? 'English',
          languageId: param?.selectedLanguage?.id ?? 1,
          languageCharacter: param?.selectedLanguage?.character ?? 'A',
        };
        if (data?.token != null) {
          UserManager.saveUser(userData)
            .then(() => {
              resolve(user);
            })
            .catch(err => {
              // console.log(err);
            });
        }
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const resendOTP = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(resendOTPAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
        // console.log(e);
      }
    });
  };
};

export const getAppLanguage = () => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const language = await dispatch(getAppLanguageAction());
        const data = language.data;
        resolve(data);
      } catch (e) {
        console.log(e, 'error');
        reject(e);
      }
    });
  };
};

export const updateUserDetails = (param, id) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(userDetailsUpdateAction(param, id));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const deleteCropDetails = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(deleteCropDetailsAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const createCropDetails = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(createCropDetailsAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getMagicVillageList = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getMagicVillageListAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};
export const getMagicDistrictList = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getMagicDistrictListAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};
export const getMagicStateList = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getMagicStateListAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const uploadProfileImage = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(uploadProfileImageAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getFarmerDetails = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getFarmerDetailsAction(param));
        const data = user.data;
        if (data) {
          let userData = {
            ...UserManager.user,
            identity: data,
          };
          UserManager.saveUser(userData);
        }
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const userLaguageUpdate = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(userLaguageUpdateAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const notificationSend = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const notify = await dispatch(notificationSendAction(param));
        const data = notify.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getAppMultiLanguage = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getAppMultiLanguageAction(param));
        const data = user.data;
        UserManager.loadAppMultiLangauge();
        if (data) {
          UserManager.saveAppMultiLanguage(data);
        }
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getVersionHistory = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getVersionHistoryAction(param));
        const data = user.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getdeleteAccount = param => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getdeleteAccountAction(param));
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const updateAssetsDetails = (param, farmerId) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(updateAssetsDetailsAction(param, farmerId));
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const getAssetsDetails = farmerId => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getAssetsDetailsAction(farmerId));
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  };
};

// export const getErrorHandling = (data, API_Name) => {
//   try {
//     console.log(data, API_Name, 'getErrorHandling');
//     const appLanguage = UserManager?.getAppMultiLanguage;
//     const { message, title, description, errors } = data;
//     if (API_Name == 'farmerTypeAction') {
//       // HEToast(appLanguage?.lblSelectWhoIam ?? 'Select Who I am', 'error')
//     } else if (
//       API_Name === 'InvalidFarmerpostLogin' ||
//       API_Name === 'downloadinvoiceDetails'
//     ) {
//       HEToast(data ?? '', 'error');
//     } 
//     else if (message?.includes('undefined')) {
//       HEToast("Something went wrong,Please try again. ");

//     } 
//     else if (message?.includes('Something')) {
//       HEToast((message ?? ' '));
//     } 
//     else {
//       HEToast(
//         message ?? description ?? title ?? errors[0]?.description ?? ' ',
//         'error',
//       );
//     }
//   } catch (e) {
//     console.log(e, 'catch_getErrorHandling');
//     HEToast((e ?? ''));
//   }
// };



export const getErrorHandling = (data, API_Name) => {
  try {
    if (isEmpty(data)) {
      HEToast("Something went wrong. Please try again later.", 'error');
      return;
    }
    console.log(data, API_Name, "getErrorHandling")
    const appLanguage = UserManager?.getAppMultiLanguage
    const { message, title, description, errors } = data?.data ?? data;

    if (data == null) {
      HEToast("Something went wrong. Please try again later. ", 'error')
      return;
    }
    if (data?.status == 500) {
      HEToast("Something went wrong. Please try again later. ", 'error')
      return;
    }

    if (message?.includes("undefined")) {
      HEToast("Something went wrong. Please try again later. ", 'error')
    }

    if (message?.includes("60000ms")) {
      HEToast("Something went wrong. Please try again later. ", 'error')
    }

    if (message?.includes("Network Error")) {
      HEToast("Network Error. Please try again. ", 'error')
    }

    if (message?.includes("timeout")) {
      HEToast("Network Error. Please try again. ", 'error')
    }

    if (API_Name == "farmerTypeAction") {
      // HEToast(appLanguage?.lblSelectWhoIam ?? 'Select Who I am', 'error')
    } else if (API_Name === "InvalidFarmerpostLogin" || API_Name === "downloadinvoiceDetails") {
      HEToast(data ?? "", 'error')
    } else if (API_Name === "orderShipmentDetails" && title == "ValidationError") {

    } else if (message?.includes("Something")) {
      HEToast("Something went wrong. Please try again later.", 'error')
    } else {
      HEToast(message ?? description ?? title ?? errors[0]?.description ?? " ", 'error')
    }
  } catch (e) {
    console.log(e, "catch_getErrorHandling")
    HEToast("Something went wrong. Please try again later.", 'error')
  }
};

export const getPreviousAddress = farmerId => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await dispatch(getUserAddress(farmerId));
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  };
};
