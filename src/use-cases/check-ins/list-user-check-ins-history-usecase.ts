import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins/check-ins-repository'

interface ListUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface ListUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class ListUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: ListUserCheckInsHistoryUseCaseRequest): Promise<ListUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
