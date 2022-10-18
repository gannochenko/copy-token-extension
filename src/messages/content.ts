import { MESSAGE_GET_TOKEN } from './names';
import { MessageHandlerType } from './type';

export const contentHandlers: Record<string, MessageHandlerType> = {
    [MESSAGE_GET_TOKEN]: (sendResponse) => {
        let token = '';
        const tokenRecord = window.localStorage.getItem('token');
        if (tokenRecord) {
            token = tokenRecord.trim().replace(/^Bearer /, '');
        }

        sendResponse({ token });
    },
};
