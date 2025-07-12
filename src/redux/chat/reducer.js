import { ChatType } from './type';
import {Configuration} from "../../config";
const initialState = { channelId: [], getChannel: [], getChannelByCrop: [], getMyQueries: [], chatId : null, participantId : null };
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ChatType.getChannel + '_SUCCESS':

            const channelData = action.payload?.messages?.map(data => {
                return {
                    // ...data,
                    text: data.messageContent,
                    _id: data.id,
                    user: {
                        _id: data.participantId,
                        avatar: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1480926007/t57yzxqhwaf2isqs0tkw.png'
                    },
                    image: data.mediaKey != null && data.mediaKey.toString().endsWith("png") ?  Configuration.ImageURL  + data.mediaKey : null,
                    video: data.mediaKey != null && data.mediaKey.toString().endsWith("mp4") ?  Configuration.ImageURL  + data.mediaKey : null,
                    audio: data.mediaKey != null && data.mediaKey.toString().endsWith("mp3") ?  Configuration.ImageURL  + data.mediaKey : null,
                    file_type: data.mediaKey != null && data.mediaKey.toString().endsWith("pdf") ? Configuration.ImageURL  +  data.mediaKey : null,

                    file_id: data.mediaKey,
                    createdAt: Date.parse(data.createdOn)
                };
            });
            return { ...state, getChannel: channelData , chatId: action.payload?.id, participantId: action.payload?.participants[0].id};
        case ChatType.getChannelId + '_SUCCESS':
            return { ...state, channelId: action.payload };
        case ChatType.getChannelByCropId + '_SUCCESS':
            return { ...state, getChannelByCrop: action.payload };
        case ChatType.getMyQueries + '_SUCCESS':
            return { ...state, getMyQueries: action.payload };
        default:
            return { ...state };
    }
};
export default chatReducer;
