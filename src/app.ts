import compression from 'compression'
import cookieParser from 'cookie-parser'
import express,{Response} from 'express'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import helmet from 'helmet'
import AuthRouter from './auth/router/auth.router'
import UserRouter from './user/router/user.router'
import { ErrorMiddleware } from './middleware/error.middleware'

const app=express()
app.use(express.json())

app.use(cors({
    origin: '*',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

app.use(helmet())
app.use(compression())

app.use(cookieParser())


const limiter=rateLimit({
    max:10000,
    windowMs: 1000*15*60 
})
app.use(limiter)

app.use(ErrorMiddleware)

app.use('/api/auth/',AuthRouter)
app.use('/api/users/',UserRouter)

export default app

