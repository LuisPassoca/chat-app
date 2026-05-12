import type { Request, Response } from "express";
import type { CreateUser } from "../../types.js";

import { flattenError, z } from 'zod'
import bcrypt from 'bcrypt'

import { storeUser } from "../../models/userModel.js";

const createUserSchema = z.object({
    name: z.string().min(3,),
    email: z.email(),
    password: z.string().min(8)
})

export async function register(req: Request, res: Response) {
    try {
        const result = createUserSchema.safeParse(req.body)

        if (!result.success) { 
            const errors = flattenError(result.error).fieldErrors
        
            return res.status(400).json({ 
                success: false,
                message: 'Bad request!',
                errors
            })
        }

        const user: CreateUser = {
            ...result.data,
            email: result.data.email.toLowerCase(),
            password: await bcrypt.hash(result.data.password, 10)
        }

        storeUser(user)

        return res.status(201).json({
            success: true,
            message: 'Created user!'
        })

    } catch(err) {
        console.log(err)

        if ((err instanceof Error) && (err.message.includes('UNIQUE'))) {
            return res.status(409).json({
                success: false,
                message: 'E-mail already in use!'
            })
        }

        return res.status(500).json({ 
            success: false, 
            message: 'Internal server error!'
        })
    }
}