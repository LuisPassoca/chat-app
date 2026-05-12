import express from 'express'
const router = express.Router()

router.use('/', (req, res) => {
    res.send('Hello API!')
})

export default router