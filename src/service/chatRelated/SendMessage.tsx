import Cookies from "js-cookie";
import { Payload } from '../ChatTypes';

export const sendMessage = (socket:WebSocket | null,messageContent:String ) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const trimmedMessage = messageContent.trim();

        if (!trimmedMessage) {
            return;
        }

        const payload: Payload = {
            regularToken: Cookies.get("token") || "",
            message: {
                message: trimmedMessage,
                senderId: parseInt(Cookies.get("id") || "0")
            },
            topic: "chat"
        };
        socket.send(JSON.stringify(payload));

    }
};