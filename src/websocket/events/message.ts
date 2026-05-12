import { z } from 'zod'

import type { WebSocket } from "ws";
import type { RawData } from "ws";
import type { WebSocketMessage } from '../../types.js';

import { broadcast } from "../services/broadcast.js";
import { jsonParser } from "../../utils/jsonParser.js";

const messageSchema = z.object({
    type: z.string(),
    content: z.string().optional(),
    sender: z.string().optional()
})

export function onMessage(ws: WebSocket, data: RawData) {
    const jsonData = jsonParser(data.toString())

    const result = messageSchema.safeParse(jsonData)

    if (!result.success) {
        return ws.send(JSON.stringify({ 
            type: 'error', 
            content: 'Invalid message format!' 
        }))
    }

    const message: WebSocketMessage = result.data

    if (message.type === 'send-message') {
        console.log(message)
        broadcast(message)
    }
}