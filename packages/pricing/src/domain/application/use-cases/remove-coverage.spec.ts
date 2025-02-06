import { UniqueEntityID } from '@core/entities'
import { InvalidPropertyError, ResourceNotFoundError } from '@core/errors'
import { Coverage } from '@entities'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeTestRemoveCoverageUseCase } from './factories'
import { RemoveCoverageUseCase } from './remove-coverage'
let sut: RemoveCoverageUseCase
const coverageId = 'b1701289-194d-4e3e-86df-59855785a5b6'

describe('Remove Coverage Use Case', () => {
  beforeEach(() => {
    sut = makeTestRemoveCoverageUseCase([
      Coverage.create(
        {
          name: 'CoverageTest',
          description: 'CoverageTest',
          capital: 1000,
          premium: 200,
        },
        new UniqueEntityID(coverageId),
      ),
    ])
  })

  it('should be able to remove a coverage', async () => {
    const result = await sut.execute({
      coverageId,
    })
    expect(result.coverage).instanceOf(Coverage)
    expect(result.coverage.isActive).toBe(false)
  })

  it("shouldn't be able to remove a coverage with uuid invalid coverageId", async () => {
    await expect(() =>
      sut.execute({ coverageId: '15ad45as5d' }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to remove a coverage with empty coverageId", async () => {
    await expect(() => sut.execute({ coverageId: '' })).rejects.toThrowError(
      InvalidPropertyError,
    )
  })

  it("shouldn't be able to remove a coverage with whitespace coverageId", async () => {
    await expect(() => sut.execute({ coverageId: '   ' })).rejects.toThrowError(
      InvalidPropertyError,
    )
  })

  it("shouldn't be able to remove a coverage with coverageId not found", async () => {
    await expect(() =>
      sut.execute({ coverageId: '129aa0c7-2bab-4a4e-bd12-88b2853b9617' }),
    ).rejects.toThrowError(ResourceNotFoundError)
  })
})
