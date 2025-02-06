import { Entity, UniqueEntityID } from '@core/entities'
import { Optional } from '@core/types'

export interface OccupationProps {
  code: string
  name: string
  active: boolean
  factor: number
  createdAt: Date
  updatedAt?: Date
}

export class Occupation extends Entity<OccupationProps> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.touch()
  }

  get code() {
    return this.props.code
  }

  set code(value: string) {
    this.props.code = value
    this.touch()
  }

  get active() {
    return this.props.active
  }

  set active(value: boolean) {
    this.props.active = value
    this.touch()
  }

  get factor() {
    return this.props.factor
  }

  set factor(value: number) {
    this.props.factor = value
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<OccupationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const occupation = new Occupation(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return occupation
  }
}
