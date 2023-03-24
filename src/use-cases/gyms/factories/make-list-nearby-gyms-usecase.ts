import { PrismaGymsRepository } from '@/repositories/gyms/prisma/prisma-gyms-repository'
import { ListNearbyGymsUseCase } from '../list-nearby-gyms-usecase'

export function makeListNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const listNearbyGymsUseCase = new ListNearbyGymsUseCase(gymsRepository)

  return listNearbyGymsUseCase
}
