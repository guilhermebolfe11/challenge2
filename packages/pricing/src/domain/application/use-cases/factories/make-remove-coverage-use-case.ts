import { Coverage } from '@entities'
import { PrismaCoverageRepository } from '@infra/repositories'
import { InMemoryCoverageRepository } from '@test/repositories'
import { RemoveCoverageUseCase } from '../remove-coverage'

export function makeRemoveCoverageUseCase() {
  const repository = new PrismaCoverageRepository()
  const useCase = new RemoveCoverageUseCase(repository)
  return useCase
}

export function makeTestRemoveCoverageUseCase(items: Coverage[]) {
  const repository = new InMemoryCoverageRepository(items)
  const useCase = new RemoveCoverageUseCase(repository)
  return useCase
}
