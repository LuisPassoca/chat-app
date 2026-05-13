import type { Request, Response } from "express";
import { getMessagesByCursor } from "../models/messageModel.js";

export function getMessages(req: Request, res: Response){
    try {
        const cursor = Number(req.query.cursor) || undefined
        const limit = Number(req.query.limit) || 200

        const dbMessages = getMessagesByCursor(limit, cursor)

        const messages = dbMessages.map(m => ({
            id: m.id,
            content: m.content,
            sentAt: m.sentAt,
            sender: {
                id: m.senderId, 
                name: m.senderName, 
                role: m.senderRole
            }
        })).reverse()

        return res.status(200).json({ 
            success: true, 
            message: "Retrieved messages!", 
            data: messages
        })

    } catch(err) {
        console.log(err)
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error!"
        })
    }
}
