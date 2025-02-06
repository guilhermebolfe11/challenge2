import { InvalidPropertyError, ResourceNotFoundError } from '@core/errors'
import { Coverage } from '@entities'
import { parseToInvalidProperty } from '@utils'
import { z } from 'zod'
import {
  AgesRepository,
  CoverageRepository,
  OccupationsRepository,
} from '../repositories'

export interface CalculateQuoteUseCaseRequest {
  age: number
  occupationCode: string
  capital: number
  coverages: string[]
}

export interface CoverageQuote {
  coverageId: string
  premium: string
}

export interface Quote {
  ageFactor: number
  occupationFactor: number
  capital: number
  premium: number
  coverages: CoverageQuote[]
}

export interface CalculateQuoteUseCaseResponse {
  quote: Quote
}

export class CalculateQuoteUseCase {
  constructor(
    private coverageRepository: CoverageRepository,
    private agesRepository: AgesRepository,
    private occupationsRepository: OccupationsRepository,
  ) {}

  async execute(
    request: CalculateQuoteUseCaseRequest,
  ): Promise<CalculateQuoteUseCaseResponse> {
    const propsSchema = z.object({
      age: z.number().gte(18).lte(60).int(),
      occupationCode: z
        .string()
        .min(1)
        .refine(
          (value) => value.trim().length > 0,
          'Occupation code cannot be only white spaces.',
        ),
      capital: z.number().gte(10000).lte(10000000),
      coverages: z.array(z.string().uuid()).min(1),
    })

    const responsePropsSchema = propsSchema.safeParse(request)

    if (!responsePropsSchema.success) {
      throw parseToInvalidProperty(responsePropsSchema.error)
    }

    const occupation = await this.occupationsRepository.findByCode(
      request.occupationCode,
    )

    if (!occupation) {
      throw new ResourceNotFoundError('Occupation not found')
    }

    if (!occupation.active) {
      throw new InvalidPropertyError('Occupation not active')
    }

    const ageFactor = await this.agesRepository.findFactorByAge(request.age)

    const quote = {
      ageFactor,
      occupationFactor: occupation.factor,
      capital: request.capital,
      premium: 0,
    } as Quote

    const coverages = await this.coverageRepository.findByIds(request.coverages)
    quote.coverages = coverages.map((c) => this.calculatePremium(c, quote))

    return { quote }
  }

  private calculatePremium(c: Coverage, quote: Quote): CoverageQuote {
    const premium =
      Math.ceil(quote.capital / c.capital) *
      c.premium *
      quote.ageFactor *
      quote.occupationFactor

    quote.premium += premium
    return {
      coverageId: c.id.toValue(),
      premium: premium.toString(),
    }
  }
}
