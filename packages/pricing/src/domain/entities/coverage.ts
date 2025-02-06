import { Entity, UniqueEntityID } from '@core/entities'
import { Optional } from '@core/types'

export interface CoverageProps {
  name: string
  description: string
  capital: number
  premium: number
  createdAt: Date
  removedAt?: Date
  updatedAt?: Date
}

export class Coverage extends Entity<CoverageProps> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.touch()
  }

  get premium() {
    return this.props.premium
  }

  set premium(value: number) {
    this.props.premium = value
    this.touch()
  }

  get capital() {
    return this.props.capital
  }

  set capital(value: number) {
    this.props.capital = value
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(value: string) {
    this.props.description = value
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get removedAt() {
    return this.props.removedAt
  }

  get isActive() {
    return this.props.removedAt === undefined
  }

  update() {
    this.props.removedAt = undefined
    this.touch()
  }

  remove() {
    this.props.removedAt = new Date()
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<CoverageProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const coverage = new Coverage(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return coverage
  }
}
