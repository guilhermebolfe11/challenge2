import { InvalidCredentialsError } from '@application/errors'
import { UniqueEntityID } from '@core/entities'
import { User, UserRole } from '@entities'
import { hashSync } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthUseCase } from './auth'
import { makeTestAuthUseCase } from './factories'
let sut: AuthUseCase
const userId = randomUUID()
const adminId = randomUUID()

describe('Auth Use Case', () => {
  beforeEach(() => {
    sut = makeTestAuthUseCase([
      User.create(
        {
          username: 'user@test.com',
          password: hashSync('User2023@', 6),
          role: UserRole.USER,
        },
        new UniqueEntityID(userId),
      ),
      User.create(
        {
          username: 'admin@test.com',
          password: hashSync('Admin2023@', 6),
          role: UserRole.ADMIN,
        },
        new UniqueEntityID(adminId),
      ),
    ])
  })

  it('should be able to user auth', async () => {
    const result = await sut.execute({
      password: 'User2023@',
      username: 'user@test.com',
    })
    expect(result.user).instanceOf(User)
    expect(result.user.role).toBe(UserRole.USER)
    expect(result.user.id.toValue()).toBe(userId)
  })

  it('should be able to admin auth', async () => {
    const result = await sut.execute({
      password: 'Admin2023@',
      username: 'admin@test.com',
    })
    expect(result.user).instanceOf(User)
    expect(result.user.role).toBe(UserRole.ADMIN)
    expect(result.user.id.toValue()).toBe(adminId)
  })

  it("shouldn't be able to auth with empty username", async () => {
    await expect(() =>
      sut.execute({
        password: 'Teste2023@',
        username: '',
      }),
    ).rejects.toThrowError(InvalidCredentialsError)
  })

  it("shouldn't be able to auth with whitespace username", async () => {
    await expect(() =>
      sut.execute({
        password: 'Teste2023@',
        username: '   ',
      }),
    ).rejects.toThrowError(InvalidCredentialsError)
  })

  it("shouldn't be able to auth with empty password", async () => {
    await expect(() =>
      sut.execute({
        password: '',
        username: 'test@test.com',
      }),
    ).rejects.toThrowError(InvalidCredentialsError)
  })

  it("shouldn't be able to auth with whitespace password", async () => {
    await expect(() =>
      sut.execute({
        password: '    ',
        username: 'test@test.com',
      }),
    ).rejects.toThrowError(InvalidCredentialsError)
  })
})
