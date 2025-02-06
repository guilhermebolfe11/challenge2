import { UnauthorizedError } from '@core/errors'
import { UserRole } from '@entities'
import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyRole(roles: UserRole[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user
    if (!roles.includes(role)) {
      throw new UnauthorizedError()
    }
  }
}
