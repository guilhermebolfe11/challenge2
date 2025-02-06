import { UserRole } from '@entities'
import { verifyJwt, verifyRole } from '@middlewares'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'

export async function usersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.post('/users', { onRequest: verifyRole([UserRole.ADMIN]) }, create)
  app.patch(
    '/users/:userId',
    { onRequest: verifyRole([UserRole.ADMIN]) },
    update,
  )
}
