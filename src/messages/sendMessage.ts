export const sendMessage = async <P extends object>(
    tabId: number,
    name: string,
) => {
    return new Promise<P>((resolve) => {
        chrome.tabs.sendMessage(tabId, { name }, (response) => {
            resolve(response);
        });
    });
};
