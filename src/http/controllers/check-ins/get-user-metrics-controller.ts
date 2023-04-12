import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetUserMetricsUseCase } from '@/use-cases/check-ins/factories/make-get-user-metrics-usecase'

export async function getUserMetricsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
