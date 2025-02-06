import { app } from '@/app'
import { UserRole } from '@entities'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { authE2E } from '@test/auth'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create user', async () => {
    const { token } = await authE2E(app, true)
    const username = faker.internet.email()
    const response = await request(app.server)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username,
        password: `TestE2E@`,
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.data.username).toBe(username)
    expect(response.body.data.role).toBe(UserRole.USER)
  })

  it("shouldn't be able to create user without being an administrator", async () => {
    const { token } = await authE2E(app)
    const response = await request(app.server)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: faker.internet.email(),
        password: `TestE2E@`,
      })

    expect(response.statusCode).toBe(401)
  })

  it("shouldn't be able to create user with invalid payload", async () => {
    const { token } = await authE2E(app, true)
    const response = await request(app.server)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: faker.internet.email(),
        password: `teste2e@`,
      })

    expect(response.statusCode).toBe(400)
  })
})
