import { UseCaseError } from '@core/errors'

export class InvalidCredentialsError extends UseCaseError {
  constructor(message?: string) {
    super(message ?? 'Invalid credentials')
  }
}
