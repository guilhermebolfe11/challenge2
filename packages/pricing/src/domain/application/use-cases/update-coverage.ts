import { ResourceAlreadyExistsError, ResourceNotFoundError } from '@core/errors'
import { Coverage } from '@entities'
import { parseToInvalidProperty } from '@utils'
import { z } from 'zod'
import { CoverageRepository } from '../repositories'

export interface UpdateCoverageUseCaseRequest {
  coverageId: string
  name?: string
  description?: string
  capital?: number
  premium?: number
}

export interface UpdateCoverageUseCaseResponse {
  coverage: Coverage
}

export class UpdateCoverageUseCase {
  constructor(private coverageRepository: CoverageRepository) {}

  async execute(
    request: UpdateCoverageUseCaseRequest,
  ): Promise<UpdateCoverageUseCaseResponse> {
    const coverageIdSchema = z.string().uuid()
    const responseCoverageIdSchema = coverageIdSchema.safeParse(
      request.coverageId,
    )

    if (!responseCoverageIdSchema.success) {
      throw parseToInvalidProperty(responseCoverageIdSchema.error)
    }

    const coverage = await this.coverageRepository.findById(request.coverageId)
    if (!coverage) {
      throw new ResourceNotFoundError('Coverage not found')
    }

    coverage.name = request.name ?? coverage.name
    coverage.description = request.description ?? coverage.description
    coverage.capital = request.capital ?? coverage.capital
    coverage.premium = request.premium ?? coverage.premium

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

    const responsePropsSchema = propsSchema.safeParse(coverage)
    if (!responsePropsSchema.success) {
      throw parseToInvalidProperty(responsePropsSchema.error)
    }

    const coverageWithSameName = await this.coverageRepository.findByName(
      coverage.name,
    )
    if (!coverageWithSameName?.id.equals(coverage.id)) {
      throw new ResourceAlreadyExistsError('Name already used')
    }

    coverage.update()
    await this.coverageRepository.save(coverage)

    return { coverage }
  }
}
