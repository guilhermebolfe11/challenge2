import { makeAuthUseCase } from '@application/use-cases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeAuthUseCase()

  const responseUseCase = await useCase.execute(request.body)

  const token = await reply.jwtSign(
    {
      role: responseUseCase.user.role,
    },
    { sign: { sub: responseUseCase.user.id.toValue(), expiresIn: '1d' } },
  )

  const response = {
    data: {
      user: {
        userId: responseUseCase.user.id.toValue(),
        username: responseUseCase.user.username,
        role: responseUseCase.user.role,
      },
      token,
    },
  }

  return reply.status(200).send(response)
}
