import { db } from "../db/connection.js";
import type { CreateUser, User } from "../types.js";

export function storeUser(user: CreateUser) {
    return db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
        .bind(user.name, user.email, user.password)
        .run()
}

export function getUserByEmail(email: string) {
    return db.prepare('SELECT * FROM users WHERE email = ?')
        .bind(email)
        .get() as User | undefined
}