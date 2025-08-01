import { Router } from 'express'

import { userController } from '@/controllers/user.controller'

import { authenticate } from '@/middlewares'

export const userRouter = Router()

userRouter.use(authenticate)

userRouter.get('/me', userController.me)
