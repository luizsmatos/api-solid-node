import { FastifyInstance } from 'fastify'

import { RegisterUserController } from './controllers/users/register-user-controller'

const registerUserController = new RegisterUserController()

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController.handle)
}
