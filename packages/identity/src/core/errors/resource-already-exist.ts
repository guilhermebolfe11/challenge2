import { UseCaseError } from './use-case-error'

export class ResourceAlreadyExistsError extends UseCaseError {
  constructor(message?: string) {
    super(message ?? 'Resource already exist')
  }
}
