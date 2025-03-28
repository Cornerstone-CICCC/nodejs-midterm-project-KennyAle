import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieSession from 'cookie-session'
import userRouter from './routes/user.routes'
import recipeRouter from './routes/recipe.routes'
import dotenv from 'dotenv'
import path from 'path'
import { checkLoggedIn } from './middleware/auth.middleware'
dotenv.config()

const app = express()

app.use("/uploads", express.static(path.join(__dirname, "../uploads")))
app.use(cors({
  origin: 'http://localhost:4322',
  credentials: true
}))
const SIGN_KEY = process.env.COOKIE_SIGN_KEY
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY
if (!SIGN_KEY || !ENCRYPT_KEY) {
  throw new Error("Missing cookie keys!")
}
app.use(cookieSession({
  name: 'session',
  keys: [SIGN_KEY, ENCRYPT_KEY]
  // maxAge: 5 * 60 * 1000
}))
app.use(express.json())

app.use('/users', userRouter)
app.use('/recipes', recipeRouter)

app.use((req: Request, res: Response) => {
  res.status(404).send('Page not found!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})