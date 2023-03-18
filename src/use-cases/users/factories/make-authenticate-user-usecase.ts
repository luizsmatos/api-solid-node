import { PrismaUsersRepository } from '@/repositories/users/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '../authenticate-user-usecase'

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

  return authenticateUserUseCase
}
