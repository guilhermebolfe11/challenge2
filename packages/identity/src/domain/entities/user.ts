import { Entity, UniqueEntityID } from '@core/entities'
import { Optional } from '@core/types'
import { UserRole } from './user-role'

export interface UserProps {
  username: string
  password: string
  role: UserRole
  createdAt: Date
  updatedAt?: Date
}

export class User extends Entity<UserProps> {
  get username() {
    return this.props.username
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get role() {
    return this.props.role
  }

  set role(value: UserRole) {
    this.props.role = value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        role: props.role ?? UserRole.USER,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
