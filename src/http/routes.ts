import { FastifyInstance } from 'fastify'

import { AuthenticateUserController } from './controllers/users/authenticate-user-controller'
import { RegisterUserController } from './controllers/users/register-user-controller'

const registerUserController = new RegisterUserController()
const authenticateUserController = new AuthenticateUserController()

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController.handle)
  app.post('/session', authenticateUserController.handle)
}
