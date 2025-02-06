import { makeRemoveCoverageUseCase } from '@application/use-cases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeRemoveCoverageUseCase()

  const responseUseCase = await useCase.execute(request.params)

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
