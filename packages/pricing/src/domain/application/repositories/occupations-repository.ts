import { Occupation } from '@entities'

export interface OccupationsRepository {
  findByCode(code: string): Promise<Occupation | undefined>
}
