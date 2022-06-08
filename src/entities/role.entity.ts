import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class RoleEntity {
  @Property()
  uid: string;

  @Property()
  createdAt = new Date();

  constructor(uid: string) {
    this.uid = uid;
  }
}
