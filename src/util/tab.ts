export const getTabId = async () => {
    return new Promise<number>((resolve, reject) => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                if (tabs[0].id) {
                    resolve(tabs[0].id);
                } else {
                    reject();
                }
            },
        );
    });
};
