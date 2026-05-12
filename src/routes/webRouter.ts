import express, { type Request, type Response } from 'express'
const router = express.Router()

const root = './public'

router.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html', {root})
})

router.get('/login', (req: Request, res: Response) => {
    res.sendFile('login.html', {root})
})

router.get('/register', (req: Request, res: Response) => {
    res.sendFile('register.html', {root})
})

export default router