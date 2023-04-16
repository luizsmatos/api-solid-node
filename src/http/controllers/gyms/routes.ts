import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

import { searchGymsController } from './search-gyms-controller'
import { listNearbyGymsController } from './list-nearby-gyms-controller'
import { createGymController } from './create-gym-controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searchGymsController)
  app.get('/gyms/nearby', listNearbyGymsController)

  app.post(
    '/gyms',
    { onRequest: [verifyUserRole('ADMIN')] },
    createGymController,
  )
}
