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
    role: string
}

export type CreateUser = Omit<User, 'id' | 'role'>

export type LoginUser = Omit<User, 'id' | 'name' | 'role'>