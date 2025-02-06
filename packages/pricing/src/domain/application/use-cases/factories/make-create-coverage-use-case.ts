import { PrismaCoverageRepository } from '@infra/repositories'
import { InMemoryCoverageRepository } from '@test/repositories'
import { CreateCoverageUseCase } from '../create-coverage'

export function makeCreateCoverageUseCase() {
  const repository = new PrismaCoverageRepository()
  const useCase = new CreateCoverageUseCase(repository)
  return useCase
}

export function makeTestCreateCoverageUseCase() {
  const repository = new InMemoryCoverageRepository()
  const useCase = new CreateCoverageUseCase(repository)
  return useCase
}
