import { useCallback, useState } from 'react';

export const useApplication = () => {
    const [sent, setSent] = useState(false);

    const onCopyTokenButtonClick = useCallback(() => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                setSent(true);
                console.log('!');
                if (tabs[0].id) {
                    chrome.tabs.sendMessage(
                        tabs[0].id,
                        { greeting: 'hello' },
                        function (response) {
                            console.log(response.farewell);
                        },
                    );
                }
            },
        );
    }, []);

    return {
        copyTokenProps: {
            onClick: onCopyTokenButtonClick,
        },
        showSent: sent,
    };
};
