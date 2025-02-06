import { ResourceAlreadyExistsError } from '@core/errors'
import { Coverage } from '@entities'
import { parseToInvalidProperty } from '@utils'
import { z } from 'zod'
import { CoverageRepository } from '../repositories'

export interface CreateCoverageUseCaseRequest {
  name: string
  description: string
  capital: number
  premium: number
}

export interface CreateCoverageUseCaseResponse {
  coverage: Coverage
}

export class CreateCoverageUseCase {
  constructor(private coverageRepository: CoverageRepository) {}

  async execute(
    request: CreateCoverageUseCaseRequest,
  ): Promise<CreateCoverageUseCaseResponse> {
    const propsSchema = z
      .object({
        name: z
          .string()
          .min(1)
          .refine(
            (value) => value.trim().length > 0,
            'Name cannot be only white spaces.',
          ),
        description: z
          .string()
          .min(1)
          .refine(
            (value) => value.trim().length > 0,
            'Description cannot be only white spaces.',
          ),
        capital: z
          .number()
          .gte(1000)
          .refine(
            (value) => value % 10 === 0,
            'Capital must be a multiple of 10',
          ),
        premium: z.number().gt(0),
      })
      .refine((data) => data.premium < data.capital * 0.3, {
        message: 'Premium must be less than 30% of the capital.',
        path: ['premium'],
      })

    const responsePropsSchema = propsSchema.safeParse(request)

    if (!responsePropsSchema.success) {
      throw parseToInvalidProperty(responsePropsSchema.error)
    }

    const coverage = Coverage.create(request)

    const coverageWithSameName = await this.coverageRepository.findByName(
      coverage.name,
    )

    if (coverageWithSameName) {
      throw new ResourceAlreadyExistsError('Name already used')
    }

    await this.coverageRepository.create(coverage)

    return { coverage }
  }
}
