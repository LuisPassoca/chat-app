import { z, flattenError } from 'zod'
import bcrypt from 'bcrypt'

import type { Request, Response } from "express";
import type { LoginUser } from "../../types.js";

import { getUserByEmail } from "../../models/userModel.js";
import { generateToken } from '../../services/jwt.js';
import { env } from 'node:process';

const loginUserSchema = z.object({
    email: z.email(),
    password: z.string()
})

export async function login(req: Request, res: Response) {
    try {
        const result = loginUserSchema.safeParse(req.body)

        if (!result.success) { 
            const errors = flattenError(result.error).fieldErrors
        
            return res.status(400).json({ 
                success: false,
                message: 'Bad request!',
                errors
            })
        }

        const loginUser: LoginUser = {
            ...result.data,
            email: result.data.email.toLowerCase()
        }

        const dbUser = getUserByEmail(loginUser.email)

        const success = dbUser && await bcrypt.compare(loginUser.password, dbUser.password)

        if (!success) {return res.status(400).json({ 
            success: false,
            message: 'Invalid email or password!',
        })}

        const token = await generateToken(dbUser)

        res.cookie('token', token, { 
            maxAge: 86400000, 
            httpOnly: true, 
            secure: env.NODE_ENV == 'production', 
            sameSite: 'strict' 
        })

        return res.status(200).json({
            success: true,
            message: 'Logged in!'
        })

    } catch (err) {
        console.log(err)

        return res.status(500).json({ 
            success: false, 
            message: 'Internal server error!' 
        })
    }
}