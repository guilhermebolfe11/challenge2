import { ResourceNotFoundError } from '@core/errors'
import { Coverage } from '@entities'
import { parseToInvalidProperty } from '@utils'
import { z } from 'zod'
import { CoverageRepository } from '../repositories'

export interface RemoveCoverageUseCaseRequest {
  coverageId: string
}

export interface RemoveCoverageUseCaseResponse {
  coverage: Coverage
}

export class RemoveCoverageUseCase {
  constructor(private coverageRepository: CoverageRepository) {}

  async execute(
    request: RemoveCoverageUseCaseRequest,
  ): Promise<RemoveCoverageUseCaseResponse> {
    const propsSchema = z.object({
      coverageId: z.string().uuid(),
    })

    const responsePropsSchema = propsSchema.safeParse(request)

    if (!responsePropsSchema.success) {
      throw parseToInvalidProperty(responsePropsSchema.error)
    }

    const coverage = await this.coverageRepository.findById(request.coverageId)

    if (!coverage) {
      throw new ResourceNotFoundError('Coverage not found')
    }

    coverage.remove()

    await this.coverageRepository.remove(coverage)

    return { coverage }
  }
}
