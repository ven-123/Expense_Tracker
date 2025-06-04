import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connetDB from './config/mongoDB.js'
import userRouter from './routes/userRouter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
connetDB()

app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)


app.listen(PORT, ()=>{
    console.log(`Server connected to port: ${PORT}`)
})


