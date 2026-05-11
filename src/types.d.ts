export interface WebSocketMessage {
    type: string,
    content?: unknown,
    sender?: string
}