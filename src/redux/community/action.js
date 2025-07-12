import { communityType, communityPath } from './type';
import { Configuration } from '../../config';
import { isEmpty } from '../../utils/validator';

export const getFeedListAction = (params) => {
  let tempParams = {
    "Latitude": params?.Latitude,
    "Longitude": params?.Longitude,
    "pageNo": params?.pageNo,
    "pageSize": params?.pageSize
  }
  return {
    type: communityType.FeedList,
    request: {
      path: communityPath.FeedList + `/${params.farmerId}`,
      baseUrl: Configuration.CommunityURL,
      method: 'GET',
      params: tempParams,
    },
  };
};

export const getMyFeedListAction = (params) => {
  let tempParams = {
    "pageNo": params?.pageNo,
    "pageSize": params?.pageSize
  }
  return {
    type: communityType.MyFeedList,
    request: {
      path: communityPath.MyFeedList + `/${params.farmerId}` + "/my-post",
      baseUrl: Configuration.CommunityURL,
      method: 'GET',
      params: tempParams,
    },
  };
};

export const getSavedPostsAction = (params) => {
  let tempParams = {
    "pageNo": params?.pageNo,
    "pageSize": params?.pageSize
  }
  return {
    type: communityType.MySavedPosts,
    request: {
      path: communityPath.MySavedPosts  + `/${params.farmerId}` + "/save-post",
      baseUrl: Configuration.CommunityURL,
      params: tempParams,
      method: 'GET',
    },
  };
};


export const postLikedFeedAction = (params) => {
  return {
    type: communityType.postLikesDislikes,
    request: {
      path: communityPath.postLikesDislikes,
      baseUrl: Configuration.CommunityURL,
      method: 'POST',
      data: params,
    },
  };
};


export const postFollowUserAction = (params) => {
  return {
    type: communityType.postFollowUser,
    request: {
      path: communityPath.postFollowUser,
      baseUrl: Configuration.CommunityURL,
      method: 'POST',
      data: params,
    },
  };
};

export const getReportListAction = (params) => {
  return {
    type: communityType.getReportList,
    request: {
      path: communityPath.getReportList + `${params}`,
      baseUrl: Configuration.CommunityURL,
      method: 'GET',
    },
  };
};

export const reportPostAction = (params) => {
  return {
    type: communityType.postReportPost,
    request: {
      path: communityPath.postReportPost,
      baseUrl: Configuration.CommunityURL,
      method: 'POST',
      params: params,
    },
  };
};

export const savePostAction = (params) => {
  return {
    type: communityType.postSavePost,
    request: {
      path: communityPath.postSavePost,
      baseUrl: Configuration.CommunityURL,
      method: 'POST',
      params: params,
    },
  };
};

export const deletePostAction = (params) => {
  return {
    type: communityType.deletePost,
    request: {
      path: communityPath.deletePost,
      baseUrl: Configuration.CommunityURL,
      method: 'DELETE',
      params: params,
    },
  };
};

export const deleteSavedPostAction = (params) => {
  return {
    type: communityType.deleteSavedPost,
    request: {
      path: communityPath.deleteSavedPost,
      baseUrl: Configuration.CommunityURL,
      method: 'DELETE',
      params: params,
    },
  };
};


export const hidePostAction = (params) => {
  return {
    type: communityType.hidePost,
    request: {
      path: communityPath.hidePost,
      baseUrl: Configuration.CommunityURL,
      method: 'POST',
      params: params,
    },
  };
};

export const unHidePostAction = (params) => {
  return {
    type: communityType.unHidePost,
    request: {
      path: communityPath.unHidePost,
      baseUrl: Configuration.CommunityURL,
      method: 'POST',
      params: params,
    },
  };
};


export const getFeedProfileAction = (params) => {
  return {
    type: communityType.getFeedProfile,
    request: {
      path: communityPath.getFeedProfile,
      baseUrl: Configuration.CommunityURL,
      method: 'GET',
      params: params,
    },
  };
};

export const getFollowerListAction = (params) => {
  return {
    type: communityType.getFollowerList,
    request: {
      path: communityPath.getFollowerList + "/" + params.farmerId,
      baseUrl: Configuration.CommunityURL,
      method: 'GET',
      params: params,
    },
  };
};

export const getFollowingListAction = (params) => {
  return {
    type: communityType.getFollowingList,
    request: {
      path: communityPath.getFollowingList + "/" + params.farmerId,
      baseUrl: Configuration.CommunityURL,
      method: 'GET',
      params: params,
    },
  };
};

export const getMyGroupsListAction = (params) => {
  return {
    type: communityType.getMyGroupsList,
    request: {
      path: communityPath.getMyGroupsList,
      baseUrl: Configuration.CommunityURL,
      method: 'GET',
      params: params,
    },
  };
};

