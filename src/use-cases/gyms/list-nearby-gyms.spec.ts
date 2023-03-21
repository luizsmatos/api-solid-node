import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/gyms/in-memory/in-memory-gyms-repository'

import { ListNearbyGymsUseCase } from './list-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: ListNearbyGymsUseCase

const USER_LATITUDE = -19.9526508
const USER_LONGITUDE = -44.1801858

describe('List User Check-in History UseCase', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new ListNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to list nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -19.949112,
      longitude: -44.178002,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -19.9577025,
      longitude: -44.0611462,
    })

    const { gyms } = await sut.execute({
      userLatitude: USER_LATITUDE,
      userLongitude: USER_LONGITUDE,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
