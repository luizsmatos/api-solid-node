import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/users/errors/user-already-exists-error'
import { makeRegisterUserUseCase } from '@/use-cases/users/factories/make-register-user-usecase'

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUserUseCase = makeRegisterUserUseCase()
    await registerUserUseCase.execute({ name, email, password })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
