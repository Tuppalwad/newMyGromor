import {
    getChannelAction, getChannelIdAction, getChannelByCropIdAction,
    getMyQueriesAction, createChannelAction, sendMessageAction, uploadMediaAction
} from './action';

export const getChannel = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const channel = await dispatch(getChannelAction(param));
                const data = channel.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }
};

export const getChannelId = () => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const channelId = await dispatch(getChannelIdAction());
                const data = channelId.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }
};

export const getChannelByCropId = () => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const channel = await dispatch(getChannelByCropIdAction());
                const data = channel.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }
};

export const getMyQueries = () => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const channel = await dispatch(getMyQueriesAction());
                const data = channel.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }
};


export const createChannel = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const channel = await dispatch(createChannelAction(param));
                const data = channel.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const sendMessage = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const channel = await dispatch(sendMessageAction(param));
                const data = channel.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};


export const uploadMedia = (param) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const channel = await dispatch(uploadMediaAction(param));
                const data = channel.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    };
};