import { FastifyInstance } from 'fastify'
import { auth } from './auth'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth', auth)
}
