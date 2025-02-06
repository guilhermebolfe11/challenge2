import { InvalidPropertyError } from '@core/errors'
import { ZodError } from 'zod'

export function parseToInvalidProperty(error: ZodError): InvalidPropertyError {
  const err = error.errors[0]
  return new InvalidPropertyError(
    `Property: ${err.path[0]} | Message: ${err.message}`,
  )
}
