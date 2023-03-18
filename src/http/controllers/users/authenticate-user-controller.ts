import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/users/errors/invalid-credentials-error'
import { makeAuthenticateUserUseCase } from '@/use-cases/users/factories/make-authenticate-user-usecase'

export class AuthenticateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
      const authenticateUserUseCase = makeAuthenticateUserUseCase()

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
