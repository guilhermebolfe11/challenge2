import { UniqueEntityID } from '@core/entities'
import { InvalidPropertyError, ResourceNotFoundError } from '@core/errors'
import { Coverage, Occupation } from '@entities'
import { beforeEach, describe, expect, it } from 'vitest'
import { CalculateQuoteUseCase } from './calculate-quote'
import { makeTestCalculateQuoteUseCase } from './factories'
let sut: CalculateQuoteUseCase

describe('Calculate Quote Use Case', () => {
  beforeEach(() => {
    sut = makeTestCalculateQuoteUseCase(
      [
        Coverage.create(
          {
            description: 'Indenização Especial por Morte Acidental',
            name: 'Indenização Especial por Morte Acidental',
            premium: 20,
            capital: 15000,
          },
          new UniqueEntityID('5e3cc93d-cb51-401d-a632-a1044d640766'),
        ),
        Coverage.create(
          {
            description: 'Invalidez',
            name: 'Invalidez',
            premium: 10,
            capital: 10000,
          },
          new UniqueEntityID('011b1014-83c1-4d43-ba40-f7c988cfc892'),
        ),
        Coverage.create(
          {
            description: 'Removed',
            name: 'Removed',
            premium: 35,
            capital: 100000,
            removedAt: new Date()
          },
          new UniqueEntityID('e7271729-b3da-4edb-b105-36c7a68f920e'),
        ),
      ],
      [
        Occupation.create({
          active: true,
          code: '223280',
          factor: 1.02,
          name: 'Dentista',
        }),
        Occupation.create({
          active: false,
          code: '123456',
          factor: 1.59,
          name: 'Inativa',
        }),
      ],
    )
  })

  it('should be able to calculate quote', async () => {
    const result = await sut.execute({
      age: 26,
      occupationCode: '223280',
      capital: 100000,
      coverages: [
        '5e3cc93d-cb51-401d-a632-a1044d640766',
        '011b1014-83c1-4d43-ba40-f7c988cfc892',
      ],
    })
    expect(result.quote.premium).toBe(428.4)
  })

  it('should be able to calculate quote with removed coverage', async () => {
    const result = await sut.execute({
      age: 26,
      occupationCode: '223280',
      capital: 100000,
      coverages: [
        '5e3cc93d-cb51-401d-a632-a1044d640766',
        '011b1014-83c1-4d43-ba40-f7c988cfc892',
        'e7271729-b3da-4edb-b105-36c7a68f920e'
      ],
    })
    expect(result.quote.premium).toBe(428.4)
  })

  it("shouldn't be able to calculate quote with age less than 18", async () => {
    await expect(() =>
      sut.execute({
        age: 17,
        occupationCode: '223280',
        capital: 100000,
        coverages: [
          '5e3cc93d-cb51-401d-a632-a1044d640766',
          '011b1014-83c1-4d43-ba40-f7c988cfc892',
        ],
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to calculate quote with age more than 60", async () => {
    await expect(() =>
      sut.execute({
        age: 61,
        occupationCode: '223280',
        capital: 100000,
        coverages: [
          '5e3cc93d-cb51-401d-a632-a1044d640766',
          '011b1014-83c1-4d43-ba40-f7c988cfc892',
        ],
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to calculate quote with empty occupation", async () => {
    await expect(() =>
      sut.execute({
        age: 26,
        occupationCode: '',
        capital: 100000,
        coverages: [
          '5e3cc93d-cb51-401d-a632-a1044d640766',
          '011b1014-83c1-4d43-ba40-f7c988cfc892',
        ],
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to calculate quote with whitespace occupation", async () => {
    await expect(() =>
      sut.execute({
        age: 26,
        occupationCode: '   ',
        capital: 100000,
        coverages: [
          '5e3cc93d-cb51-401d-a632-a1044d640766',
          '011b1014-83c1-4d43-ba40-f7c988cfc892',
        ],
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to calculate quote with occupation not found", async () => {
    await expect(() =>
      sut.execute({
        age: 26,
        occupationCode: '123',
        capital: 100000,
        coverages: [
          '5e3cc93d-cb51-401d-a632-a1044d640766',
          '011b1014-83c1-4d43-ba40-f7c988cfc892',
        ],
      }),
    ).rejects.toThrowError(ResourceNotFoundError)
  })

  it("shouldn't be able to calculate quote with occupation not active", async () => {
    await expect(() =>
      sut.execute({
        age: 26,
        occupationCode: '123456',
        capital: 100000,
        coverages: [
          '5e3cc93d-cb51-401d-a632-a1044d640766',
          '011b1014-83c1-4d43-ba40-f7c988cfc892',
        ],
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to calculate quote with capital less than 10000", async () => {
    await expect(() =>
      sut.execute({
        age: 18,
        occupationCode: '223280',
        capital: 9999,
        coverages: [
          '5e3cc93d-cb51-401d-a632-a1044d640766',
          '011b1014-83c1-4d43-ba40-f7c988cfc892',
        ],
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to calculate quote with capital more than 10000000", async () => {
    await expect(() =>
      sut.execute({
        age: 18,
        occupationCode: '223280',
        capital: 10000000.1,
        coverages: [
          '5e3cc93d-cb51-401d-a632-a1044d640766',
          '011b1014-83c1-4d43-ba40-f7c988cfc892',
        ],
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to calculate quote without coverages", async () => {
    await expect(() =>
      sut.execute({
        age: 18,
        occupationCode: '223280',
        capital: 10000000,
        coverages: [],
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to calculate quote with empty coverage id", async () => {
    await expect(() =>
      sut.execute({
        age: 18,
        occupationCode: '223280',
        capital: 10000000,
        coverages: [''],
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to calculate quote with whitespace coverage id", async () => {
    await expect(() =>
      sut.execute({
        age: 18,
        occupationCode: '223280',
        capital: 10000000,
        coverages: ['  '],
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

})
