import { UsersRepository } from '@application/repositories'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { User } from '@entities'
import { prisma } from '@infra/repositories/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return this.mapToUser(user)
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })
    return this.mapToUser(user)
  }

  async save(user: User): Promise<void> {
    await prisma.user.update({
      data: {
        id: user.id.toValue(),
        username: user.username,
        password_hash: user.password,
        role: user.role,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      } as Prisma.UserUpdateInput,
      where: {
        id: user.id.toValue(),
      },
    })
  }

  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id.toValue(),
        username: user.username,
        password_hash: user.password,
        role: user.role,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      } as Prisma.UserCreateInput,
    })
  }

  private mapToUser(user?: any) {
    if (!user) {
      return undefined
    }

    return User.create(
      {
        username: user.username,
        password: user.password_hash,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        role: user.role,
      },
      new UniqueEntityID(user.id),
    )
  }
}
