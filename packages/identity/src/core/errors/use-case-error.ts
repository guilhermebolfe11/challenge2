export abstract class UseCaseError extends Error {
  constructor(message?: string) {
    super(message ?? 'Use case error')
  }
}
