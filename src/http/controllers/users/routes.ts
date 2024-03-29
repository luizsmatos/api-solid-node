import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { authenticateUserController } from './authenticate-user-controller'
import { getUserProfileController } from './get-user-profile-controller'
import { registerUserController } from './register-user-controller'
import { refreshTokenController } from './refresh-token-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUserController)
  app.patch('/token/refresh', refreshTokenController)

  /* Authenticate */
  app.get('/me', { onRequest: [verifyJWT] }, getUserProfileController)
}
