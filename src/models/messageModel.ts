import { db } from "../db/connection.js";
import type { DatabaseMessage, WebSocketMessage } from "../types.js";

export function storeMessage(message: WebSocketMessage) {
    return db.prepare('INSERT INTO messages (sender_id, content, sent_at) VALUES (?, ?, ?)')
        .bind(message.sender?.id, message.content, message.sentAt)
        .run()
}

export function getMessagesByCursor(limit: number, cursor?: number) {
    const query = `
        SELECT m.id, m.content, m.sent_at AS sentAt, 
        u.id AS senderId, u.name AS senderName, u.role AS senderRole 
        FROM messages m JOIN users u ON m.sender_id = u.id 
        ${ cursor ? 'WHERE m.id < ?' : ''}
        ORDER BY m.id DESC LIMIT ?
    `

    const params = cursor ? [cursor, limit] : [limit]

    return db.prepare(query)
        .bind(...params)
        .all() as DatabaseMessage[]
}