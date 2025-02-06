import { UniqueEntityID } from '@core/entities'
import {
  InvalidPropertyError,
  ResourceAlreadyExistsError,
  ResourceNotFoundError,
} from '@core/errors'
import { Coverage } from '@entities'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeTestUpdateCoverageUseCase } from './factories'
import { UpdateCoverageUseCase } from './update-coverage'
let sut: UpdateCoverageUseCase
const coverageTestProps = {
  coverageId: 'b1701289-194d-4e3e-86df-59855785a5b6',
  name: 'CoverageTes',
  description: 'Coverage test desc',
  capital: 10000,
  premium: 2000,
}
const coverageIdSec = '1abafe3e-ef8c-4f73-aeb0-9068edc830e4'
describe('Update Coverage Use Case', () => {
  beforeEach(() => {
    sut = makeTestUpdateCoverageUseCase([
      Coverage.create(
        coverageTestProps,
        new UniqueEntityID(coverageTestProps.coverageId),
      ),
      Coverage.create(
        {
          name: 'CoverageTest 2',
          description: 'Coverage test 2 desc',
          capital: 5000,
          premium: 1000,
          removedAt: new Date(),
        },
        new UniqueEntityID(coverageIdSec),
      ),
    ])
  })

  it('should be able to update only coverage name', async () => {
    const name = 'New name'
    const result = await sut.execute({
      coverageId: coverageTestProps.coverageId,
      name,
    })
    expect(result.coverage).instanceOf(Coverage)
    expect(result.coverage.name).toBe(name)
    expect(result.coverage.id.toValue()).toBe(coverageTestProps.coverageId)
    expect(result.coverage.description).toBe(coverageTestProps.description)
    expect(result.coverage.capital).toBe(coverageTestProps.capital)
    expect(result.coverage.premium).toBe(coverageTestProps.premium)
  })

  it('should be able to update only coverage description', async () => {
    const description = 'New description'
    const result = await sut.execute({
      coverageId: coverageTestProps.coverageId,
      description,
    })
    expect(result.coverage).instanceOf(Coverage)
    expect(result.coverage.description).toBe(description)
    expect(result.coverage.id.toValue()).toBe(coverageTestProps.coverageId)
    expect(result.coverage.name).toBe(coverageTestProps.name)
    expect(result.coverage.capital).toBe(coverageTestProps.capital)
    expect(result.coverage.premium).toBe(coverageTestProps.premium)
  })

  it('should be able to update only coverage capital', async () => {
    const capital = 20000
    const result = await sut.execute({
      coverageId: coverageTestProps.coverageId,
      capital,
    })
    expect(result.coverage).instanceOf(Coverage)
    expect(result.coverage.capital).toBe(capital)
    expect(result.coverage.id.toValue()).toBe(coverageTestProps.coverageId)
    expect(result.coverage.name).toBe(coverageTestProps.name)
    expect(result.coverage.description).toBe(coverageTestProps.description)
    expect(result.coverage.premium).toBe(coverageTestProps.premium)
  })

  it('should be able to update only coverage premium', async () => {
    const premium = 2500
    const result = await sut.execute({
      coverageId: coverageTestProps.coverageId,
      premium,
    })
    expect(result.coverage).instanceOf(Coverage)
    expect(result.coverage.premium).toBe(premium)
    expect(result.coverage.id.toValue()).toBe(coverageTestProps.coverageId)
    expect(result.coverage.name).toBe(coverageTestProps.name)
    expect(result.coverage.description).toBe(coverageTestProps.description)
    expect(result.coverage.capital).toBe(coverageTestProps.capital)
  })

  it('should be able to update coverage to active', async () => {
    const result = await sut.execute({
      coverageId: coverageIdSec,
    })
    expect(result.coverage).instanceOf(Coverage)
    expect(result.coverage.id.toValue()).toBe(coverageIdSec)
    expect(result.coverage.isActive).toBe(true)
  })

  it("shouldn't be able to update a coverage with empty coverageId", async () => {
    await expect(() =>
      sut.execute({
        coverageId: '',
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to update a coverage with whitespace coverageId", async () => {
    await expect(() =>
      sut.execute({
        coverageId: '  ',
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to update a coverage with coverageId not found", async () => {
    await expect(() =>
      sut.execute({
        coverageId: '40455424-b714-44cb-aaec-2acb1a507019',
      }),
    ).rejects.toThrowError(ResourceNotFoundError)
  })

  it("shouldn't be able to update a coverage with empty name", async () => {
    await expect(() =>
      sut.execute({
        coverageId: coverageTestProps.coverageId,
        name: '',
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to update a coverage with whitespace name", async () => {
    await expect(() =>
      sut.execute({ coverageId: coverageTestProps.coverageId, name: '      ' }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to update a coverage with same name", async () => {
    await expect(() =>
      sut.execute({ coverageId: coverageIdSec, name: coverageTestProps.name }),
    ).rejects.toThrowError(ResourceAlreadyExistsError)
  })

  it("shouldn't be able to update a coverage with empty description", async () => {
    await expect(() =>
      sut.execute({
        coverageId: coverageTestProps.coverageId,
        description: '',
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to update a coverage with whitespace description", async () => {
    await expect(() =>
      sut.execute({
        coverageId: coverageTestProps.coverageId,
        description: '      ',
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to update a coverage with capital less then 1000", async () => {
    await expect(() =>
      sut.execute({ coverageId: coverageTestProps.coverageId, capital: 999 }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to update a coverage with a capital is a multiple of 10", async () => {
    await expect(() =>
      sut.execute({ coverageId: coverageTestProps.coverageId, capital: 1026 }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to update a coverage with premium less then 0", async () => {
    await expect(() =>
      sut.execute({ coverageId: coverageTestProps.coverageId, premium: -0.1 }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to update a coverage with premium more then 30% of the capital, more premium", async () => {
    await expect(() =>
      sut.execute({ coverageId: coverageTestProps.coverageId, premium: 3000 }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to update a coverage with premium more then 30% of the capital, less capital", async () => {
    await expect(() =>
      sut.execute({ coverageId: coverageTestProps.coverageId, capital: 6000 }),
    ).rejects.toThrowError(InvalidPropertyError)
  })
})
