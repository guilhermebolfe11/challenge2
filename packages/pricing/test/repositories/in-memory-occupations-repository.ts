import { OccupationsRepository } from '@application/repositories'
import { Occupation } from '@entities'

export class InMemoryOccupationsRepository implements OccupationsRepository {
  public items: Occupation[]

  constructor(items?: Occupation[]) {
    this.items = items ?? []
  }

  async findByCode(code: string): Promise<Occupation | undefined> {
    return this.items.find((i) => i.code === code)
  }
}
