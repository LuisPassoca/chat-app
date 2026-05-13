import type { NextFunction, Request, Response } from "express";
import { authenticateUser } from "../services/authenticateUser.js";

export default async function authorization(req: Request, res: Response, next: NextFunction) {
    const unauthorized = () => { 
        return (req.path.startsWith('/api')) ? 
            res.status(401).json({ success: false, message: 'Unauthorized!' }) : 
            res.status(302).redirect('/login')
    }

    const user = await authenticateUser(req.cookies.get('token'))

    if (!user) { return unauthorized() }

    req.user = user

    return next()
}