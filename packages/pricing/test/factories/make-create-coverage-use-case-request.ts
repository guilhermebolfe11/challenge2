import { CreateCoverageUseCaseRequest } from '@application/use-cases'
import { fakerPT_BR as faker } from '@faker-js/faker'

export function makeCreateCoverageUseCaseRequest(
  override: Partial<CreateCoverageUseCaseRequest> = {},
) {
  const capital = override.capital ?? generateCapital()
  const premium =
    override.premium ?? capital * faker.number.float({ min: 0.01, max: 0.29 })
  const request = {
    name: override.name ?? faker.company.name(),
    description: override.description ?? faker.lorem.lines(2),
    capital,
    premium,
  } as CreateCoverageUseCaseRequest
  return request
}

function generateCapital(): number {
  let number = Math.ceil(Math.random() * 1000)
  while (number < 1000 || number % 10 !== 0) {
    number = Math.ceil(Math.random() * 1000)
  }
  return number
}
