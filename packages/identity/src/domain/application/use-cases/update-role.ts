import { ResourceNotFoundError } from '@core/errors'
import { User, UserRole } from '@entities'
import { parseToInvalidProperty } from '@utils'
import { z } from 'zod'
import { UsersRepository } from '../repositories'

export interface UpdateRoleUseCaseRequest {
  userId: string
  role: UserRole
}

export interface UpdateRoleUseCaseResponse {
  user: User
}

export class UpdateRoleUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: UpdateRoleUseCaseRequest,
  ): Promise<UpdateRoleUseCaseResponse> {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      role: z.nativeEnum(UserRole),
    })

    const responseParse = bodySchema.safeParse(request)

    if (!responseParse.success) {
      throw parseToInvalidProperty(responseParse.error)
    }

    const user = await this.usersRepository.findById(request.userId)

    if (user === undefined) {
      throw new ResourceNotFoundError('User not found')
    }

    user.role = request.role

    await this.usersRepository.save(user)

    return { user }
  }
}
