import express from 'express'
import { register } from '../../controllers/authController/register.js'
import { login } from '../../controllers/authController/login.js'
import { logout } from '../../controllers/authController/logout.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

export default router