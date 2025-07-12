import {
    postQueryAction, getPostedQueriesAction,
    postVideoConsultAction, getVideoQueriesAction, postPhysicalConsultAction,
    getPhysicalQueriesAction, postSoilLeafTestAction,
    getSoilLeafTestAction, updatePostQueryAction,
    updatePhysicalConsulationAction, updateVideoConsulationAction, deletePostQueryAction,
    deletePhysicalConsulationAction, deleteVideoConsulationAction,
    getNutriByStateDistrictAction, getMyCropListAction, updateCropDetailsAction,
    getMyCropDetailsAction, getClinicStatesAction,
    getNutriDistrictByStateAction, updateSoilLeafTestAction, deleteSoilLeafTestAction,
    getNutrientDeficiencyAction, getNutrientCropsAction, getCropsAction,
    getNewCropAdvisoryItemAction,postFarmlandsAction,getMyGeoFencingListAction,
    deleteMyGeoFencingListAction,getMyGeoFencingDetailsAction,putFarmlandsAction,
    getReportLanguageDropdownAction,getCropDropdownAction,getSoiltypeDropdownAction,
    getIrrigationtypeDropdownAction,getSeasonDropdownAction,downloadSummaryReportAction,
    getPlantixSummaryAction,getPlantixCaptureAction,getPlantixCropsAction,
    getPlantixDetailsAction,getPlantixDiagnosesReadNamesAction,
    getProductsRecommendations,
    getCropsForDropDown

} from './action';

export const getCrops = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getCropsAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getCropsDrop = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getCropsForDropDown(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getNewCropAdvisoryItem = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getNewCropAdvisoryItemAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const postQueryList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postQueryAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getPostedQueriesList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getPostedQueriesAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};
export const postVideoConsultList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postVideoConsultAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getVideoQueriesList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getVideoQueriesAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const postPhysicalConsultList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postPhysicalConsultAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getPhysicalQueriesList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getPhysicalQueriesAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const postSoilLeafTestList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postSoilLeafTestAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getSoilLeafTestList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getSoilLeafTestAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

////
export const updatePostQueryList = (params, id) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(updatePostQueryAction(params, id));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const updatePhysicalConsulationList = (params, id) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(updatePhysicalConsulationAction(params, id));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const updateVideoConsulationList = (params, id) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(updateVideoConsulationAction(params, id));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const deletePostQueryList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(deletePostQueryAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const deletePhysicalConsulationList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(deletePhysicalConsulationAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const deleteVideoConsulationList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(deleteVideoConsulationAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getNutriByStateDistrictList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getNutriByStateDistrictAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};



export const getMyCropList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getMyCropListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const getClinicStatesList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getClinicStatesAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getMyCropDetails = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getMyCropDetailsAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};
export const getNutriDistrictByStateList = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getNutriDistrictByStateAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const updateCropDetails = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(updateCropDetailsAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const deleteSoilLeafTestList = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(deleteSoilLeafTestAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const updateSoilLeafTestList = (params, id) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(updateSoilLeafTestAction(params, id));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getNutrientCrops = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getNutrientCropsAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getNutrientDeficiency = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getNutrientDeficiencyAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const postFarmlands = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postFarmlandsAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const putFarmlands = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(putFarmlandsAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getMyGeoFencingList = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getMyGeoFencingListAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getMyGeoFencingDetails = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getMyGeoFencingDetailsAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const deleteMyGeoFencingList = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(deleteMyGeoFencingListAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const downloadSummaryReport = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(downloadSummaryReportAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const getSeasonDropdown = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getSeasonDropdownAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getIrrigationtypeDropdown = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getIrrigationtypeDropdownAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getSoiltypeDropdown = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getSoiltypeDropdownAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getCropDropdown = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getCropDropdownAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getReportLanguageDropdown = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getReportLanguageDropdownAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const getPlantixSummary = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getPlantixSummaryAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getPlantixCrops = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getPlantixCropsAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getPlantixCapture = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getPlantixCaptureAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getPlantixDetails = (params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getPlantixDetailsAction(params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const getPlantixDiagnosesReadNames = (paramsID,params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getPlantixDiagnosesReadNamesAction(paramsID,params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const getProductsRecommend=(param) =>{
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const user = await dispatch(getProductsRecommendations(param));
          const data = user.data;
          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
    };
  }
  