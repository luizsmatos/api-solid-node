import { makeGetUserProfileUseCase } from '@/use-cases/users/factories/make-get-user-profile-usecase'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getUserProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfileUseCase = makeGetUserProfileUseCase()
  const { user } = await getUserProfileUseCase.execute({
    userId: request.user.sub,
  })

  Reflect.deleteProperty(user, 'password_hash')
  return reply.status(200).send({
    user,
  })
}
