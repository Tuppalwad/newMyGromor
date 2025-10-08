import { isEmpty } from '../../utils/validator';
import { communityType } from './type';

const initialState = {
    FeedListDetails: [], MyFeedListDetails: [], SavedFeedList: [],
    FollowerList: [], FollowingList: [],
    SavedPostsList: [], CommentsList: [],
    MyGroupsList: [], AllGroupsList: [],
    GroupsUserList: [], GroupsPostList: [], GroupsDetails: {}
};


const communityReducer = (state = initialState, action) => {

    switch (action.type) {

        case communityType.FeedList + '_SUCCESS':
            return { ...state, FeedListDetails: appendData(state.FeedListDetails, action.payload) };
        case communityType.MyFeedList + '_SUCCESS':
            return { ...state, MyFeedListDetails: appendData(state.MyFeedListDetails, action.payload) };
        case communityType.getFollowerList + '_SUCCESS':
            return { ...state, FollowerList: appendData(state.FollowerList, action.payload) };
        case communityType.getFollowingList + '_SUCCESS':
            return { ...state, FollowingList: appendData(state.FollowingList, action.payload) };
        case communityType.MySavedPosts + '_SUCCESS':
            return { ...state, SavedPostsList: appendData(state.SavedPostsList, action.payload) };
        case communityType.postgetComment + '_SUCCESS':
            return { ...state, CommentsList: appendData(state.CommentsList, action.payload) };
        case communityType.getMyGroupsList + '_SUCCESS':
            return { ...state, MyGroupsList: appendData(state.MyGroupsList, action.payload) };
        case communityType.getAllGroupsList + '_SUCCESS':
            return { ...state, AllGroupsList: appendData(state.AllGroupsList, action.payload) };
        case communityType.getGroupsPostList + '_SUCCESS':
            return { ...state, GroupsPostList: appendData(state.GroupsPostList, action.payload) };
        case communityType.getGroupsUserList + '_SUCCESS':
            return { ...state, GroupsUserList: appendData(state.GroupsUserList, action.payload) };
        case communityType.getGroupsDetails + '_SUCCESS':
            return { ...state, GroupsDetails: action.payload };
        case communityType.getGroupsDetails + '_REQUEST':
            return { ...state, GroupsDetails: {} };
        case communityType.ResetGroupsDetails:
            return { ...state, GroupsDetails: {} };

        case communityType.setMyFeedsData:
            return { ...state, MyFeedListDetails: action.payload };
        case communityType.setPublicFeedsData:
            return { ...state, FeedListDetails: action.payload };
        case communityType.setSavedFeedsData:
            return { ...state, SavedPostsList: action.payload };
        case communityType.setGroupFeedsData:
            return { ...state, GroupsPostList: action.payload };
        case communityType.setCommentFeedsData:
            return { ...state, CommentsList: action.payload };

        default:
            return { ...state };
    }
};



const appendData = (oldData, newData) => {

    if (oldData === null) {
        return newData;
    }

    if (oldData?.pageNo === newData?.pageNo) {
        let page_number = newData?.pageNo ?? 1
        if (parseInt(page_number) == 1) {
            return newData;
        } else {
            let page_size = newData?.pageSize
            let old_size = page_number - 1
            let tempOldData = oldData?.data?.slice(0, old_size * page_size)
            let tempData = { ...newData, data: [...tempOldData, ...newData?.data] }
            return tempData;
        }
    }

    if (isEmpty(oldData)) {
        let tempData = { ...newData, data: newData?.data };
        return tempData;
    } else {
        let finalTempData = [...oldData?.data, ...newData?.data]
        var unique = finalTempData.filter((v, i, a) => a.indexOf(v) === i);
        let tempData = { ...newData, data: unique };
        return tempData;
    }
};

export default communityReducer;

