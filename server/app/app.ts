import type { NextFunction, Request, Response } from 'express'

import express from 'express'
import cors from 'cors'
import { HttpError } from 'http-errors'

import { env } from './config'
import { authRouter, boardRouter, userRouter } from './routes/api'

export const app = express()

const appRouter = express.Router()

app.use(cors())
app.use(express.json())

appRouter.use('/board', boardRouter)
appRouter.use('/auth', authRouter)
appRouter.use('/user', userRouter)

app.use(env.API_PREFIX, appRouter)

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err: HttpError, _: Request, res: Response, __: NextFunction) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ statusCode: status, message })
})
