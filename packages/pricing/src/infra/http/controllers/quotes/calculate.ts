import { makeCalculateQuoteUseCase } from '@application/use-cases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function calculate(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeCalculateQuoteUseCase()

  const responseUseCase = await useCase.execute(request.body)

  return reply.status(200).send(responseUseCase.quote)
}
