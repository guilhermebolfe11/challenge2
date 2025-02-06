export interface AgesRepository {
  findFactorByAge(age: number): Promise<number>
}
