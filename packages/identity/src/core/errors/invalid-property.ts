import { UseCaseError } from './use-case-error'

export class InvalidPropertyError extends UseCaseError {
  constructor(message?: string) {
    super(message ?? 'Invalid property')
  }
}
