import { PrismaUsersRepository } from '@infra/repositories'
import { InMemoryUsersRepository } from '@test/repositories'
import { CreateUserUseCase } from '../create'

export function makeCreateUserUseCase() {
  const repository = new PrismaUsersRepository()
  const useCase = new CreateUserUseCase(repository)
  return useCase
}

export function makeTestCreateUserUseCase() {
  const repository = new InMemoryUsersRepository()
  const useCase = new CreateUserUseCase(repository)
  return useCase
}
