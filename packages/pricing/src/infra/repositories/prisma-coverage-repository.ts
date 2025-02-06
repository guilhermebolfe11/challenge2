import { CoverageRepository } from '@application/repositories'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Coverage } from '@entities'
import { prisma } from '@infra/repositories/prisma'
import { Prisma } from '@prisma/client'

export class PrismaCoverageRepository implements CoverageRepository {
  async findByIds(ids: string[]): Promise<Coverage[]> {
    const coverage = await prisma.coverage.findMany({
      where: {
        id: {
          in: ids,
        },
        removed_at: undefined,
      },
    })

    return coverage.map((c) => this.mapToCoverage(c)) as Coverage[]
  }

  async save(coverage: Coverage): Promise<void> {
    await prisma.coverage.update({
      where: {
        id: coverage.id.toValue(),
      },
      data: {
        name: coverage.name,
        capital: coverage.capital,
        description: coverage.description,
        premium: coverage.premium,
        updated_at: coverage.updatedAt,
        removed_at: coverage.removedAt,
      },
    })
  }

  async findById(id: string): Promise<Coverage | undefined> {
    const coverage = await prisma.coverage.findUnique({
      where: {
        id,
      },
    })
    return this.mapToCoverage(coverage)
  }

  async remove(coverage: Coverage): Promise<void> {
    await prisma.coverage.update({
      where: {
        id: coverage.id.toValue(),
      },
      data: {
        removed_at: coverage.removedAt,
      },
    })
  }

  async findByName(name: string): Promise<Coverage | undefined> {
    const coverage = await prisma.coverage.findUnique({
      where: {
        name,
      },
    })
    return this.mapToCoverage(coverage)
  }

  async create(coverage: Coverage): Promise<void> {
    await prisma.coverage.create({
      data: {
        id: coverage.id.toValue(),
        name: coverage.name,
        capital: coverage.capital,
        description: coverage.description,
        premium: coverage.premium,
        created_at: coverage.createdAt,
        removed_at: coverage.removedAt,
        updated_at: coverage.updatedAt,
      } as Prisma.CoverageCreateInput,
    })
  }

  private mapToCoverage(coverage?: any) {
    if (!coverage) {
      return undefined
    }

    return Coverage.create(
      {
        name: coverage.name,
        description: coverage.description,
        createdAt: coverage.created_at,
        updatedAt: coverage.updated_at,
        capital: coverage.capital,
        premium: coverage.premium,
        removedAt: coverage.removed_at,
      },
      new UniqueEntityID(coverage.id),
    )
  }
}
