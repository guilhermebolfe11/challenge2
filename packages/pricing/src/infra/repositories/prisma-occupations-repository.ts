import { OccupationsRepository } from '@application/repositories'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Occupation } from '@entities'
import { prisma } from '@infra/repositories/prisma'

export class PrismaOccupationsRepository implements OccupationsRepository {
  async findByCode(code: string): Promise<Occupation | undefined> {
    const occupation = await prisma.occupation.findFirst({
      where: {
        code,
      },
    })
    return this.mapToOccupation(occupation)
  }

  private mapToOccupation(occupation?: any) {
    if (!occupation) {
      return undefined
    }

    return Occupation.create(
      {
        name: occupation.name,
        createdAt: occupation.created_at,
        updatedAt: occupation.updated_at,
        active: occupation.active,
        code: occupation.code,
        factor: occupation.factor,
      },
      new UniqueEntityID(occupation.id),
    )
  }
}
