import type { RefreshTokenSchema, SignupSchema } from '@/schemas'
import type { JwtPayload, TypedRequestBody } from '@/types'
import type { NextFunction, Request, Response } from 'express'

import { prisma } from '@/prisma'
import { hash, verify } from 'argon2'
import { Conflict, Forbidden, Unauthorized } from 'http-errors'
import { jwtVerify, SignJWT } from 'jose'
import { JWTExpired } from 'jose/errors'

import { env } from '@/config'

const {
  ACCESS_JWT_EXPIRES_IN,
  REFRESH_JWT_EXPIRES_IN,
  REFRESH_JWT_SECRET,
  ACCESS_JWT_SECRET,
  ACCESS_JWT_ALGORITHM,
  REFRESH_JWT_ALGORITHM
} = env

class AuthController {
  signup = async (
    { body }: TypedRequestBody<typeof SignupSchema>,
    res: Response,
    next: NextFunction
  ) => {
    const isUserExists = await prisma.user.findUnique({
      where: { email: body.email }
    })

    if (isUserExists) return next(Conflict('Email already exists'))

    const user = await prisma.user.create({
      data: {
        ...body,
        password: await hash(body.password)
      }
    })

    const newSession = await prisma.session.create({
      data: { userId: user.id }
    })

    const tokens = await this.getNewTokens({ id: user.id, sid: newSession.id })

    res.json({ user, ...tokens })
  }
  signin = async (
    { body }: TypedRequestBody<typeof SignupSchema>,
    res: Response,
    next: NextFunction
  ) => {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
      omit: { password: false }
    })

    if (!user) return next(Unauthorized('Email or password invalid'))

    const { password, ...userWithoutPassword } = user

    if (!password) return next(Unauthorized('Email or password invalid'))

    const isPasswordMatch = await verify(password, body.password)

    if (!isPasswordMatch) return next(Unauthorized('Email or password invalid'))

    const newSession = await prisma.session.create({
      data: { userId: user.id }
    })

    const tokens = await this.getNewTokens({ id: user.id, sid: newSession.id })

    res.json({ user: userWithoutPassword, ...tokens })
  }

  tokens = async (
    { body }: TypedRequestBody<typeof RefreshTokenSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        payload: { id, sid }
      } = await jwtVerify<JwtPayload>(body.refreshToken, REFRESH_JWT_SECRET)

      const user = await prisma.user.findFirst({ where: { id } })

      if (!user) return next(Forbidden())

      const currentSession = await prisma.session.findFirst({
        where: { id: sid }
      })

      if (!currentSession) return next(Forbidden())

      await prisma.session.delete({ where: { id: currentSession.id } })

      const newSid = await prisma.session.create({
        data: { userId: user.id }
      })

      const tokens = await this.getNewTokens({ id: user.id, sid: newSid.id })

      res.json(tokens)
    } catch (error) {
      if (error instanceof JWTExpired) return next(Forbidden(error.code))

      return next(Forbidden())
    }
  }

  logout = async ({ session }: Request, res: Response) => {
    await prisma.session.delete({ where: { id: session } })

    res.status(204).send()
  }

  private getNewTokens = async (payload: JwtPayload) => {
    const accessToken = await new SignJWT(payload)
      .setExpirationTime(ACCESS_JWT_EXPIRES_IN)
      .setProtectedHeader({ alg: ACCESS_JWT_ALGORITHM })
      .sign(ACCESS_JWT_SECRET)

    const refreshToken = await new SignJWT(payload)
      .setExpirationTime(REFRESH_JWT_EXPIRES_IN)
      .setProtectedHeader({ alg: REFRESH_JWT_ALGORITHM })
      .sign(REFRESH_JWT_SECRET)

    return { accessToken, refreshToken }
  }
}

export const authController = new AuthController()
