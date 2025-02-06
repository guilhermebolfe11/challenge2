import { UniqueEntityID } from '@core/entities'
import { InvalidPropertyError, ResourceNotFoundError } from '@core/errors'
import { User, UserRole } from '@entities'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeTestUpdateRoleUseCase } from './factories'
import { UpdateRoleUseCase } from './update-role'
let sut: UpdateRoleUseCase
const userId = 'ef7bc933-cbd5-47eb-85c3-ba8a47062777'

describe('Update Role Use Case', () => {
  beforeEach(() => {
    sut = makeTestUpdateRoleUseCase([
      User.create(
        {
          username: 'test@test.com',
          password:
            '$2a$06$Cj2CARKzk0eDIfW5oC911uZ1znS7v5kOTEMfzAR2K8MZlfkTO0N/C',
          role: UserRole.USER,
        },
        new UniqueEntityID(userId),
      ),
    ])
  })

  it('should be able to update a role', async () => {
    const result = await sut.execute({
      userId,
      role: UserRole.ADMIN,
    })
    expect(result.user).instanceOf(User)
    expect(result.user.role).toBe(UserRole.ADMIN)
    expect(result.user.id.toValue()).toBe(userId)
  })

  it("shouldn't be able to update a role with user id not found", async () => {
    await expect(() =>
      sut.execute({
        role: UserRole.ADMIN,
        userId: randomUUID(),
      }),
    ).rejects.toThrowError(ResourceNotFoundError)
  })

  it("shouldn't be able to update a role with empty user id", async () => {
    await expect(() =>
      sut.execute({
        role: UserRole.ADMIN,
        userId: '',
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to update a role with whitespace user id", async () => {
    await expect(() =>
      sut.execute({
        role: UserRole.ADMIN,
        userId: '    ',
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to update a role with invalid uuid user id", async () => {
    await expect(() =>
      sut.execute({
        role: UserRole.ADMIN,
        userId: 'adsa5asda877-asdasd',
      }),
    ).rejects.toThrowError(InvalidPropertyError)
  })
})
