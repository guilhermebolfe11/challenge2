import { coverageRoutes } from '@controllers/coverages/routes'
import { quotesRoutes } from '@controllers/quotes/routes'
import { env } from '@env'
import fastifyJwt from '@fastify/jwt'
import { errorHandler } from '@infra/errors/error-handler'
import fastify from 'fastify'

export const app = fastify()
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.setErrorHandler(errorHandler)
app.register(coverageRoutes)
app.register(quotesRoutes)
