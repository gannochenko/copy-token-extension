import { MESSAGE_GET_TOKEN } from './names';
import { MessageHandlerType } from './type';

const localStorageKey = 'opsPortalIAMData-internal';

export const contentHandlers: Record<string, MessageHandlerType> = {
    [MESSAGE_GET_TOKEN]: (sendResponse) => {
        let token = '';
        const tokenRecord = window.localStorage.getItem(localStorageKey) ?? '';
        let tokenJson: { access_token: string } | undefined = undefined;
        try {
            tokenJson = JSON.parse(tokenRecord);

            if (tokenJson) {
                token = tokenJson.access_token;
            }

            if (!token) {
                console.warn('Token was not found');
            }
        } catch (e) {
            console.warn('Could not parse the localStorage record');
        }

        sendResponse({ token });
    },
};
