import { PrismaUsersRepository } from '@/repositories/users/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register-user-usecase'

export function makeRegisterUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUserUseCase(usersRepository)

  return registerUserUseCase
}
