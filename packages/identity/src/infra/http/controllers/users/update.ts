import { makeUpdateRoleUseCase } from '@application/use-cases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeUpdateRoleUseCase()
  const responseUseCase = await useCase.execute({
    role: request.body.role,
    userId: request.params.userId,
  })

  const response = {
    data: {
      userId: responseUseCase.user.id.toValue(),
      username: responseUseCase.user.username,
      role: responseUseCase.user.role,
    },
  }

  return reply.status(200).send(response)
}