export const getAllGroupsListAction = (params) => {
  return {
    type: communityType.getAllGroupsList,
    request: {
      path: communityPath.getAllGroupsList,
      baseUrl: Configuration.CommunityURL,
      method: 'GET',
      params: params,
    },
  };
};

export const getGroupsUserListAction = (params) => {
  let tempParams = {
    "farmerId": params?.farmerId,
    "pageNo": params?.pageNo,
    "pageSize": params?.pageSize
  }
  return {
    type: communityType.getGroupsUserList,
    request: {
      path: communityPath.getGroupsUserList + params.groupId,
      baseUrl: Configuration.CommunityURL,
      method: 'GET',
      params: tempParams,
    },
  };
};

export const getGroupsDetailsAction = (params) => {
  return {
    type: communityType.getGroupsDetails,
    request: {
      path: communityPath.getGroupsDetails + `${params.groupId}/${params.farmerId}`,
      baseUrl: Configuration.CommunityURL,
      method: 'GET',
    },
  };
};

export const getGroupsPostListAction = (params) => {
  let tempParams = {
    "farmerId": params?.farmerId,
    "pageNo": params?.pageNo,
    "pageSize": params?.pageSize
  }
  return {
    type: communityType.getGroupsPostList,
    request: {
      path: communityPath.getGroupsPostList + params.groupIdentityId,
      baseUrl: Configuration.CommunityURL,
      method: 'GET',
      params: tempParams,
    },
  };
};



export const getJoinGroupsAction = (params) => {
  return {
    type: communityType.getJoinGroups,
    request: {
      path: communityPath.getJoinGroups,
      baseUrl: Configuration.CommunityURL,
      method: 'POST',
      data: params,
    },
  };
};

export const postRemoveMyFollowerAction = (params) => {
  return {
    type: communityType.postRemoveMyFollower,
    request: {
      path: communityPath.postRemoveMyFollower,
      baseUrl: Configuration.CommunityURL,
      method: 'POST',
      params: params,
    },
  };
};

export const postaddPostAction = (params) => {
  return {
    type: communityType.postaddPost,
    request: {
      path: communityPath.postaddPost,
      baseUrl: Configuration.CommunityURL,
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: '*/*',
      },
    },
  };
};

export const postaddCommentAction = (params) => {
  return {
    type: communityType.postaddComment,
    request: {
      path: communityPath.postaddComment,
      baseUrl: Configuration.CommunityURL,
      method: 'POST',
      data: params,
    },
  };
};
export const postaddgetAction = (param) => {
  return {
    type: communityType.postgetComment,
    request: {
      path: communityPath.postgetComment + `/${param.postId}`,
      baseUrl: Configuration.CommunityURL,
      method: 'GET',
      params: param,
    },
  };
};


export const sharedPostAction = (params) => {
  return {
    type: communityType.sharedPost,
    request: {
      path: communityPath.sharedPost,
      baseUrl: Configuration.CommunityURL,
      method: 'POST',
      data: params,
    },
  };
};

export const postDeleteCommentAction = (params) => {
  return {
    type: communityType.postDeleteComment,
    request: {
      path: communityPath.postDeleteComment,
      baseUrl: Configuration.CommunityURL,
      method: 'DELETE',
      params: params,
    },
  };
};

export const postcommentsLikeAction = (params) => {
  return {
    type: communityType.postcommentsLike,
    request: {
      path: communityPath.postcommentsLike,
      baseUrl: Configuration.CommunityURL,
      method: 'POST',
      data: params,
    },
  };
};

export const updatePostAction = (id, params) => {
  return {
    type: communityType.updatePost,
    request: {
      path: communityPath.updatePost + `?id=${id}`,
      method: 'PUT',
      baseUrl: Configuration.CommunityURL,
      data: params,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      //   accept: '*/*',
      // },
    },
  };
};



export const setResetGroupsDetailsAction = () => {
  return {
    type: communityType.ResetGroupsDetails,
    payload: [],
  };
};


export const setMyFeedsDataAction = (data, type) => {

  let tempType = ""
  if (type == "FeedView") {
    tempType = communityType.setPublicFeedsData
  } else if (type == "SavedPost") {
    tempType = communityType.setSavedFeedsData
  } else if (type == "GroupFeeds") {
    tempType = communityType.setGroupFeedsData
  } else if (type == "MyFeeds") {
    tempType = communityType.setMyFeedsData
  }else if (type == "comment_Details") {
    tempType = communityType.setCommentFeedsData
  }

  
  if(!isEmpty(tempType)){
    return {
      type: tempType,
      payload: data,
    };
  }
};

