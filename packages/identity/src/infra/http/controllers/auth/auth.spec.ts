import { app } from '@/app'
import { UserRole } from '@entities'
import seedE2E from '@prisma/seed.e2e.json'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Auth (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to user auth', async () => {
    const response = await request(app.server).post('/auth').send({
      username: seedE2E.user.username,
      password: seedE2E.user.password,
    })
    expect(response.statusCode).toBe(200)
    expect(response.body.data.user.username).toBe(seedE2E.user.username)
    expect(response.body.data.user.role).toBe(UserRole.USER)
    expect(response.body.data.token).length.greaterThan(0)
  })

  it('should be able to admin auth', async () => {
    const response = await request(app.server).post('/auth').send({
      username: seedE2E.admin.username,
      password: seedE2E.admin.password,
    })
    expect(response.statusCode).toBe(200)
    expect(response.body.data.user.username).toBe(seedE2E.admin.username)
    expect(response.body.data.user.role).toBe(UserRole.ADMIN)
    expect(response.body.data.token).length.greaterThan(0)
  })

  it("shouldn't be able to auth with invalid credentials", async () => {
    const response = await request(app.server).post('/auth').send({
      username: seedE2E.admin.username,
      password: null,
    })
    expect(response.statusCode).toBe(400)
  })
})
