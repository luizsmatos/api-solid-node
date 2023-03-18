import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '@/repositories/users/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '@/use-cases/users/authenticate-user-usecase'
import { InvalidCredentialsError } from '@/use-cases/users/errors/invalid-credentials-error'

export class AuthenticateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
      const usersRepository = new PrismaUsersRepository()
      const authenticateUserUseCase = new AuthenticateUserUseCase(
        usersRepository,
      )

      await authenticateUserUseCase.execute({ email, password })
      return reply.status(201).send()
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: err.message })
      }

      throw err
    }
  }
}
