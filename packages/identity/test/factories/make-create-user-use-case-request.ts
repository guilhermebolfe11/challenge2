import { CreateUserUseCaseRequest } from '@application/use-cases'
import { fakerPT_BR as faker } from '@faker-js/faker'

export function makeCreateUserUseCaseRequest(
  override: Partial<CreateUserUseCaseRequest> = {},
) {
  const request = {
    username: override.username ?? faker.internet.email(),
    password:
      override.password ??
      faker.helpers.fromRegExp(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#!$%]).{8,64}$/,
      ),
  } as CreateUserUseCaseRequest
  return request
}
