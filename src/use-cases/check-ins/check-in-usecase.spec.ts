import { MaxDistanceError } from './erros/max-distance-error'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/check-ins/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/gyms/in-memory/in-memory-gyms-repository'

import { CheckInUseCase } from './check-in-usecase'
import { MaxNumberOfCheckInsError } from './erros/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

let gymId: string
const GYM_01_LATITUDE = -19.9526508
const GYM_01_LONGITUDE = -44.1801858
const GYM_02_LATITUDE = -18.9526508
const GYM_02_LONGITUDE = -43.1801858

const USER_LATITUDE = -19.9526508
const USER_LONGITUDE = -44.1801858

describe('Check-in UseCase', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    const gym = await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: GYM_01_LATITUDE,
      longitude: GYM_01_LONGITUDE,
    })

    gymId = gym.id

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId,
      userId: 'user-01',
      userLatitude: USER_LATITUDE,
      userLongitude: USER_LONGITUDE,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // TDD
  // red, green, refactor

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId,
      userId: 'user-01',
      userLatitude: USER_LATITUDE,
      userLongitude: USER_LONGITUDE,
    })

    await expect(() =>
      sut.execute({
        gymId,
        userId: 'user-01',
        userLatitude: USER_LATITUDE,
        userLongitude: USER_LONGITUDE,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId,
      userId: 'user-01',
      userLatitude: USER_LATITUDE,
      userLongitude: USER_LONGITUDE,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId,
      userId: 'user-01',
      userLatitude: USER_LATITUDE,
      userLongitude: USER_LONGITUDE,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    const gym = await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: GYM_02_LATITUDE,
      longitude: GYM_02_LONGITUDE,
    })

    await expect(() =>
      sut.execute({
        gymId: gym.id,
        userId: 'user-01',
        userLatitude: USER_LATITUDE,
        userLongitude: USER_LONGITUDE,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
