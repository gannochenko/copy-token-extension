import { useCallback, useState } from 'react';

export const useApplication = () => {
    const [sent, setSent] = useState(false);

    const onCopyTokenButtonClick = useCallback(() => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                    console.log(response.farewell);
                });
                setSent(true);
            }
        });
    }, []);

    return {
        copyTokenProps: onCopyTokenButtonClick,
        showSent: sent,
    };
};
