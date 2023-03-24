import { PrismaCheckInsRepository } from '@/repositories/check-ins/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics-usecase'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetricsUseCase
}
