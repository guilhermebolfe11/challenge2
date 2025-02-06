import { AgesRepository } from '@application/repositories'
import ages from '@prisma/ages.json'
import AVLTree from 'avl'

export class TreeAgesRepository implements AgesRepository {
  private tree: AVLTree<number, number>

  constructor() {
    this.tree = new AVLTree<number, number>()
    this.tree.load(
      ages.map((a) => a.age),
      ages.map((a) => a.factor),
    )
  }

  async findFactorByAge(age: number): Promise<number> {
    let factor = this.tree.find(age)?.data

    if (factor) {
      return factor
    }

    let nextAge = age
    while (!factor) {
      factor = this.tree.find(nextAge++)?.data
    }

    return factor
  }
}
