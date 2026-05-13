declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export module 'ws' {
    interface WebSocket {
        user?: User
    }
}

export interface WebSocketMessage {
    type: string,
    content?: string | undefined,
    sender?: { 
        id: number,
        name: string,
        role: string
    }
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