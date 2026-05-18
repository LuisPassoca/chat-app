import express from 'express'
import { register } from '../../controllers/authController/register.js'
import { login } from '../../controllers/authController/login.js'
import { logout } from '../../controllers/authController/logout.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

export default router

// Documentation
/**
*    @swagger
*    /api/auth/register:
*        post:
*            tags:
*                - auth
*            summary: Registering new users
*            requestBody:
*                required: true
*                content:
*                    application/json:
*                        schema:
*                            type: object
*                            required:
*                                - email
*                                - name
*                                - password
*
*                            properties:
*                                name: 
*                                    type: string
*                                    example: John Doe
*
*                                email:
*                                    type: string
*                                    example: johndoe@email.com
*                                    
*                                password:
*                                    type: string
*                                    example: password123
*            
*            responses:
*                200:
*                    description: User registered
*                400:
*                    description: Invalid request format
*                409:
*                    description: E-mail already in use
*                500: 
*                    description: Internal server error
*/

/**
*    @swagger
*    /api/auth/login:
*        post:
*            tags:
*                - auth
*            summary: Logging in users (storing cookie)
*            requestBody:
*                required: true
*                content: 
*                    application/json:
*                        schema:
*                            type: object
*                            required:
*                                - email
*                                - password
*                            
*                            properties:
*                                email:
*                                    type: string
*                                    example: johndoe@email.com
*
*                                password:
*                                    type: string
*                                    example: password123
*        
*            responses:
*                200:
*                    description: User logged in
*                400:
*                    description: Invalid request format
*                401:
*                    description: Invalid login information
*                500:
*                    description: Internal server error
*/

/**
*    @swagger
*    /api/auth/logout:
*        post:
*            tags:
*                - auth
*            summary: Logging out users (clearing cookie)
*            responses:
*                200:
*                    description: User logged out
*/
