import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createCheckInController } from './create-check-in-controller'
import { validateCheckInController } from './validate-check-in-controller'
import { listUserCheckInsHistoryController } from './list-user-check-ins-history-controller'
import { getUserMetricsController } from './get-user-metrics-controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', listUserCheckInsHistoryController)
  app.get('/check-ins/metrics', getUserMetricsController)

  app.post('/gyms/:gymId/check-ins', createCheckInController)
  app.patch('/check-ins/:checkInId/validate', validateCheckInController)
}
