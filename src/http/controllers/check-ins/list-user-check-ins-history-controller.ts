import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeListUserCheckInsHistoryUseCase } from '@/use-cases/check-ins/factories/make-list-user-check-ins-history-usecase'

export async function listUserCheckInsHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listUserCheckInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = listUserCheckInsHistoryQuerySchema.parse(request.query)

  const listUserCheckInsHistoryUseCase = makeListUserCheckInsHistoryUseCase()
  const { checkIns } = await listUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
