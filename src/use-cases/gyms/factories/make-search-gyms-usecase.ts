import { PrismaGymsRepository } from '@/repositories/gyms/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms-usecase'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGymsUseCase = new SearchGymsUseCase(gymsRepository)

  return searchGymsUseCase
}
