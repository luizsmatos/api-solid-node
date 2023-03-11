import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '@/repositories/users/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '@/use-cases/users/register-user-usecase'
import { UserAlreadyExistsError } from '@/use-cases/users/errors/user-already-exists-error'

export class RegisterUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
      const usersRepository = new PrismaUsersRepository()
      const registerUserUseCase = new RegisterUserUseCase(usersRepository)

      await registerUserUseCase.execute({ name, email, password })

      return reply.status(201).send()
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: err.message })
      }

      throw err
    }
  }
}
