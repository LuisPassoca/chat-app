import express from 'express'
import authRouter from './apiRoutes/authRouter.js'
const router = express.Router()

router.use('/auth', authRouter)

router.use('/', (req, res) => {
    res.send('Hello API!')
})

export default router