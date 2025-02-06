import { UserRole } from '@entities'
import { verifyJwt, verifyRole } from '@middlewares'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { remove } from './remove'
import { update } from './update'

export async function coverageRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.post('/coverage', { onRequest: verifyRole([UserRole.ADMIN]) }, create)
  app.delete(
    '/coverage/:coverageId',
    { onRequest: verifyRole([UserRole.ADMIN]) },
    remove,
  )
  app.patch(
    '/coverage/:coverageId',
    { onRequest: verifyRole([UserRole.ADMIN]) },
    update,
  )
}
