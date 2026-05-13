import express from 'express'
import authRouter from './apiRoutes/authRouter.js'
import authorization from '../middleware/authorization.js'
const router = express.Router()

router.use('/auth', authRouter)

//Temporary endpoint for frontend testing
router.get('/users/me', authorization, (req, res) => {
    const user = {...req.user}
    return res.status(200).json({ id: user.id, name: user.name, role: user.role })
})

router.use('/', (req, res) => {
    res.send('Hello API!')
})


export default router