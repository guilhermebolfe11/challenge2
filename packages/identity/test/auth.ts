import seedE2E from '@prisma/seed.e2e.json'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function authE2E(app: FastifyInstance, isAdmin = false) {
  const responseAuth = await request(app.server)
    .post('/auth')
    .send({
      username: isAdmin ? seedE2E.admin.username : seedE2E.user.username,
      password: isAdmin ? seedE2E.admin.password : seedE2E.user.password,
    })

  const { token } = responseAuth.body.data

  return {
    token,
  }
}
