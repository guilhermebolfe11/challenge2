import { app } from '@/app'
import { UserRole } from '@entities'
import seedE2E from '@prisma/seed.e2e.json'
import { authE2E } from '@test/auth'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update user role to ADMIN', async () => {
    const { token } = await authE2E(app, true)
    const response = await request(app.server)
      .patch(`/users/${seedE2E.user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        role: UserRole.ADMIN,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.data.role).toBe(UserRole.ADMIN)
    expect(response.body.data.userId).toBe(seedE2E.user.id)
    expect(response.body.data.username).toBe(seedE2E.user.username)
  })

  it('should be able to update user role to USER', async () => {
    const { token } = await authE2E(app, true)
    const response = await request(app.server)
      .patch(`/users/${seedE2E.user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        role: UserRole.USER,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.data.role).toBe(UserRole.USER)
    expect(response.body.data.userId).toBe(seedE2E.user.id)
    expect(response.body.data.username).toBe(seedE2E.user.username)
  })

  it("shouldn't be able to update user role without being an administrator", async () => {
    const { token } = await authE2E(app)
    const response = await request(app.server)
      .patch(`/users/${seedE2E.user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        role: UserRole.ADMIN,
      })

    expect(response.statusCode).toBe(401)
  })

  it("shouldn't be able to update user role with invalid payload", async () => {
    const { token } = await authE2E(app, true)
    const response = await request(app.server)
      .patch(`/users/${seedE2E.user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        role: 'manager',
      })

    expect(response.statusCode).toBe(400)
  })
})
