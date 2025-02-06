import { InvalidPropertyError, ResourceAlreadyExistsError } from '@core/errors'
import { User, UserRole } from '@entities'
import { makeCreateUserUseCaseRequest } from '@test/factories'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from './create'
import { makeTestCreateUserUseCase } from './factories'
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    sut = makeTestCreateUserUseCase()
  })

  it('should be able to create a user', async () => {
    const request = makeCreateUserUseCaseRequest({ password: 'Teste2023@' })
    const result = await sut.execute(request)
    expect(result.user).instanceOf(User)
    expect(result.user.username).toBe(request.username)
    expect(result.user.role).toBe(UserRole.USER)
  })

  it("shouldn't be able to create a user with invalid username", async () => {
    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: 'test@test',
        }),
      ),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a user with empty username", async () => {
    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: '',
        }),
      ),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a user with white spaces username", async () => {
    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: '       ',
        }),
      ),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a user with invalid password without at least one uppercase letter", async () => {
    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: 'test@test.com',
          password: 'teste2023@',
        }),
      ),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a user with invalid password without at least one lowercase letter", async () => {
    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: 'test@test.com',
          password: 'TESTE2023@',
        }),
      ),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a user with invalid password without at least one number", async () => {
    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: 'test@test.com',
          password: 'Testeacbd@',
        }),
      ),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a user with invalid password without the symbols @#!$%", async () => {
    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: 'test@test.com',
          password: 'Teste2023{}[]|&*()^_+',
        }),
      ),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a user with invalid password min length", async () => {
    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: 'test@test.com',
          password: '123',
        }),
      ),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a user with invalid password max length", async () => {
    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: 'test@test.com',
          password:
            '123456789123456789123456789123456789123456789123456789123456789123456789',
        }),
      ),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a user with empty password", async () => {
    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: 'test@test.com',
          password: '',
        }),
      ),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a user with whitespace at password", async () => {
    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: 'test@test.com',
          password: '        ',
        }),
      ),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a user with white spaces at password", async () => {
    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: 'test@test.com',
          password: '        ',
        }),
      ),
    ).rejects.toThrowError(InvalidPropertyError)
  })

  it("shouldn't be able to create a user with username already used", async () => {
    const result = await sut.execute(
      makeCreateUserUseCaseRequest({ password: 'Teste2023@' }),
    )
    expect(result.user).instanceOf(User)

    await expect(() =>
      sut.execute(
        makeCreateUserUseCaseRequest({
          username: result.user.username,
          password: 'Teste2023@',
        }),
      ),
    ).rejects.toThrowError(ResourceAlreadyExistsError)
  })
})
