import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeListNearbyGymsUseCase } from '@/use-cases/gyms/factories/make-list-nearby-gyms-usecase'

export async function listNearbyGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const listNearbyGymsUseCase = makeListNearbyGymsUseCase()
  const { gyms } = await listNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
