import * as jose from 'jose'

import type { User } from "../types.js";
import { env } from 'node:process';

const alg = 'HS256'
const secret = new TextEncoder().encode(env.SECRET) 

export async function generateToken(user: User) {
    return await new jose.SignJWT({ sub: String(user.id), role: user.role })
        .setProtectedHeader({ alg })
        .setExpirationTime('1d')
        .sign(secret)
}

export async function verifyToken(jwt: string) {
    return await jose.jwtVerify(jwt, secret)
}