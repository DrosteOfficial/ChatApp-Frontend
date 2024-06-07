import React, { useEffect, useState } from 'react';
import './ChatPage.css';
import {sendMessage} from "../../service/chatRelated/SendMessage";
import {createWebSocketURL} from "../../service/chatRelated/CreateWebSocketURL";
import {Navigate} from "../../service/Utils/Navigate";

const ChatPage: React.FC = () => {
    const [messageContent, setMessageContent] = useState("");
    const [messageList, setMessageList] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);;
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const params = {
            topic: "chat",
        };

        const url = createWebSocketURL(params);

        const socket =  new WebSocket(url);

        socket.onopen = function open(event) {
            console.log('WebSocket is connected.');
            setIsConnected(true);
        };

        socket.onmessage = function incoming(event) {
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

        socket.onerror = function error(error) {
            console.log('WebSocket Error: ', error);
        };

        socket.onclose = function close(event) {
            console.log('WebSocket connection closed: ', event.code, event.reason);
            setIsConnected(false);
        };


        setSocket(socket);
        return () => {
            socket.close();
        }
    }, []);

    const SendMessage = () => {
        sendMessage(socket, messageContent);
        setMessageContent("");
    };

    return (
        <div className={'chatDiv'}>
            <div className="messageBox">
                {messageList.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input type="text" value={messageContent} onChange={(e) => setMessageContent(e.target.value)}
                   placeholder="Message"/>
            <button onClick={SendMessage}>Send</button>
        </div>
    );
};

export default ChatPage;