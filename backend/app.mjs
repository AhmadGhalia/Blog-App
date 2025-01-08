import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import authRouter from './routes/authroute.mjs'
import userRouter from './routes/userRoute.mjs'

import connectToDb from './config/connectedToDb.mjs'
connectToDb()
const app = express()

//middlewares  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//routes
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

const port = process.env.PORT || 8000
app.listen(port, () =>
  console.log(`server is running in ${process.env.NODE_ENV} on port: ${port}`)
)