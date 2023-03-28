import { FastifyInstance } from 'fastify'

import { authenticateUserController } from './controllers/users/authenticate-user-controller'
import { getUserProfileController } from './controllers/users/get-user-profile-controller'
import { registerUserController } from './controllers/users/register-user-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/session', authenticateUserController)

  /* Authenticate */
  app.get('/me', getUserProfileController)
}
