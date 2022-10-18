import { useCallback, useEffect, useRef, useState } from 'react';
import copy from 'clipboard-copy';

import { MESSAGE_GET_TOKEN } from '../../../messages/names';
import { getTabId } from '../../../util/tab';
import { sendMessage } from '../../../messages/sendMessage';
import { GetTokenMessageResponseType } from '../../../messages/type';

export const useApplication = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const timer = useRef<number>();
    const onCopyTokenButtonClick = useCallback(async () => {
        const tabId = await getTabId();
        const response = await sendMessage<GetTokenMessageResponseType>(
            tabId,
            MESSAGE_GET_TOKEN,
        );

        const token = response?.token;
        if (!token) {
            console.error('Could not get the token');
            return;
        }

        await copy(token);

        setShowConfirmation(true);
        timer.current = setTimeout(() => {
            setShowConfirmation(false);
        }, 3000);
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    return {
        copyTokenProps: {
            onClick: onCopyTokenButtonClick,
        },
        showConfirmation,
    };
};
