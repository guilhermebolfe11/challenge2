import { Coverage, Occupation } from '@entities'
import {
  PrismaCoverageRepository,
  PrismaOccupationsRepository,
  TreeAgesRepository,
} from '@infra/repositories'
import {
  InMemoryCoverageRepository,
  InMemoryOccupationsRepository,
} from '@test/repositories'
import { CalculateQuoteUseCase } from '../calculate-quote'

export function makeCalculateQuoteUseCase() {
  const coverageRepository = new PrismaCoverageRepository()
  const agesRepository = new TreeAgesRepository()
  const occupationsRepository = new PrismaOccupationsRepository()
  const useCase = new CalculateQuoteUseCase(
    coverageRepository,
    agesRepository,
    occupationsRepository,
  )
  return useCase
}

export function makeTestCalculateQuoteUseCase(
  coverage: Coverage[],
  occupations: Occupation[],
) {
  const coverageRepository = new InMemoryCoverageRepository(coverage)
  const agesRepository = new TreeAgesRepository()
  const occupationsRepository = new InMemoryOccupationsRepository(occupations)
  const useCase = new CalculateQuoteUseCase(
    coverageRepository,
    agesRepository,
    occupationsRepository,
  )
  return useCase
}
