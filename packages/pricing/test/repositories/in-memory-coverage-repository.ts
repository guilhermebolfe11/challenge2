import { CoverageRepository } from '@application/repositories'
import { UniqueEntityID } from '@core/entities'
import { Coverage } from '@entities'

export class InMemoryCoverageRepository implements CoverageRepository {
  public items: Coverage[]

  constructor(items?: Coverage[]) {
    this.items = items ?? []
  }

  async findByIds(ids: string[]): Promise<Coverage[]> {
    return this.items.filter(
      (i) => ids.includes(i.id.toValue()) && i.removedAt === undefined,
    )
  }

  async findById(id: string): Promise<Coverage | undefined> {
    return this.items.find((i) => i.id.equals(new UniqueEntityID(id)))
  }

  async findByName(name: string): Promise<Coverage | undefined> {
    return this.items.find((i) => i.name === name)
  }

  async remove(coverage: Coverage): Promise<void> {
    const itemIndex = this.items.findIndex((item) =>
      item.id.equals(coverage.id),
    )
    this.items[itemIndex].remove()
  }

  async save(coverage: Coverage): Promise<void> {
    const itemIndex = this.items.findIndex((item) =>
      item.id.equals(coverage.id),
    )
    this.items[itemIndex] = coverage
  }

  async create(coverage: Coverage): Promise<void> {
    this.items.push(coverage)
  }
}
