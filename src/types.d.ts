export interface WebSocketMessage {
    type: string,
    content?: unknown,
    sender?: string
}

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
}

export type CreateUser = Omit<User, 'id'>