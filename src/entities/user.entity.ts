import { Embedded, Entity, Property } from '@mikro-orm/core';
import { nanoid } from 'nanoid';
import { BaseEntity } from './base.entity';
import { RoleEntity } from './role.entity';

@Entity({ collection: 'user' })
export class UserEntity extends BaseEntity {
  @Property({ nullable: false })
  name: string;

  @Property({ default: null })
  email?: string | null;

  // use embedded to allow subdoc query like user.roles.id
  @Embedded(() => RoleEntity, { array: true })
  roles: RoleEntity[];

  constructor(name: string, roles: RoleEntity[] = []) {
    super();
    this.uid = nanoid();
    this.name = name;
    this.roles = roles;
  }
}
