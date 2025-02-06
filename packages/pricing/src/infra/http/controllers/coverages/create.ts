import { makeCreateCoverageUseCase } from '@application/use-cases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeCreateCoverageUseCase()

  const responseUseCase = await useCase.execute(request.body)

  const response = {
    data: {
      coverageId: responseUseCase.coverage.id.toValue(),
      name: responseUseCase.coverage.name,
      description: responseUseCase.coverage.description,
      capital: responseUseCase.coverage.capital,
      premium: responseUseCase.coverage.premium,
    },
  }

  return reply.status(201).send(response)
}
