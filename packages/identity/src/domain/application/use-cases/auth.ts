import { InvalidCredentialsError } from '@application/errors'
import { UsersRepository } from '@application/repositories'
import { User } from '@entities'
import { compare } from 'bcryptjs'
import { z } from 'zod'

export interface AuthUseCaseRequest {
  username: string
  password: string
}

export interface AuthUseCaseResponse {
  user: User
}

export class AuthUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    const bodySchema = z.object({
      username: z.string().email(),
      password: z
        .string()
        .min(8)
        .max(64)
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#!$%])/),
    })

    const responseParse = bodySchema.safeParse(request)

    if (!responseParse.success) {
      throw new InvalidCredentialsError()
    }

    const user = await this.usersRepository.findByUsername(request.username)

    if (user === undefined) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(request.password, user.password)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
