import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeSearchGymsUseCase } from '@/use-cases/gyms/factories/make-search-gyms-usecase'

export async function searchGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchGymsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(201).send({
    gyms,
  })
}
