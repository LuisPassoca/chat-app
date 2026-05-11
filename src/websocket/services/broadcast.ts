import type { WebSocketMessage } from "../../types.js";
import { currentServer } from "../store.js";

export function broadcast(message: WebSocketMessage) {
    const wss = currentServer.get()
    
    wss.clients.forEach(c => {
        c.send(JSON.stringify(message))
    })
}