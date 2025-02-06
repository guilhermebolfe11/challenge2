import { makeUpdateCoverageUseCase } from '@application/use-cases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeUpdateCoverageUseCase()

  const body = {
    coverageId: request.params.coverageId,
    ...request.body,
  }

  const responseUseCase = await useCase.execute(body)

  const response = {
    data: {
      coverageId: responseUseCase.coverage.id.toValue(),
      name: responseUseCase.coverage.name,
      description: responseUseCase.coverage.description,
      capital: responseUseCase.coverage.capital,
      premium: responseUseCase.coverage.premium,
    },
  }

  return reply.status(200).send(response)
}
