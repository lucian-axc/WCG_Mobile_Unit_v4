import express from 'express'
import router from './router.js'
import morgan from 'morgan'
import cors from 'cors'

import { protect } from './modules/auth.js'
import { createNewUser, signin } from './handlers/user.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json()) // allows a client to send JSON
app.use(express.urlencoded({ extended: true })) // allows a client to send query strings and similar

app.get('/', (req, res, next) => {
    console.log('hello from express')
    res.status(200)
    res.json({ message: 'hello' })
})

app.use('/api', protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
    switch (err.type) {
        case 'auth':
            res.status(401).json({ message: 'Unauthorized' })        
            break
        case 'input':
            res.status(400).json({ message: 'Invalid input '})    
            break
        default:
            res.status(500).json({ message: "Internal server error" })
    }
})

export default app