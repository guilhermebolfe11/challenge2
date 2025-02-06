import { UsersRepository } from '@application/repositories'
import { UniqueEntityID } from '@core/entities'
import { User } from '@entities'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[]

  constructor(items?: User[]) {
    this.items = items ?? []
  }

  async findById(id: string): Promise<User | undefined> {
    return this.items.find((i) => i.id.equals(new UniqueEntityID(id)))
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.items.find((i) => i.username === username)
  }

  async save(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.equals(user.id))
    this.items[itemIndex] = user
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }
}
