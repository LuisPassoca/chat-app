export interface WebSocketMessage {
    type: string,
    content?: string | undefined,
    sender?: string | undefined
}

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
}

export type CreateUser = Omit<User, 'id'>