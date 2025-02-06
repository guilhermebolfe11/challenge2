import { UserRole } from '@entities'
import { verifyJwt, verifyRole } from '@middlewares'
import { FastifyInstance } from 'fastify'
import { calculate } from './calculate'

export async function quotesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.post(
    '/quote',
    { onRequest: verifyRole([UserRole.USER, UserRole.ADMIN]) },
    calculate,
  )
}
