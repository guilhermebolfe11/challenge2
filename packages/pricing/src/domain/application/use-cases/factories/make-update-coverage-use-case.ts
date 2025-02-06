import { Coverage } from '@entities'
import { PrismaCoverageRepository } from '@infra/repositories'
import { InMemoryCoverageRepository } from '@test/repositories'
import { UpdateCoverageUseCase } from '../update-coverage'

export function makeUpdateCoverageUseCase() {
  const repository = new PrismaCoverageRepository()
  const useCase = new UpdateCoverageUseCase(repository)
  return useCase
}

export function makeTestUpdateCoverageUseCase(items: Coverage[]) {
  const repository = new InMemoryCoverageRepository(items)
  const useCase = new UpdateCoverageUseCase(repository)
  return useCase
}
