import { randomUUID } from 'node:crypto'
import { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description ? data.description : '',
      phone: data.phone ? data.phone : '',
      latitude: new Decimal(data.latitude as number),
      longitude: new Decimal(data.longitude as number),
    }

    this.gyms.push(gym)

    return gym
  }
}
