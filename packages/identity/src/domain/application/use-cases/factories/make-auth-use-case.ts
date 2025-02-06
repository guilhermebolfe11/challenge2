import { User } from '@entities'
import { PrismaUsersRepository } from '@infra/repositories'
import { InMemoryUsersRepository } from '@test/repositories'
import { AuthUseCase } from '../auth'

export function makeAuthUseCase() {
  const repository = new PrismaUsersRepository()
  const useCase = new AuthUseCase(repository)
  return useCase
}

export function makeTestAuthUseCase(items: User[]) {
  const repository = new InMemoryUsersRepository(items)
  const useCase = new AuthUseCase(repository)
  return useCase
}
