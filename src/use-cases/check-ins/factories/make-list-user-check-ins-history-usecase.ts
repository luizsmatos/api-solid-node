import { PrismaCheckInsRepository } from '@/repositories/check-ins/prisma/prisma-check-ins-repository'
import { ListUserCheckInsHistoryUseCase } from '../list-user-check-ins-history-usecase'

export function makeListUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const listUserCheckInsHistoryUseCase = new ListUserCheckInsHistoryUseCase(
    checkInsRepository,
  )

  return listUserCheckInsHistoryUseCase
}
