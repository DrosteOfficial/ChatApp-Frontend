import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import './ChatPage.css';

interface Message {
    id?: number;
    message: string;
    senderId: number;
}

interface Payload {
    regularToken: string;
    message: Message;
    topic: string;
}

const ChatPage: React.FC = () => {
    const [messageContent, setMessageContent] = useState("");
    const [messageList, setMessageList] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate();

    const createWebSocketURL = (params: Record<string, string | number>) => {
        const url = 'ws://localhost:8080/websocket';
        const stringParams = Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
        );
        const queryParams = new URLSearchParams(stringParams).toString();
        return `${url}?${queryParams}`;
    }

    const handleWebSocket = async () => {
        const params = {
            topic: "chat",
        };
        const url = createWebSocketURL(params);
        const socket = new WebSocket(url);

        if (isConnected || (socket && socket.readyState === WebSocket.OPEN)) {
            return;
        }



        socket.onopen = function(event) {
            console.log('WebSocket is connected.');
            setIsConnected(true);
        };

        socket.onmessage = function(event) {
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

        socket.onerror = function(error) {
            console.log('WebSocket Error: ', error);
        };

        socket.onclose = function(event) {
            console.log('WebSocket connection closed: ', event.code, event.reason);
            navigate("/login");
            setIsConnected(false);
        };

        setSocket(socket);
        return;
    };

    useEffect(() => {
        handleWebSocket().then();

        // Cleanup function
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const trimmedMessage = messageContent.trim();

            if (!trimmedMessage) {
                return;
            }

            const message: Message = {
                message: trimmedMessage,
                senderId: Number(Cookies.get("id")) || 0
            };
            const payload: Payload = {
                regularToken: Cookies.get("token") || "",
                message: message,
                topic: "chat"
            };
            socket.send(JSON.stringify(payload));
            setMessageContent("");
        }
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
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatPage;