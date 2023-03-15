import { compare } from 'bcryptjs'
import { expect, describe, it, beforeAll, afterEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/users/in-memory/in-memory-users-repository'
import { RegisterUserUseCase } from '@/use-cases/users/register-user-usecase'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let registerUserUseCase: RegisterUserUseCase

describe('Register User UseCase', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUserUseCase = new RegisterUserUseCase(usersRepository)
  })

  afterEach(() => {
    usersRepository.users = []
  })

  it('should be able to register a new user', async () => {
    const { user } = await registerUserUseCase.execute({
      email: 'envkt@example.com',
      password: '1234567890',
      name: 'Test User',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUserUseCase.execute({
      name: 'Elijah Vargas',
      email: 'ageam@werruzeci.mz',
      password: '402452',
    })

    const isPasswordCorrectlyHashed = await compare(
      '402452',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'ageam@werruzeci.mz'

    await registerUserUseCase.execute({
      name: 'Elijah Vargas',
      email,
      password: '402452',
    })

    await expect(() =>
      registerUserUseCase.execute({
        name: 'Elijah Vargas',
        email,
        password: '402452',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
