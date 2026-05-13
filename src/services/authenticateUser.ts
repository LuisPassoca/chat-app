import { getUserById } from "../models/userModel.js"
import { verifyToken } from "./jwt.js"

export async function authenticateUser(token: string) {
    try {
        if (!token) { return null }

        const { payload } = await verifyToken(token)
        const id = payload.sub

        if (!id) { return null }

        const user = getUserById(Number(id))

        return user ?? null
        
    } catch(err) {
        return null
    }
}