import { User } from '@entities'

export interface UsersRepository {
  findById(id: string): Promise<User | undefined>
  findByUsername(username: string): Promise<User | undefined>
  save(user: User): Promise<void>
  create(user: User): Promise<void>
}
