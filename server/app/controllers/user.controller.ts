import type { NextFunction, Request, Response } from 'express'

import { prisma } from '@/prisma'

class UserController {
  me = async (req: Request, res: Response) => {
    const user = await prisma.user.findFirst({
      where: { id: req.user.id }
    })

    res.json(user)
  }
}

export const userController = new UserController()
