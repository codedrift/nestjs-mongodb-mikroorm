import { EntityName, EventArgs, EventSubscriber, Subscriber } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';
import { UserEntity } from '../entities';

@Subscriber()
export class UserEntitySubscriber implements EventSubscriber<UserEntity> {
  private readonly logger = new Logger(UserEntitySubscriber.name);

  getSubscribedEntities(): EntityName<UserEntity>[] {
    return [UserEntity];
  }

  async afterCreate(args: EventArgs<UserEntity>): Promise<void> {
    this.logger.log('UserEntitySubscriber', 'afterCreate', { entity: args.entity });
  }

  async afterUpdate(args: EventArgs<UserEntity>): Promise<void> {
    this.logger.log('UserEntitySubscriber', 'afterUpdate', { entity: args.entity });
  }

  async afterDelete(args: EventArgs<UserEntity>): Promise<void> {
    this.logger.log('UserEntitySubscriber', 'afterDelete', { entity: args.entity });
  }
}
