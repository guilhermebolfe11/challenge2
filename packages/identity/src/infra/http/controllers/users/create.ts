import { makeCreateUserUseCase } from '@application/use-cases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeCreateUserUseCase()

  const responseUseCase = await useCase.execute(request.body)

  const response = {
    data: {
      userId: responseUseCase.user.id.toValue(),
      username: responseUseCase.user.username,
      role: responseUseCase.user.role,
    },
  }

  return reply.status(201).send(response)
}
