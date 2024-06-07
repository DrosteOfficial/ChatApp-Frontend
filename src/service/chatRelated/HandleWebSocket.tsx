import { useState } from 'react';
import {createWebSocketURL} from "./CreateWebSocketURL";
import {Navigate} from "../Utils/Navigate";



export const useHandleWebSocket = (Socket: WebSocket | null) => {
    const [isConnected, setIsConnected] = useState(false);
    const [messageList, setMessageList] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const params = {
        topic: "chat",
    };

    if (Socket == null) {
        return;
    }

     if (Socket.CONNECTING || (Socket && Socket.readyState === WebSocket.OPEN)) {
         return;
     }

    const url = createWebSocketURL(params);
    const sockett = new WebSocket(url);



    sockett.onopen = function(event) {
        console.log('WebSocket is connected.');
        setIsConnected(true);
    };

    sockett.onmessage = function(event) {
        console.log('Message from server ', event.data);
        try {
            const messages = event.data.split(/, (?=[\w\d]+:)/);
            messages.forEach((msg: string) => {
                setMessageList(oldMessages => [...oldMessages, msg]);
            });
        } catch (error) {
            console.error('Error parsing message data: ', error);
        }
    };

    sockett.onerror = function(error) {
        console.log('WebSocket Error: ', error);
    };

    sockett.onclose = function(event) {
        console.log('WebSocket connection closed: ', event.code, event.reason);
        Navigate("/login");
        setIsConnected(false);
    };


    setSocket(sockett);
     return { isConnected, messageList };
};
