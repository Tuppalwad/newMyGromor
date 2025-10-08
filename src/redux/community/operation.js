import {
    getFeedListAction, getMyFeedListAction, postLikedFeedAction,
    postFollowUserAction, getReportListAction,
    reportPostAction, savePostAction, deletePostAction, hidePostAction,
    unHidePostAction, getFeedProfileAction, getSavedPostsAction,
    getFollowerListAction, getFollowingListAction, postRemoveMyFollowerAction,
    postaddPostAction, postaddCommentAction, postaddgetAction, sharedPostAction, deleteSavedPostAction,
    postDeleteCommentAction, postcommentsLikeAction, updatePostAction,
    getMyGroupsListAction, getAllGroupsListAction, getGroupsUserListAction,
    getGroupsPostListAction, getJoinGroupsAction, getGroupsDetailsAction, setResetGroupsDetailsAction,
    setMyFeedsDataAction
} from './action';

export const getFeedList = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getFeedListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getMyFeedList = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getMyFeedListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const postLikedFeed = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postLikedFeedAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const postFollowUser = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postFollowUserAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getReportList = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getReportListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const reportPost = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(reportPostAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const savePost = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(savePostAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const deleteSavedPost = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(deleteSavedPostAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const deletePost = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(deletePostAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const hidePost = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(hidePostAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const unHidePost = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(unHidePostAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getFeedProfile = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getFeedProfileAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getSavedPosts = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getSavedPostsAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getFollowerList = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getFollowerListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getFollowingList = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getFollowingListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getMyGroupsList = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getMyGroupsListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getAllGroupsList = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getAllGroupsListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getGroupsUserList = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getGroupsUserListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getGroupsDetails = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getGroupsDetailsAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getJoinGroups = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getJoinGroupsAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const getGroupsPostList = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(getGroupsPostListAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const postRemoveMyFollower = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postRemoveMyFollowerAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const postaddPost = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postaddPostAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const postaddComment = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postaddCommentAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};
export const postgetComment = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postaddgetAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const sharedPost = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(sharedPostAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const postDeleteComment = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postDeleteCommentAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const postcommentsLike = param => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(postcommentsLikeAction(param));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const updatePostList = (id, params) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dispatch(updatePostAction(id, params));
                const data = user.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};

export const setResetGroupsDetails = () => {
    return setResetGroupsDetailsAction([]);
};

export const setMyFeedsData = (data,type) => {
    return setMyFeedsDataAction(data,type);
};

