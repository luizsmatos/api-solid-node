import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserRequest {
  name: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUserRequest) {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
