import express from 'express'
import { createServer } from 'http'

import logger from './middleware/logger.js'

const app = express()
const port = 3000

const server = createServer(app)

//Middleware
app.use(logger)
app.use(express.json())

//Routes
app.use('/', (req, res) => { res.send('Hello world!') })

server.listen(port, () => { 
    console.log(`Server running on port ${port}\n`)
})