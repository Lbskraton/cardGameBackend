import compression from 'compression'
import cookieParser from 'cookie-parser'
import express,{Response} from 'express'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import helmet from 'helmet'
import AuthRouter from './auth/router/auth.router'
import UserRouter from './user/router/user.router'
import { ErrorMiddleware } from './middleware/error.middleware'
import DeckRouter from './deck/router/deck.router'
import GameTypeRouter from './gameType/router/gameType.router'
import GameRouter from './game/router/game.router'
import RoundRouter from './round/router/round.router'
import ScoreRouter from './score/router/score.router'

const app=express()
app.use(express.json())

app.use(cors({
    origin: ['*','https://cardgamefrontend.onrender.com',"http://localhost:3000","http://localhost:5173"],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(helmet())
app.use(compression())

app.use(cookieParser())


/*const limiter=rateLimit({
    max:10000,
    windowMs: 1000*15*60 
})*/
//app.use(limiter)

app.use(ErrorMiddleware)

app.use('/api/auth/',AuthRouter)
app.use('/api/users/',UserRouter)
app.use('/api/decks/',DeckRouter)
app.use('/api/gameType/',GameTypeRouter)
app.use('/api/game/',GameRouter)
app.use('/api/round/',RoundRouter)
app.use('/api/score/',ScoreRouter)

export default app

