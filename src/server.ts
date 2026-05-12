import './db/connection.js'

import express from 'express'
import { createServer } from 'http'

import logger from './middleware/logger.js'
import { wssInit } from './websocket/init.js'

import apiRouter from './routes/apiRouter.js'

const app = express()
const port = 3000

const server = createServer(app)
wssInit(server)

//Middleware
app.use(logger)
app.use(express.json())

//Routes
app.use('/api', apiRouter)
app.get('/hello', (req, res) => { res.send('Hello world!') })

//Expose public assets
app.use(express.static('public'))

server.listen(port, () => { 
    console.log(`Server running on port ${port}\n`)
})