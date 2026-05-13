import type { IncomingMessage } from "http";
import type WebSocket from "ws";

import { onMessage } from "./message.js";
import { cookieParser } from "../../utils/cookieParser.js";
import { authenticateUser } from "../../services/authenticateUser.js";

export async function onConnection(ws: WebSocket, req: IncomingMessage) {
    const cookies = cookieParser(req.headers.cookie)

    const user = await authenticateUser(cookies.get('token'))
    if (!user) { return ws.close(3000, 'Unauthorized!') }

    ws.user = user
    
    console.log(`User ${user.name}:${user.id} connected!`)

    ws.on('message', data => onMessage(ws, data))
    ws.on('close', () => { console.log(`User ${user.name}:${user.id} disconnected!`) })
}