import { Router } from 'express'

import { authController } from '@/controllers'

import { authenticate } from '@/middlewares'

export const authRouter = Router()

authRouter.post('/signup', authController.signup)

authRouter.post('/signin', authController.signin)

authRouter.post('/logout', authenticate, authController.logout)
