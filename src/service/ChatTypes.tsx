export type Payload = {
    regularToken: string;
    message: {
        id?: number;
        message: string;
        senderId: number;
    }
    topic: string;
}

export type MessageList =
    {
        id?: number;
        message: string;
        senderId: number;
    }[];
