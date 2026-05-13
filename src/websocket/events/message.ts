import { z } from 'zod'

import type { WebSocket } from "ws";
import type { RawData } from "ws";
import type { WebSocketMessage } from '../../types.js';

import { jsonParser } from "../../utils/jsonParser.js";
import { sendMessage } from '../services/sendMessage.js';

const messageSchema = z.object({
    type: z.string(),
    content: z.string().optional(),
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

    //at this point ws.user was already type checked by the connection event handler
    const message: WebSocketMessage = {
        ...result.data,
        sender: {
            id: ws.user!.id,
            name: ws.user!.name,
            role: ws.user!.role
        },
        sentAt: new Date().toISOString()
    }

    if (message.type === 'send-message') { sendMessage(ws, message) }
}