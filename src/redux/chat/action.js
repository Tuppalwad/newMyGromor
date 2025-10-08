import { ChatAPIPath, ChatType } from './type';
// import { ChatAPIPath } from "../../config/api-path";
import { Configuration } from '../../config';
import UserManager from "../../storage/user-manager";

//Please define base URL for all
const cropId = "";


export const getChannelIdAction = () => {
    return {
        type: ChatType.getChannelId,
        request: {
            path: ChatAPIPath.getChannelId + `/${UserManager.getUserId}`,
            method: 'GET',
            baseUrl: Configuration.ChatURL
        },
    };
};

export const getChannelAction = (param) => {
    return {
        type: ChatType.getChannel,
        request: {
            path: ChatAPIPath.getChannel + `/${param}`,
            method: 'GET',
            baseUrl: Configuration.ChatURL
        },
    };
};

export const getChannelByCropIdAction = () => {
    return {
        type: ChatType.getChannelByCropId,
        request: {
            path: ChatAPIPath.getChannelByCropId + `/${UserManager.getUserId}/${cropId}`,
            method: 'GET',
            baseUrl: Configuration.ChatURL
        },
    };
};

export const getMyQueriesAction = () => {
    return {
        type: ChatType.getMyQueries,
        request: {
            path: ChatAPIPath.getMyQueries + `/${UserManager.getUserId}`,
            method: 'GET',
            baseUrl: Configuration.ChatURL
        },
    };
};

export const createChannelAction = (params) => {
    return {
        type: ChatType.createChannel,
        request: {
            path: ChatAPIPath.createChannel,
            method: 'POST',
            data: params,
            baseUrl: Configuration.ChatURL
        },
    };
};


export const sendMessageAction = (params) => {
    return {
        type: ChatType.sendMessage,
        request: {
            path: ChatAPIPath.sendMessage,
            method: 'POST',
            data: params,
            baseUrl: Configuration.ChatURL
        },
    };
};


export const uploadMediaAction = (params) => {
    return {
        type: ChatType.uploadMedia,
        request: {
            path: ChatAPIPath.uploadMedia,
            method: 'POST',
            data: params,
            baseUrl: Configuration.ChatURL,
            headers: {
                'Content-Type': 'multipart/form-data',
                accept: '*/*',
            },
        },
    };
};
