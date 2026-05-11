import express from 'express'
import { createServer } from 'http'

import logger from './middleware/logger.js'
import { wssInit } from './websocket/init.js'

const app = express()
const port = 3000

const server = createServer(app)
wssInit(server)

//Middleware
app.use(logger)
app.use(express.json())

//Routes
app.get('/hello', (req, res) => { res.send('Hello world!') })

//Expose public assets
app.use(express.static('public'))

server.listen(port, () => { 
    console.log(`Server running on port ${port}\n`)
})