import { PrismaCheckInsRepository } from '@/repositories/check-ins/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in-usecase'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

  return validateCheckInUseCase
}