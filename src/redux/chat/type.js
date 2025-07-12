export const ChatType = {
    getChannel: 'chat/channel',
    getChannelId: 'chat/channel/user',
    getChannelByCropId: 'chat/channel/user',
    getMyQueries: 'chat/channel/myQueries',
    createChannel: 'chat/channel/create',
    sendMessage: 'chat/message/send',
    uploadMedia: 'chat/upload/media',

};

export const ChatAPIPath = {
    // 1st call, create channel
    createChannel: '/chat/channel/create',
    // 2nd call, output will be channelId
    getChannelId: '/chat/channel/user',
    // 3rd call, output will be chat history
    getChannel: '/chat/channel',
    // 4th call, send message
    sendMessage: '/chat/message/send',
    getChannelByCropId: '/chat/channel/user',
    getMyQueries: '/chat/channel/myQueries',
    uploadMedia: '/chat/upload/media',
};
