import type { NextFunction, Request, Response } from "express";

export default function logger(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
        console.log(req.method, req.originalUrl, res.statusCode, '\n')
    })

    return next()
}