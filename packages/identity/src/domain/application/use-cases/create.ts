import { ResourceAlreadyExistsError } from '@core/errors'
import { User, UserRole } from '@entities'
import { parseToInvalidProperty } from '@utils'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { UsersRepository } from '../repositories'

export interface CreateUserUseCaseRequest {
  username: string
  password: string
  role: UserRole
}

export interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const bodySchema = z.object({
      username: z.string().email(),
      password: z
        .string()
        .min(8)
        .max(64)
        .regex(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#!$%])/,
          'Password must meet all the requirements:' +
            ' at least one uppercase letter,' +
            ' one lowercase letter, one number,' +
            ' and one of the following symbols: @, #, !, $, %',
        ),
    })

    const responseParse = bodySchema.safeParse(request)

    if (!responseParse.success) {
      throw parseToInvalidProperty(responseParse.error)
    }

    request.password = await hash(request.password, 6)

    const user = User.create(request)

    const userWithSameUsername = await this.usersRepository.findByUsername(
      user.username,
    )

    if (userWithSameUsername) {
      throw new ResourceAlreadyExistsError('Username already used')
    }

    await this.usersRepository.create(user)

    return { user }
  }
}
