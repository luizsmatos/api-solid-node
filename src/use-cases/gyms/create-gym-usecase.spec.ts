import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/gyms/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym-usecase'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register User UseCase', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to register a new user', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -19.949112,
      longitude: -44.178002,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
