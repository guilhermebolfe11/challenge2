import { User } from '@entities'
import { PrismaUsersRepository } from '@infra/repositories'
import { InMemoryUsersRepository } from '@test/repositories'
import { UpdateRoleUseCase } from '../update-role'

export function makeUpdateRoleUseCase() {
  const repository = new PrismaUsersRepository()
  const useCase = new UpdateRoleUseCase(repository)
  return useCase
}

export function makeTestUpdateRoleUseCase(items: User[]) {
  const repository = new InMemoryUsersRepository(items)
  const useCase = new UpdateRoleUseCase(repository)
  return useCase
}
