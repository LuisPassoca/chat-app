import type { IncomingMessage } from "http";
import type WebSocket from "ws";
import { onMessage } from "./message.js";

export function onConnection(ws: WebSocket, req: IncomingMessage) {
    console.log('Connection established!')

    ws.on('message', onMessage)
    ws.on('close', () => { console.log('Connection closed!') })
}