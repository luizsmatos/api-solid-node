import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/users/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUserUseCase } from './authenticate-user-usecase'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate User UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Elmer Massey',
      email: 'ojadul@hupnagen.gr',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'ojadul@hupnagen.gr',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'ojadul@hupnagen.gr',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Elmer Massey',
      email: 'ojadul@hupnagen.gr',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'ojadul@hupnagen.gr',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
