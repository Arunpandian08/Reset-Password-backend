import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './Database/Config.js';
import RegisterRouter from './Routers/Register.router.js';
import loginRouter from './Routers/login.router.js';

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT 
connectDB()

app.use('/user',RegisterRouter)
app.use('/user',loginRouter)



app.listen(port,()=>{
    console.log("App is Running at port-",port);
})