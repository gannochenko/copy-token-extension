import { contentHandlers } from './messages/content';

console.log('Event listeners added');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (sender.tab) {
        // allowing only processing messages from the extension
        return;
    }

    if (request.name in contentHandlers) {
        contentHandlers[request.name](sendResponse);
    }
});
