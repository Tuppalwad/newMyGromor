import {AdvisoryAPIPath, AdvisoryType} from './type';
import {Configuration} from '../../config';

//Please define base URL for all,

export const getCropsAction = params => {
  return {
    type: AdvisoryType.getCropsList,
    request: {
      path: AdvisoryAPIPath.getCropsList,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
      params: params,
    },
  };
};

export const getCropsForDropDown = params => {
  return {
    type: AdvisoryType.getCropListOFDropdown,
    request: {
      path: AdvisoryAPIPath.getCropDropdownUrl,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
      params: params,
    },
  };
};

export const getNewCropAdvisoryItemAction = params => {
  return {
    type: AdvisoryType.cropNewAdvisoryItems,
    request: {
      path:
        AdvisoryAPIPath.cropNewAdvisoryItems +
        `/${params?.cropId}/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const postQueryAction = params => {
  return {
    type: AdvisoryType.postQuery,
    request: {
      path: AdvisoryAPIPath.postQuery,
      method: 'POST',
      baseUrl: Configuration.AdvisoryURL,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: '*/*',
      },
    },
  };
};

export const getPostedQueriesAction = params => {
  return {
    type: AdvisoryType.allPostedQueries,
    request: {
      path:
        AdvisoryAPIPath.allPostedQueries +
        `/${params?.userId}/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const postVideoConsultAction = params => {
  return {
    type: AdvisoryType.postVideoConsulation,
    request: {
      path: AdvisoryAPIPath.postVideoConsulation,
      method: 'POST',
      baseUrl: Configuration.AdvisoryURL,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: '*/*',
      },
    },
  };
};

export const getVideoQueriesAction = params => {
  return {
    type: AdvisoryType.allVideoQueries,
    request: {
      path:
        AdvisoryAPIPath.allVideoQueries +
        `/${params?.userId}/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const postPhysicalConsultAction = params => {
  return {
    type: AdvisoryType.postPhysicalConsulation,
    request: {
      path: AdvisoryAPIPath.postPhysicalConsulation,
      method: 'POST',
      baseUrl: Configuration.AdvisoryURL,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: '*/*',
      },
    },
  };
};

export const getPhysicalQueriesAction = params => {
  return {
    type: AdvisoryType.allPhysicalQueries,
    request: {
      path:
        AdvisoryAPIPath.allPhysicalQueries +
        `/${params?.userId}/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const postSoilLeafTestAction = params => {
  return {
    type: AdvisoryType.addSoilLeafTest,
    request: {
      path: AdvisoryAPIPath.addSoilLeafTest,
      method: 'POST',
      baseUrl: Configuration.AdvisoryURL,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: '*/*',
      },
    },
  };
};

export const getSoilLeafTestAction = params => {
  return {
    type: AdvisoryType.getSoilLeafTest,
    request: {
      path:
        AdvisoryAPIPath.getSoilLeafTest +
        `/${params?.userId}/${params?.language}`,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const updatePostQueryAction = (params, id) => {
  return {
    type: AdvisoryType.updatePostQuery,
    request: {
      path: AdvisoryAPIPath.updatePostQuery + '/' + id,
      method: 'PUT',
      baseUrl: Configuration.AdvisoryURL,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: '*/*',
      },
    },
  };
};

export const updateVideoConsulationAction = (params, id) => {
  return {
    type: AdvisoryType.updateVideoConsulation,
    request: {
      path: AdvisoryAPIPath.updateVideoConsulation + '/' + id,
      method: 'PUT',
      baseUrl: Configuration.AdvisoryURL,
      data: params,
    },
  };
};

export const updatePhysicalConsulationAction = (params, id) => {
  return {
    type: AdvisoryType.updatePhysicalConsulation,
    request: {
      path: AdvisoryAPIPath.updatePhysicalConsulation + '/' + id,
      method: 'PUT',
      baseUrl: Configuration.AdvisoryURL,
      data: params,
    },
  };
};

export const deletePostQueryAction = (params, data) => {
  return {
    type: AdvisoryType.deletePostQuery,
    request: {
      path: AdvisoryAPIPath.deletePostQuery + `/${params?.id}`,
      method: 'DELETE',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const deleteVideoConsulationAction = params => {
  return {
    type: AdvisoryType.deleteVideoConsulation,
    request: {
      path: AdvisoryAPIPath.deleteVideoConsulation + `/${params?.id}`,
      method: 'DELETE',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const deletePhysicalConsulationAction = params => {
  return {
    type: AdvisoryType.deletePhysicalConsulation,
    request: {
      path: AdvisoryAPIPath.deletePhysicalConsulation + `/${params?.id}`,
      method: 'DELETE',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getNutriByStateDistrictAction = params => {
  return {
    type: AdvisoryType.getNutriStateDistrict,
    request: {
      path:
        AdvisoryAPIPath.getNutriStateDistrict +
        '?stateName=' +
        params?.state +
        '&districtName=' +
        params?.district,
      //path: AdvisoryAPIPath.getNutriStateDistrict+'?stateName='+params?.state,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getClinicStatesAction = params => {
  return {
    type: AdvisoryType.getClinicStates,
    request: {
      path: AdvisoryAPIPath.getClinicStates,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getNutriDistrictByStateAction = params => {
  return {
    type: AdvisoryType.getNutriDistrictByState,
    request: {
      path: AdvisoryAPIPath.getNutriDistrictByState + `/${params?.stateName}`,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getMyCropListAction = params => {
  return {
    type: AdvisoryType.myCropList,
    request: {
      path: AdvisoryAPIPath.myCropList + `/${params?.id}`,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const getMyCropDetailsAction = params => {
  return {
    type: AdvisoryType.getMyCropDetails,
    request: {
      path:
        AdvisoryAPIPath.getMyCropDetails +
        `/${params?.cropId}/${params?.farmerId}`,
      method: 'GET',
      baseUrl: Configuration.FarmerURL,
    },
  };
};

export const updateCropDetailsAction = (params, id) => {
  return {
    type: AdvisoryType.updateCropDetails,
    request: {
      path: AdvisoryAPIPath.updateCropDetails,
      method: 'PUT',
      baseUrl: Configuration.FarmerURL,
      data: params,
    },
  };
};

///
export const deleteSoilLeafTestAction = params => {
  return {
    type: AdvisoryType.deleteSoilLeafTest,
    request: {
      path: AdvisoryAPIPath.deleteSoilLeafTest + `/${params?.id}`,
      method: 'DELETE',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const updateSoilLeafTestAction = (params, id) => {
  return {
    type: AdvisoryType.updateSoilLeafTest,
    request: {
      path: AdvisoryAPIPath.updateSoilLeafTest + '/' + id,
      method: 'PUT',
      baseUrl: Configuration.AdvisoryURL,
      data: params,
    },
  };
};

export const getNutrientCropsAction = params => {
  return {
    type: AdvisoryType.getNutrientCrops,
    request: {
      path: AdvisoryAPIPath.getNutrientCrops,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
      params: params,
    },
  };
};

export const getNutrientDeficiencyAction = params => {
  return {
    type: AdvisoryType.getNutrientDeficiency,
    request: {
      path: AdvisoryAPIPath.getNutrientDeficiency,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
      params: params,
    },
  };
};

export const postFarmlandsAction = params => {
  return {
    type: AdvisoryType.postFarmlands,
    request: {
      path: AdvisoryAPIPath.postFarmlands,
      method: 'POST',
      baseUrl: Configuration.AdvisoryURL,
      data: params,
    },
  };
};

export const putFarmlandsAction = params => {
  return {
    type: AdvisoryType.postFarmlands,
    request: {
      path:
        AdvisoryAPIPath.postFarmlands +
        `/${params?.farmerId}/${params?.farmlandName}`,
      method: 'PUT',
      baseUrl: Configuration.AdvisoryURL,
      data: params,
    },
  };
};

export const getMyGeoFencingListAction = params => {
  return {
    type: AdvisoryType.getMyGeoFencing,
    request: {
      path: AdvisoryAPIPath.getMyGeoFencing + `/${params?.farmerIdentityId}`,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getMyGeoFencingDetailsAction = params => {
  return {
    type: AdvisoryType.getMyGeoFencingDetails,
    request: {
      path:
        AdvisoryAPIPath.getMyGeoFencing +
        `/${params?.farmerIdentityId}/${params?.farmlandName}`,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const downloadSummaryReportAction = params => {
  return {
    type: AdvisoryType.downloadSummary,
    request: {
      path:
        AdvisoryAPIPath.downloadSummary +
        `/${params?.farmerIdentityId}/report/${params?.farmlandName}`,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const deleteMyGeoFencingListAction = params => {
  return {
    type: AdvisoryType.deleteMyGeoFencing,
    request: {
      path:
        AdvisoryAPIPath.deleteMyGeoFencing +
        `/${params?.farmerIdentityId}/${params?.farmlandName}`,
      method: 'DELETE',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

// ---

export const getReportLanguageDropdownAction = params => {
  return {
    type: AdvisoryType.reportLanguageDropdown,
    request: {
      path: AdvisoryAPIPath.reportLanguageDropdown + params.language,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getCropDropdownAction = params => {
  return {
    type: AdvisoryType.cropDropdown,
    request: {
      path: AdvisoryAPIPath.cropDropdown + params.language,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getSoiltypeDropdownAction = params => {
  return {
    type: AdvisoryType.soiltypeDropdown,
    request: {
      path: AdvisoryAPIPath.soiltypeDropdown + params.language,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getIrrigationtypeDropdownAction = params => {
  return {
    type: AdvisoryType.irrigationtypeDropdown,
    request: {
      path: AdvisoryAPIPath.irrigationtypeDropdown + params.language,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getSeasonDropdownAction = params => {
  return {
    type: AdvisoryType.seasonDropdown,
    request: {
      path: AdvisoryAPIPath.seasonDropdown + params.language,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getPlantixSummaryAction = params => {
  let tempParams = {
    pageNo: params?.pageNo ?? 1,
    pageSize: params?.pageSize ?? 5,
  };
  return {
    type: AdvisoryType.getPlantixSummary,
    request: {
      path: AdvisoryAPIPath.getPlantixSummary + params.farmerId,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
      params: tempParams,
    },
  };
};

export const getPlantixCropsAction = params => {
  return {
    type: AdvisoryType.getPlantixCrops,
    request: {
      path: AdvisoryAPIPath.getPlantixCrops + params.language,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getPlantixCaptureAction = params => {
  return {
    type: AdvisoryType.getPlantixCapture,
    request: {
      path: AdvisoryAPIPath.getPlantixCapture,
      method: 'POST',
      baseUrl: Configuration.AdvisoryURL,
      data: params,
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    },
  };
};

export const getPlantixDetailsAction = params => {
  return {
    type: AdvisoryType.getPlantixDetails,
    request: {
      path: AdvisoryAPIPath.getPlantixDetails + params,
      method: 'GET',
      baseUrl: Configuration.AdvisoryURL,
    },
  };
};

export const getPlantixDiagnosesReadNamesAction = (paramsID, params) => {
  return {
    type: AdvisoryType.getPlantixDiagnosesReadNames,
    request: {
      path:
        AdvisoryAPIPath.getPlantixDiagnosesReadNames +
        paramsID +
        '/DiagnosesReadNames',
      method: 'PUT',
      baseUrl: Configuration.AdvisoryURL,
      data: params,
    },
  };
};


export const getProductsRecommendations = (data) => {
  return {
    type: AdvisoryType.GetRecommendation,
    request: {
      path: AdvisoryAPIPath.getProductsRecommend,
      method: 'GET',
      baseUrl: Configuration.ProductURL,
      params: data,
    },
  };
}
