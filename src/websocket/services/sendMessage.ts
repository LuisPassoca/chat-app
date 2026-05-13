import type WebSocket from "ws";
import type { WebSocketMessage } from "../../types.js";

import { storeMessage } from "../../models/messageModel.js";
import { broadcast } from "./broadcast.js";

export function sendMessage(ws: WebSocket, message: WebSocketMessage) {
    try {
        storeMessage(message)
        broadcast(message)

    } catch(err) {
        console.log(err)

        return ws.send(JSON.stringify({ 
            type: 'error', 
            content: 'Unable to send message!' 
        }))
    }
}