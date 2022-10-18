export type GetTokenMessageResponseType = {
    token: string;
};

export type MessageHandlerType = (
    sendResponse: (response: unknown) => void,
) => void;
