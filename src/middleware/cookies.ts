import type { NextFunction, Request, Response } from "express";
import { cookieParser } from "../utils/cookieParser.js";

export default function cookies(req: Request, res: Response, next: NextFunction) {
    req.cookies = cookieParser(req.headers.cookie)
    return next()
}