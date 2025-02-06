import { UseCaseError } from '@core/errors'
import { UnauthorizedError } from '@core/errors/unauthorized'
import { env } from '@env'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const responseParse = parseToResponseError(error)

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply
    .status(responseParse.httpStatusCode)
    .send({ error: responseParse.error })
}

function parseToResponseError(error: FastifyError) {
  const response = {
    httpStatusCode: 500,
    error: {
      code: '500',
      message: 'Internal Server Error',
    },
  }

  if (error instanceof UnauthorizedError) {
    response.httpStatusCode = 401
    response.error.code = '401'
    response.error.message = error.message
  }

  if (error instanceof UseCaseError) {
    response.httpStatusCode = 400
    response.error.code = '400'
    response.error.message = error.message
  }

  return response
}
