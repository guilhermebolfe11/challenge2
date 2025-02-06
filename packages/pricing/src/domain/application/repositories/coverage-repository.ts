import { Coverage } from '@entities'

export interface CoverageRepository {
  findById(id: string): Promise<Coverage | undefined>
  findByName(name: string): Promise<Coverage | undefined>
  findByIds(ids: string[]): Promise<Coverage[]>
  create(coverage: Coverage): Promise<void>
  remove(coverage: Coverage): Promise<void>
  save(coverage: Coverage): Promise<void>
}
