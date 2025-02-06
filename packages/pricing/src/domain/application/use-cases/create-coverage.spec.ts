import { InvalidPropertyError, ResourceAlreadyExistsError } from '@core/errors'
import { Coverage } from '@entities'
import { makeCreateCoverageUseCaseRequest } from '@test/factories'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCoverageUseCase } from './create-coverage'
import { makeTestCreateCoverageUseCase } from './factories'
let sut: CreateCoverageUseCase

describe('Create Coverage Use Case', () => {
  beforeEach(() => {
    sut = makeTestCreateCoverageUseCase()
  })

  it('should be able to create a coverage', async () => {
    const request = makeCreateCoverageUseCaseRequest()
    const result = await sut.execute(request)
    expect(result.coverage).instanceOf(Coverage)
    expect(result.coverage.name).toBe(request.name)
    expect(result.coverage.description).toBe(request.description)
    expect(result.coverage.capital).toBe(request.capital)
    expect(result.coverage.premium).toBe(request.premium)
  })

  it("shouldn't be able to create a coverage with empty name", async () => {
    await expect(() =>
      sut.execute(makeCreateCoverageUseCaseRequest({ name: '' })),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a coverage with whitespace name", async () => {
    await expect(() =>
      sut.execute(makeCreateCoverageUseCaseRequest({ name: '      ' })),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a coverage with same name", async () => {
    const request = makeCreateCoverageUseCaseRequest()
    const result = await sut.execute(request)
    const name = result.coverage.name
    await expect(() =>
      sut.execute(makeCreateCoverageUseCaseRequest({ name })),
    ).rejects.toThrowError(ResourceAlreadyExistsError)
  })

  it("shouldn't be able to create a coverage with empty description", async () => {
    await expect(() =>
      sut.execute(makeCreateCoverageUseCaseRequest({ description: '' })),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a coverage with whitespace description", async () => {
    await expect(() =>
      sut.execute(makeCreateCoverageUseCaseRequest({ description: '      ' })),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a coverage with capital less then 1000", async () => {
    await expect(() =>
      sut.execute(makeCreateCoverageUseCaseRequest({ capital: 999 })),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a coverage with a capital is a multiple of 10", async () => {
    await expect(() =>
      sut.execute(makeCreateCoverageUseCaseRequest({ capital: 1026 })),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a coverage with premium less then 0", async () => {
    await expect(() =>
      sut.execute(makeCreateCoverageUseCaseRequest({ premium: -0.1 })),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a coverage with premium more then 30% of the capital", async () => {
    const capital = 1000
    const premium = 1000 * 0.3
    await expect(() =>
      sut.execute(makeCreateCoverageUseCaseRequest({ capital, premium })),
    ).rejects.toThrowError(InvalidPropertyError)
  })
})
