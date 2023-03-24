import { PrismaUsersRepository } from '@/repositories/users/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile-usecase'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
