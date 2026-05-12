import type { Request, Response } from "express";

export async function logout(req: Request, res: Response) {
    res.clearCookie('token')

    return res.status(200).json({ 
        success: true, 
        message: 'Logged out!' 
    })
}