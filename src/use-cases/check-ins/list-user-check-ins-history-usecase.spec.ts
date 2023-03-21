import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInsRepository } from 'in-memory/in-memory-check-ins-repository'

import { ListUserCheckInsHistoryUseCase } from './list-user-check-ins-history-usecase'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ListUserCheckInsHistoryUseCase

describe('List User Check-in History UseCase', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ListUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to list user check-in history', async () => {
    await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })

    const { checkIns } = await sut.execute({ userId: 'user-01', page: 1 })

    expect(checkIns).toHaveLength(2)
    expect(checkIns[0].gym_id).toBe('gym-01')
    expect(checkIns[1].gym_id).toBe('gym-02')
  })

  it('should be able to list paginated user check-in history', async () => {
    for (let i = 1; i <= 22; i += 1) {
      await checkInsRepository.create({
        user_id: `user-01`,
        gym_id: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.execute({ userId: 'user-01', page: 2 })

    expect(checkIns[0].gym_id).toBe('gym-21')
    expect(checkIns[1].gym_id).toBe('gym-22')
  })
})
